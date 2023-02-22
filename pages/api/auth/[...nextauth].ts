import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { NextApiRequest } from 'next';
import { authApi } from '@api';
import { SignInPayload } from '@/types/auth';
import jwt_decode from 'jwt-decode';
import { signOut } from 'next-auth/react';

interface AuthToken {
  sub: string;
  role: string;
  'token-type': string;
  iat: number;
  exp: number;
}

async function refreshAccessToken(refreshToken) {
  const res = await authApi.regenerateToken(refreshToken);
  return res;
}

export default NextAuth({
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        userLoginId: { label: 'Email', type: 'userLoginId' },
        userLoginPw: { label: 'Password', type: 'userLoginPw' },
      },
      async authorize(credentials: SignInPayload, req: NextApiRequest) {
        const payload = {
          userLoginId: credentials.userLoginId,
          userLoginPw: credentials.userLoginPw,
        };
        const res = await authApi.signIn(payload);
        if (res.value) {
          const token = res.value;
          const user = {
            name: token.accessToken,
            email: token.refreshToken,
            id: payload.userLoginId,
          };
          return user;
        }
        return null;
      },
    }),
  ],
  pages: {
    signIn: '/auth/sign-in',
  },
  callbacks: {
    async jwt({ token, user, account }) {
      token.error = '';
      if (token.refreshToken) {
        const decodedAccess: AuthToken = jwt_decode(token.accessToken);
        if (decodedAccess.exp < Date.now() / 1000) {
          const data = await refreshAccessToken(token.refreshToken);
          if (data.code !== 0) {
            token.error = 'invalid';
          } else {
            token.accessToken = data.value.accessToken;
            token.refreshToken = data.value.refreshToken;
          }
          return token;
        }
      }
      if (user) {
        token.accessToken = user.name;
        token.refreshToken = user.email;
      }
      return token;
    },
    async session({ session, token, user }) {
      session.user.name = token.accessToken;
      session.user.email = String(token.refreshToken);
      session.user.image = String(token.error);
      session.accessToken = token.accessToken;
      session.expires = token.sub;
      return session;
    },
  },
});

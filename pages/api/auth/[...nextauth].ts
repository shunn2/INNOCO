import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { NextApiRequest } from 'next';
import { authApi } from '@api';
import { SignInPayload } from '@/types/auth';

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
          const user = { id: token.accessToken, email: token.refreshToken };
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
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = user.id;
        token.refreshToken = user.email;
      }
      return token;
    },
    async session({ session, token, user }) {
      session.accessToken = token.accessToken;
      return session;
    },
  },
});

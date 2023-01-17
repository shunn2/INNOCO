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
        memberLoginId: { label: 'Email', type: 'memberLoginId' },
        memberLoginPw: { label: 'Password', type: 'memberLoginPw' },
      },
      async authorize(credentials: SignInPayload, req: NextApiRequest) {
        const payload = {
          memberLoginId: credentials.memberLoginId,
          memberLoginPw: credentials.memberLoginPw,
        };
        const res = await authApi.signIn(payload);
        if (res.value) {
          const token = res.value.token;
          const user = { id: token };
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
      if (user) token.accessToken = user.id;
      return token;
    },
    async session({ session, token, user }) {
      session.accessToken = token.accessToken;
      return session;
    },
  },
});

import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { NextApiRequest } from 'next';

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: 'email-password-credential',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials: any, req: NextApiRequest) {
        return credentials;
      },
    }),
  ],
  pages: {
    signIn: '/sign-in',
  },
});

import { useSession } from '@lib/next-auth-react-query';
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/router';
import { ReactNode, useEffect } from 'react';
import Header from '../Header';

const Layout = (props: { children: ReactNode }) => {
  const [session] = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session?.user.image === 'invalid') {
      signOut({
        callbackUrl: '/auth/sign-in',
      });
    }
    if (session) {
      window.localStorage.setItem(
        'access_token',
        JSON.stringify(session.accessToken)
      );
      router.push('/dashboard', undefined, { shallow: true });
      return;
    }
  }, [session]);
  const { children } = props;
  return (
    <>
      <Header />
      {children}
    </>
  );
};

export default Layout;

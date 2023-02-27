import { userInfoAtom } from '@recoil/user/atom';
import { useRouter } from 'next/router';
import { ReactNode, useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import Header from '../Header';

const Layout = (props: { children: ReactNode }) => {
  const router = useRouter();
  const userInformation = useRecoilValue(userInfoAtom);

  useEffect(() => {
    if (router.asPath === '/auth/sign-up') return;
    if (!userInformation || !userInformation.userLoginId.length) {
      router.replace('/auth/sign-in');
    }
  }, [userInformation]);

  const { children } = props;
  return (
    <>
      <Header />
      {children}
    </>
  );
};

export default Layout;

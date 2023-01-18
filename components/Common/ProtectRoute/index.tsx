import { ReactElement, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSession } from '@lib/next-auth-react-query';

const ProtectRoute = ({ children }: { children: ReactElement }) => {
  const router = useRouter();

  //TODO: 백에서 refresh 토큰이 구현되면 확인 필
  const checkRefreshToken = async (refreshToken) => {
    //refreshToken 있는지 확인
    //있으면 해당 refreshToken으로 백엔드에 accessToken요청
    //localStorage에 accessToken 세팅
  };

  useEffect(() => {
    const refreshToken = localStorage.getItem('refresh_token');
    if (refreshToken) {
      checkRefreshToken(refreshToken);
      router.push('/dashboard');
      return;
    }
    router.push('/auth/sign-in');
  }, []);
  return <>{children}</>;
};

export default ProtectRoute;

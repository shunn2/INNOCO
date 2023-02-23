import { api } from '@api';
import { userInfoAtom } from '@recoil/user/atom';
\import Link from 'next/link';
import { useRouter } from 'next/router';
import { useRecoilState } from 'recoil';
import * as Styled from './styled';

const Header = () => {
  const router = useRouter().pathname.split('/');
  const [userInformation, setUserInformation] = useRecoilState(userInfoAtom);
  const handleSignOut = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    setUserInformation(null);
  };
  return (
    <Styled.HeaderContainer>
      <Link href={'/dashboard'}>
        <Styled.LogoImage
          src={'/logo.png'}
          alt="INNOCO 로고이미지"
          width="0"
          height="0"
          sizes="100vw"
        />
      </Link>
      {router[1] !== 'auth' && (
        <Styled.LogoutButton onClick={() => handleSignOut()}>
          LOGOUT
        </Styled.LogoutButton>
      )}
    </Styled.HeaderContainer>
  );
};

export default Header;

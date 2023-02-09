import { api } from '@api';
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/router';
import * as Styled from './styled';

const Header = () => {
  const router = useRouter().pathname.split('/');
  return (
    <Styled.HeaderContainer>
      <Styled.LogoImage
        src={'/logo.png'}
        alt="INNOCO 로고이미지"
        width="0"
        height="0"
        sizes="100vw"
      />
      {router[1] !== 'auth' && (
        <Styled.LogoutButton
          onClick={() =>
            signOut({
              callbackUrl: '/auth/sign-in',
            })
          }
        >
          LOGOUT
        </Styled.LogoutButton>
      )}
    </Styled.HeaderContainer>
  );
};

export default Header;

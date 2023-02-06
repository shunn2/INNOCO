import { api } from '@api';
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/router';
import Button from '../Button';
import * as Styled from './styled';

const Header = () => {
  const router = useRouter();
  const [blank, route, projectId, pageId] = useRouter().asPath.split('/');

  const handlePublish = async () => {
    const data = await api.publishProject(projectId);
    console.log(data);
  };

  return (
    <Styled.HeaderContainer>
      <Styled.LogoImage
        src={'/logo.png'}
        alt="INNOCO 로고이미지"
        width="0"
        height="0"
        sizes="100vw"
      />
      {/* <div>유저정보</div> */}
      {route === 'editor' && (
        <Styled.PublishButton onClick={() => handlePublish()}>
          publish
        </Styled.PublishButton>
      )}
      <button
        onClick={() =>
          signOut({
            callbackUrl: '/auth/sign-in',
          })
        }
      >
        LOGOUT
      </button>
    </Styled.HeaderContainer>
  );
};

export default Header;

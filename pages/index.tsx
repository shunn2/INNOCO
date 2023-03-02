import { Button } from '@components/Common';
import Image from 'next/image';
import styled from 'styled-components';
import { useRouter } from 'next/router';

export default function Home() {
  const router = useRouter();
  const handleRouteAuth = (url) => {
    router.push(`/auth/${url}`);
  };
  return (
    <Container>
      <Image src={'/logo.png'} width={1000} height={500} alt="innoco logo" />
      <ButtonContainer>
        <Button onClick={() => handleRouteAuth('sign-in')}>Sign-In</Button>
        <Button onClick={() => handleRouteAuth('sign-up')}>Sign-Up</Button>
      </ButtonContainer>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ButtonContainer = styled.div`
  margin-top: 100px;
  width: 500px;
  display: flex;
  justify-content: space-evenly;
`;

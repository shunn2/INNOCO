import React, { useState } from 'react';
import styled from 'styled-components';
import { Input, Button } from '@components/Common';

const SignIn = () => {
  const [input, setInput] = useState('');
  const _onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  return (
    <SignInContainer>
      <p>Login</p>
      <Input placeholder={'아이디를 입력하세요.'} />
      <Input placeholder={'비밀번호를 입력하세요.'} type="password" />
      <Button disabled variant="auth">
        로그인
      </Button>
    </SignInContainer>
  );
};

const SignInContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  &>: nth-child(n) {
    margin-bottom: 12px;
  }
`;

export default SignIn;

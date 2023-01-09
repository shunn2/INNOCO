import React, { useState } from 'react';
import styled from 'styled-components';
import { Input, Button } from '@components/Common';

const SignUp = () => {
  const [input, setInput] = useState('');
  const _onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  return (
    <SignUpContainer>
      <p>Sign Up</p>
      <Input placeholder={'이름을 입력하세요.'} />
      <Input placeholder={'아이디를 입력하세요.'} />
      <Input placeholder={'비밀번호를 입력하세요.'} type="password" />
      {/* TODO: 이메일 인증 */}
      <Button disabled variant="auth">
        회원가입
      </Button>
    </SignUpContainer>
  );
};

const SignUpContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  & > * {
    margin-bottom: 12px;
  }
`;

export default SignUp;

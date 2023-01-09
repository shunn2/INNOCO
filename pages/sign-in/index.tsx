import React, { useState } from 'react';
import { Input, Button } from '@components/Common';
import { AuthContainer } from '@components/Auth';

const SignIn = () => {
  const [input, setInput] = useState('');
  const _onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  return (
    <AuthContainer>
      <p>Login</p>
      <Input placeholder={'아이디를 입력하세요.'} />
      <Input placeholder={'비밀번호를 입력하세요.'} type="password" />
      <Button disabled variant="auth">
        로그인
      </Button>
    </AuthContainer>
  );
};

export default SignIn;

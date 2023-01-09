import React, { useState } from 'react';
import { Input, Button } from '@components/Common';
import { AuthContainer } from '@components/Auth';
import { validateUserPassword } from '@utils/validation';

const SignUp = () => {
  const [input, setInput] = useState('');
  const _onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
    console.log(validateUserPassword(input));
  };

  return (
    <AuthContainer>
      <p>Sign Up</p>
      <Input placeholder={'이메일을 입력하세요.'} />
      <Input placeholder={'아이디 입력하세요.'} />
      <Input
        placeholder={'비밀번호를 입력하세요.'}
        type="password"
        onChange={_onChange}
      />
      {/* TODO: 이메일 인증 */}
      <Button disabled variant="auth">
        회원가입
      </Button>
    </AuthContainer>
  );
};

export default SignUp;

import React, { useState } from 'react';
import { Input, Button } from '@components/Common';
import { AuthContainer } from '@components/Auth';
import { validateEmail, validateId, validatePassword } from '@utils/validation';
import { SignUpPayload } from '@/types/auth';

const SignUp = () => {
  const initialSignUpPayload: SignUpPayload = {
    email: '',
    password: '',
    id: '',
  };

  const [signUpPayload, setSignUpPayload] =
    useState<SignUpPayload>(initialSignUpPayload);
  const handleChange = (type) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;

    if (type === 'email') {
      validateEmail(input);
    }
    if (type === 'id') {
      validateId(input);
    }
    if (type === 'password') {
      validatePassword(input);
    }
    setSignUpPayload({ ...signUpPayload, [type]: input });
  };

  return (
    <AuthContainer>
      <p>Sign Up</p>
      <Input
        placeholder={'이메일을 입력하세요.'}
        onChange={handleChange('email')}
      />
      <Input placeholder={'아이디 입력하세요.'} onChange={handleChange('id')} />
      <Input
        placeholder={'비밀번호를 입력하세요.'}
        type="password"
        onChange={handleChange('password')}
      />
      {/* TODO: 이메일 인증 */}
      <Button disabled variant="auth">
        회원가입
      </Button>
    </AuthContainer>
  );
};

export default SignUp;

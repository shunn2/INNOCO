import React, { useState, useEffect } from 'react';
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
  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    const { email, id, password } = signUpPayload;
    setDisabled(!!(!email || !id || !password));
  }, [signUpPayload]);

  const handleChange = (type) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    setSignUpPayload({ ...signUpPayload, [type]: '' });

    if (type === 'email') {
      if (!validateEmail(input)) return;
    }
    if (type === 'id') {
      if (!validateId(input)) return;
    }
    if (type === 'password') {
      if (!validatePassword(input)) return;
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
      <Button disabled={disabled} variant="auth">
        회원가입
      </Button>
    </AuthContainer>
  );
};

export default SignUp;

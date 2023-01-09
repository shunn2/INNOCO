import React, { useState, useEffect } from 'react';
import { Input, Button } from '@components/Common';
import { AuthContainer } from '@components/Auth';
import { SignInPaylaod } from '@/types/auth';
import { validateId, validatePassword } from '@utils/validation';

const SignIn = () => {
  const initialSignInPayload: SignInPaylaod = {
    password: '',
    id: '',
  };

  const [signInPayload, setSignInPayload] =
    useState<SignInPaylaod>(initialSignInPayload);
  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    const { id, password } = signInPayload;
    setDisabled(!!(!id || !password));
  }, [signInPayload]);

  const handleChange = (type) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    setSignInPayload({ ...signInPayload, [type]: '' });

    if (type === 'id') {
      if (!validateId(input)) return;
    }
    if (type === 'password') {
      if (!validatePassword(input)) return;
    }
    setSignInPayload({ ...signInPayload, [type]: input });
  };

  return (
    <AuthContainer>
      <p>Login</p>
      <Input
        placeholder={'아이디를 입력하세요.'}
        onChange={handleChange('id')}
      />
      <Input
        placeholder={'비밀번호를 입력하세요.'}
        type="password"
        onChange={handleChange('password')}
      />
      <Button disabled={disabled} variant="auth">
        로그인
      </Button>
    </AuthContainer>
  );
};

export default SignIn;

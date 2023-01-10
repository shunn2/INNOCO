import React, { useState, useEffect } from 'react';
import { Input, Button } from '@components/Common';
import { AuthContainer } from '@components/Auth';
import { SignInPaylaod } from '@/types/auth';
import { validateInput } from '@utils/validation';

const SignIn = () => {
  const initialSignInPayload: SignInPaylaod = {
    id: '',
    password: '',
  };

  const initialErrorState = {
    id: false,
    password: false,
  };

  const [signInPayload, setSignInPayload] =
    useState<SignInPaylaod>(initialSignInPayload);
  const [error, setError] = useState(initialErrorState);
  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    const { id, password } = signInPayload;
    setDisabled(!!(!id || !password));
  }, [signInPayload]);

  const handleChange =
    (type: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const input = e.target.value;
      setSignInPayload({ ...signInPayload, [type]: '' });

      if (!validateInput(type, input)) {
        setError({ ...error, [type]: true });
        return;
      }
      setError({ ...error, [type]: false });
      setSignInPayload({ ...signInPayload, [type]: input });
    };

  return (
    <AuthContainer>
      <p>Login</p>
      <Input
        placeholder={'아이디를 입력하세요.'}
        onChange={handleChange('id')}
        error={error.id}
      />
      <Input
        placeholder={'비밀번호를 입력하세요.'}
        type="password"
        onChange={handleChange('password')}
        error={error.password}
      />
      <Button disabled={disabled} variant="auth">
        로그인
      </Button>
    </AuthContainer>
  );
};

export default SignIn;

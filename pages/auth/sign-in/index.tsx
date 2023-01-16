import React, { useState, useEffect } from 'react';
import { Input, Button } from '@components/Common';
import { AuthContainer, ErrorMessage } from '@components/Auth';
import { SignInPayload } from '@/types/auth';
import { validateInput } from '@utils/validation';

const SignIn = () => {
  const initialSignInPayload: SignInPayload = {
    memberLoginId: '',
    memberLoginPw: '',
  };

  const initialErrorState = {
    memberLoginId: false,
    memberLoginPw: false,
  };

  const [signInPayload, setSignInPayload] =
    useState<SignInPayload>(initialSignInPayload);
  const [error, setError] = useState(initialErrorState);
  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    const { memberLoginId, memberLoginPw } = signInPayload;
    setDisabled(!!(!memberLoginId || !memberLoginPw));
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
        onChange={handleChange('memberLoginId')}
        error={error.memberLoginId}
      />
      {error.memberLoginId && <ErrorMessage type="id" />}
      <Input
        placeholder={'비밀번호를 입력하세요.'}
        type="password"
        onChange={handleChange('memberLoginPw')}
        error={error.memberLoginPw}
      />
      {error.memberLoginPw && <ErrorMessage type="password" />}
      <Button disabled={disabled} variant="auth">
        로그인
      </Button>
    </AuthContainer>
  );
};

export default SignIn;

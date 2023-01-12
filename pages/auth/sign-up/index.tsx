import React, { useState, useEffect } from 'react';
import { Input, Button } from '@components/Common';
import { AuthContainer, ErrorMessage } from '@components/Auth';
import { validateInput } from '@utils/validation';
import { SignUpPayload } from '@/types/auth';

const SignUp = () => {
  const initialSignUpPayload: SignUpPayload = {
    email: '',
    name: '',
    password: '',
    id: '',
  };

  const initialErrorState = {
    email: false,
    name: false,
    id: false,
    password: false,
  };

  const [signUpPayload, setSignUpPayload] =
    useState<SignUpPayload>(initialSignUpPayload);
  const [error, setError] = useState(initialErrorState);
  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    const { email, id, password, name } = signUpPayload;
    setDisabled(!!(!email || !id || !password || !name));
  }, [signUpPayload]);

  const handleChange =
    (type: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const input = e.target.value;
      setSignUpPayload({ ...signUpPayload, [type]: '' });

      if (!validateInput(type, input)) {
        setError({ ...error, [type]: true });
        return;
      }
      setError({ ...error, [type]: false });

      setSignUpPayload({ ...signUpPayload, [type]: input });
    };

  return (
    <AuthContainer>
      <p>Sign Up</p>
      <Input
        placeholder={'이메일을 입력하세요.'}
        onChange={handleChange('email')}
        error={error.email}
      />
      {error.email && <ErrorMessage type="email" />}
      <Input
        placeholder={'이름을 입력하세요.'}
        onChange={handleChange('name')}
      />
      <Input
        placeholder={'아이디 입력하세요.'}
        onChange={handleChange('id')}
        error={error.id}
      />
      {error.id && <ErrorMessage type="id" />}
      <Input
        placeholder={'비밀번호를 입력하세요.'}
        type="password"
        onChange={handleChange('password')}
        error={error.password}
      />
      {error.password && <ErrorMessage type="password" />}
      {/* TODO: 이메일 인증 */}
      <Button disabled={disabled} variant="auth">
        회원가입
      </Button>
    </AuthContainer>
  );
};

export default SignUp;

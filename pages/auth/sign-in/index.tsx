import React, { useState, useEffect } from 'react';
import { Input, Button, Layout } from '@components/Common';
import { AuthContainer, ErrorMessage } from '@components/Auth';
import { SignInPayload } from '@/types/auth';
import { validateInput } from '@utils/validation';
import { getSession, signIn } from 'next-auth/react';
import { useRouter } from 'next/router';

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

  const router = useRouter();

  useEffect(() => {
    const getUserSession = async () => {
      const session = await getSession();
      if (session) {
        window.localStorage.setItem(
          'access_token',
          JSON.stringify(session.accessToken)
        );
        router.push('/dashboard', undefined, { shallow: true });
        return;
      }
    };
    getUserSession();
  }, []);

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

  const handleSignInButtonClick = async () => {
    await signIn('credentials', {
      redirect: true,
      memberLoginId: signInPayload.memberLoginId,
      memberLoginPw: signInPayload.memberLoginPw,
    });
  };

  return (
    <Layout>
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
        <Button
          disabled={disabled}
          variant="auth"
          onClick={handleSignInButtonClick}
        >
          로그인
        </Button>
      </AuthContainer>
    </Layout>
  );
};

export default SignIn;

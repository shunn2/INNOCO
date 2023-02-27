import React, { useState, useEffect } from 'react';
import { Input, Button, Layout } from '@components/Common';
import { AuthContainer, ErrorMessage } from '@components/Auth';
import { SignInPayload } from '@/types/auth';
import { validateInput } from '@utils/validation';
import { useRouter } from 'next/router';
import { authApi } from '@api';
import { useSetRecoilState } from 'recoil';
import { userInfoAtom } from '@recoil/user/atom';
import userApi from '@api/userApi';
import Alert from '@components/Common/Alert';

const SignIn = () => {
  const setUserInformation = useSetRecoilState(userInfoAtom);
  const initialSignInPayload: SignInPayload = {
    userLoginId: '',
    userLoginPw: '',
  };

  const initialErrorState = {
    userLoginId: false,
    userLoginPw: false,
  };
  const [signInPayload, setSignInPayload] =
    useState<SignInPayload>(initialSignInPayload);
  const [error, setError] = useState(initialErrorState);
  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    const { userLoginId, userLoginPw } = signInPayload;
    setDisabled(!!(!userLoginId || !userLoginPw));
  }, [signInPayload]);

  const router = useRouter();

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
    const { code, value } = await authApi.signIn(signInPayload);
    if (!code) {
      localStorage.setItem('access_token', JSON.stringify(value.accessToken));
      localStorage.setItem('refresh_token', JSON.stringify(value.refreshToken));
      const user = await userApi.getCurrentUser();
      setUserInformation(user.value);
      router.push('/dashboard');
    } else {
      Alert({ icon: 'error', title: '잘못된 ID or PW를 입력하였습니다' });
      setSignInPayload(initialSignInPayload);
    }
  };

  return (
    <Layout>
      <AuthContainer>
        <p>Login</p>
        <Input
          placeholder={'아이디를 입력하세요.'}
          onChange={handleChange('userLoginId')}
          error={error.userLoginId}
          // value={signInPayload.userLoginId}
        />
        {error.userLoginId && <ErrorMessage type="id" />}
        <Input
          placeholder={'비밀번호를 입력하세요.'}
          type="password"
          onChange={handleChange('userLoginPw')}
          error={error.userLoginPw}
          // value={signInPayload.userLoginPw}
        />
        {error.userLoginPw && <ErrorMessage type="password" />}
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

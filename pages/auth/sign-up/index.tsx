import React, { useState, useEffect } from 'react';
import { Input, Button, Header, Layout } from '@components/Common';
import { AuthContainer, ErrorMessage } from '@components/Auth';
import { validateInput } from '@utils/validation';
import { SignUpPayload } from '@/types/auth';
import { useSignUp } from '@hooks';
import { authApi } from '@api';

const SignUp = () => {
  const initialSignUpPayload: SignUpPayload = {
    userLoginId: '',
    userLoginPw: '',
    userEmail: '',
    userName: '',
    userProfileUrl: '',
  };

  const initialErrorState = {
    userEmail: false,
    userLoginId: false,
    userLoginPw: false,
    userName: false,
  };

  const [signUpPayload, setSignUpPayload] =
    useState<SignUpPayload>(initialSignUpPayload);
  const [error, setError] = useState(initialErrorState);
  const [disabled, setDisabled] = useState(true);
  const [checkDuplicate, setCheckDuplicate] = useState(false);
  const [isDuplicated, setIsDuplicated] = useState(false);
  const signUp = useSignUp();

  useEffect(() => {
    const { userEmail, userLoginId, userLoginPw, userName, userProfileUrl } =
      signUpPayload;

    setDisabled(
      !!(
        !userEmail ||
        !userLoginId ||
        !userLoginPw ||
        !userName ||
        !checkDuplicate ||
        isDuplicated
      )
    );
  }, [signUpPayload, checkDuplicate]);

  const handleChange =
    (type: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      if (type === 'userLoginId') setCheckDuplicate(false);
      const input = e.target.value;
      setSignUpPayload({ ...signUpPayload, [type]: '' });

      if (!validateInput(type, input)) {
        setError({ ...error, [type]: true });
        return;
      }
      setError({ ...error, [type]: false });
      setSignUpPayload({ ...signUpPayload, [type]: input });
    };

  const handleSignUpButtonClick = () => {
    signUp.mutate(signUpPayload);
  };

  const checkDuplicateId = async () => {
    const userLoginId = signUpPayload.userLoginId;
    const { value } = await authApi.checkDuplicate(userLoginId);
    if (!value) {
      setCheckDuplicate(true);
    }
    setIsDuplicated(value);
  };

  return (
    <Layout>
      <AuthContainer>
        <p>Sign Up</p>
        <Input
          type="auth"
          placeholder={'이메일을 입력하세요.'}
          onChange={handleChange('userEmail')}
          error={error.userEmail}
        />
        {error.userEmail && <ErrorMessage type="email" />}
        <Input
          placeholder={'이름을 입력하세요.'}
          onChange={handleChange('userName')}
        />
        <Input
          placeholder={'아이디 입력하세요.'}
          onChange={handleChange('userLoginId')}
          error={error.userLoginId}
        />
        <button onClick={checkDuplicateId}>아이디 중복 확인</button>
        {isDuplicated && <ErrorMessage type="duplicate" />}
        {error.userLoginId && <ErrorMessage type="id" />}
        <Input
          placeholder={'비밀번호를 입력하세요.'}
          type="password"
          onChange={handleChange('userLoginPw')}
          error={error.userLoginPw}
        />
        {error.userLoginPw && <ErrorMessage type="password" />}
        {/* TODO: 이메일 인증 */}
        <Button
          disabled={disabled}
          variant="auth"
          onClick={handleSignUpButtonClick}
        >
          회원가입
        </Button>
      </AuthContainer>
    </Layout>
  );
};

export default SignUp;

import React, { useState, useEffect } from 'react';
import { Input, Button } from '@components/Common';
import { AuthContainer, ErrorMessage } from '@components/Auth';
import { validateInput } from '@utils/validation';
import { SignUpPayload } from '@/types/auth';
import { useSignUp } from '@hooks';

const SignUp = () => {
  const initialSignUpPayload: SignUpPayload = {
    memberLoginId: '',
    memberLoginPw: '',
    memberEmail: '',
    memberName: '',
    memberProfileUrl: '',
  };

  const initialErrorState = {
    memberEmail: false,
    memberLoginId: false,
    memberLoginPw: false,
    memberName: false,
  };

  const [signUpPayload, setSignUpPayload] =
    useState<SignUpPayload>(initialSignUpPayload);
  const [error, setError] = useState(initialErrorState);
  const [disabled, setDisabled] = useState(true);
  const signUp = useSignUp();

  useEffect(() => {
    const {
      memberEmail,
      memberLoginId,
      memberLoginPw,
      memberName,
      memberProfileUrl,
    } = signUpPayload;

    setDisabled(
      !!(!memberEmail || !memberLoginId || !memberLoginPw || !memberName)
    );
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

  const handleSignUpButtonClick = () => {
    signUp.mutate(signUpPayload);
  };

  return (
    <AuthContainer>
      <p>Sign Up</p>
      <Input
        placeholder={'이메일을 입력하세요.'}
        onChange={handleChange('memberEmail')}
        error={error.memberEmail}
      />
      {error.memberEmail && <ErrorMessage type="email" />}
      <Input
        placeholder={'이름을 입력하세요.'}
        onChange={handleChange('memberName')}
      />
      <Input
        placeholder={'아이디 입력하세요.'}
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
      {/* TODO: 이메일 인증 */}
      <Button
        disabled={disabled}
        variant="auth"
        onClick={handleSignUpButtonClick}
      >
        회원가입
      </Button>
    </AuthContainer>
  );
};

export default SignUp;

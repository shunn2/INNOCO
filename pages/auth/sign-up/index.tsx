import React, { useState, useEffect } from 'react';
import { Input, Button, Header, Layout } from '@components/Common';
import { AuthContainer, ErrorMessage } from '@components/Auth';
import { validateInput } from '@utils/validation';
import { SignUpPayload } from '@/types/auth';
import { useSignUp } from '@hooks';
import { authApi } from '@api';

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
  const [checkDuplicate, setCheckDuplicate] = useState(false);
  const [isDuplicated, setIsDuplicated] = useState(false);
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
      !!(
        !memberEmail ||
        !memberLoginId ||
        !memberLoginPw ||
        !memberName ||
        !checkDuplicate ||
        isDuplicated
      )
    );
  }, [signUpPayload, checkDuplicate]);

  const handleChange =
    (type: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setCheckDuplicate(false);
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
    const memberLoginId = signUpPayload.memberLoginId;
    const { value } = await authApi.checkDuplicate(memberLoginId);
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
        <button onClick={checkDuplicateId}>아이디 중복 확인</button>
        {isDuplicated && <ErrorMessage type="duplicate" />}
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
    </Layout>
  );
};

export default SignUp;

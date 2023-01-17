import { PropsWithChildren, ReactNode } from 'react';
import * as Styled from './styled';

export interface ErrorMessageProps {
  type: 'email' | 'id' | 'password' | 'duplicate';
}

const ErrorMessage = (props: PropsWithChildren<ErrorMessageProps>) => {
  const { type } = props;

  const message = {
    email: '이메일은 email@도메인 형식이어야 합니다.',
    id: '아이디는 영소문자와 숫자를 혼합한 6~20자리어야 합니다.',
    password:
      '비밀번호는 영소문자와 숫자, 특수문자를 혼합하여 최소 8자리어야 합니다.',
    duplicate: '중복된 아이디입니다.',
  };

  return <Styled.TextWrapper type={type}>{message[type]}</Styled.TextWrapper>;
};

export default ErrorMessage;

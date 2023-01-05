import React, { PropsWithChildren } from 'react';
import * as Styled from './styled';

interface InputProps {
  placeholder: string;
  type?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input = (props: PropsWithChildren<InputProps>) => {
  const { placeholder, ...rest } = props;

  return <Styled.Input placeholder={placeholder} {...rest} />;
};

export default Input;

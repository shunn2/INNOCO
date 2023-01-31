import React, { PropsWithChildren } from 'react';
import * as Styled from './styled';

export interface InputProps {
  placeholder: string;
  type?: string;
  error?: boolean;
  size?: number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input = (props: PropsWithChildren<InputProps>) => {
  const { placeholder, ...rest } = props;

  return <Styled.Input placeholder={placeholder} {...rest} />;
};

export default Input;

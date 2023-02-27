import React, { PropsWithChildren } from 'react';
import * as Styled from './styled';

export interface InputProps {
  placeholder: string;
  value?: string | number;
  type?: string;
  error?: boolean;
  size?: number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input = (props: PropsWithChildren<InputProps>) => {
  const { placeholder, value, ...rest } = props;

  return <Styled.Input placeholder={placeholder} {...rest} />;
};

export default Input;

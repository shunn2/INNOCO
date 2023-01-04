import React, { PropsWithChildren } from 'react';
import * as Styled from './styled';

interface ButtonProps {
  variant: 'auth';
  type?: 'button' | 'submit';
  disabled?: boolean;
  onClick?: () => void;
}

const Button = (props: PropsWithChildren<ButtonProps>) => {
  const { children, ...rest } = props;
  return <Styled.Button {...rest}>{children}</Styled.Button>;
};

Button.defaultProps = {
  disabled: false,
  type: 'button',
};

export default Button;

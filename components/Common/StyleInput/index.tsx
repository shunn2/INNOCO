import React, { PropsWithChildren } from 'react';
import * as Styled from './styled';

export interface StyleInputProps {
  placeholder: string;
  size: number;
  width?: number | string;
  height?: number;
  selectList?: string[];
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const StyleInput = (props: PropsWithChildren<StyleInputProps>) => {
  const { placeholder, selectList, ...rest } = props;

  return <Styled.Input placeholder={placeholder} {...rest} />;
};

export default StyleInput;

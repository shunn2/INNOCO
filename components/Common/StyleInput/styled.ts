import styled from 'styled-components';
import theme from '@styles/theme';

export const Input = styled.input<{
  size: number;
  width?: number | string;
  height?: number;
}>`
  width: ${(props) => (props.width ? `${props.width}px` : '100%')};
  height: ${(props) => (props.height ? `${props.height}px` : '24px')};
  background-color: ${theme.color.gray.middle};
  color: ${theme.color.white.dark};
  padding: 2px 6px;
  margin-left: -6px;
  margin-right: -6px;
  border-radius: 4px;
  ::placeholder {
    color: ${theme.color.white.dark};
  }
  &:hover {
    background-color: #373c44;
  }
  &:focus {
    border: 2px solid ${theme.color.blue.light};
    outline-color: ${theme.color.blue.light};
  }
`;

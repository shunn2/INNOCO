import styled, { css } from 'styled-components';
import theme from '@styles/theme';

export const Input = styled.input<{ error?: boolean; type?: string }>`
  ${({ error }) => {
    return css`
      border: 1px solid ${error ? 'red' : 'none'};
    `;
  }}
  width: 200px;
  height: 40px;
  padding: 16px;
  background-color: ${theme.color.gray.middle};
  color: #ffffff;
  border-radius: 12px;

  ::placeholder {
    color: ${theme.color.gray.light};
  }

  &:focus {
    border: 1px solid ${theme.color.blue};
    outline-color: ${theme.color.blue};
  }
`;

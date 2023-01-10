import styled, { css } from 'styled-components';
import theme from '@styles/theme';

export const Input = styled.input<{ error?: boolean }>`
  ${({ error }) => {
    return css`
      border: 1px solid ${error ? 'red' : 'none'};
    `;
  }}
  width: 180px;
  height: 24px;
  padding: 2px 6px;
  background-color: ${theme.color.gray.middle};
  color: #ffffff;
  border-radius: 2px;

  ::placeholder {
    color: ${theme.color.gray.light};
  }

  &:focus {
    border: 1px solid ${theme.color.blue};
    outline-color: ${theme.color.blue};
  }
`;

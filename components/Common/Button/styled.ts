import styled, { css } from 'styled-components';
import theme from '@styles/theme';

export const Button = styled.button<{ disabled?: boolean }>`
  ${({ disabled }) => {
    const { blue, gray } = theme.color;
    return css`
      width: 180px;
      height: 32px;
      background-color: ${disabled ? gray.middle : blue};
      border: 2px;
      color: ${disabled ? gray.light : '#FFFFFF'};
    `;
  }}
`;

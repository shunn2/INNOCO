import styled, { css } from 'styled-components';
import theme from '@styles/theme';

export const Button = styled.button<{ disabled?: boolean }>`
  ${({ disabled }) => {
    const { blue, gray, white } = theme.color;
    return css`
      min-width: 100px;
      min-height: 32px;
      background-color: ${disabled ? white.dark : blue.middle};
      border-radius: 8px;
      color: ${disabled ? gray.light : '#FFFFFF'};
      padding: 8px 12px;
      cursor: pointer;
    `;
  }}
`;

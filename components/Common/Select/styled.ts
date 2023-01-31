import theme from '@styles/theme';
import styled from 'styled-components';

export const Select = styled.select<{ size: number }>`
  width: ${(props) => `${props.size}px`};
  margin: 0 0 4px 12px;
  border-radius: 4px;
  min-width: 150px;
  color: ${theme.color.white.dark};
  &:hover {
    background-color: ${theme.color.unique.side};
  }
  &:focus {
    border: 2px solid ${theme.color.blue.light};
    outline-color: ${theme.color.blue.light};
  }
`;

export const Option = styled.option``;

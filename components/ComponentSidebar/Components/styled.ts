import styled from 'styled-components';
import theme from '@styles/theme';

export const ComponentItems = styled.div`
  width: 100%;
  height: 32px;
  display: flex;
  align-items: center;
  padding: 0 12px;
  color: ${theme.color.blue};
  border: 1px solid #fff;
  background-color: ${theme.color.gray.middle};
  cursor: grabbing;
  > div {
    background-color: ${theme.color.gray.middle};
  }
  > svg {
    background-color: ${theme.color.gray.middle};
  }
`;

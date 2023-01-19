import styled from 'styled-components';
import theme from '@styles/theme';

export const ComponentItems = styled.div`
  width: 100%;
  height: 32px;
  display: flex;
  align-items: center;
  padding: 0 4px;
  background-color: ${theme.color.gray.middle};
  border-radius: 2px;
  margin-bottom: 4px;
  font-size: 14px;
  cursor: grabbing;
  > div {
    background-color: ${theme.color.gray.middle};
  }
  > svg {
    background-color: ${theme.color.gray.middle};
  }
`;

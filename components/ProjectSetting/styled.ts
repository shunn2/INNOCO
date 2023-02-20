import theme from '@styles/theme';
import styled from 'styled-components';

export const TabContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 48px;
`;

export const Tab = styled.div<{ selected: boolean }>`
  font-size: 20px;
  padding: 14px 18px;
  cursor: pointer;
  border-bottom: ${(props) =>
    props.selected && `2px solid ${theme.color.blue.middle}`};
`;

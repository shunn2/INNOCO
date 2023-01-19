import styled from 'styled-components';
import theme from '@styles/theme';

export const StyleSidebar = styled.div`
  width: 300px;
  height: 100%;
  background-color: ${theme.color.gray.middle};
  color: ${theme.color.blue};
`;

export const TabWrapper = styled.div`
  display: flex;
  padding: 8px 8px 0;
  font-size: 16px;
  line-height: 20px;
  border-bottom: 1px solid ${theme.color.gray.dark};
`;

export const Tab = styled.div<{ selected: boolean }>`
  padding: 8px;
  color: ${(props) =>
    props.selected
      ? `${theme.color.white.light}`
      : `${theme.color.white.middle}}`};
  border-bottom: ${(props) =>
    props.selected ? `1px solid ${theme.color.blue.light}` : ''};
  cursor: pointer;
`;

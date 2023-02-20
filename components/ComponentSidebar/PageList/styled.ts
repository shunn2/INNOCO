import theme from '@styles/theme';
import styled from 'styled-components';

export const CategoryTitle = styled.h4`
  font-size: 12px;
  font-weight: bold;
  padding: 12px 8px 16px 0px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  > .add_page {
    font-size: 24px;
    cursor: pointer;
    &:hover {
      color: ${theme.color.blue.middle};
    }
  }
`;

export const PageListContainer = styled.div<{ selected: boolean }>`
  display: flex;
  height: 35px;
  justify-content: space-between;
  align-items: center;
  padding: 6px 8px 6px 12px;
  background-color: ${theme.color.gray.middle};
  color: ${(props) => props.selected && theme.color.blue.middle};
  margin-bottom: 8px;
  cursor: pointer;
`;

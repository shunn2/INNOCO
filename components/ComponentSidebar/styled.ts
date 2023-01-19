import styled from 'styled-components';
import theme from '@styles/theme';

export const ComponentSidebar = styled.div`
  width: 166px;
  height: 100%;
  background-color: ${theme.color.blue.dark};
`;

export const Category = styled.div`
  padding: 0 12px;
  color: ${theme.color.white.middle};
`;

export const CategoryTitle = styled.h4`
  font-size: 12px;
  font-weight: bold;
  padding: 12px 8px 12px 0px;
`;

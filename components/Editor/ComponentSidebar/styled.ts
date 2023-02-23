import styled from 'styled-components';
import theme from '@styles/theme';

export const ComponentSidebar = styled.div`
  width: 166px;
  height: 100%;
  background-color: ${theme.color.gray.middle};
  color: ${theme.color.blue};
  border: 1px solid #fff;
  @media (min-width: 800px) {
    .fixed-size {
      width: 200px;
      height: 200px;
    }
  }
`;

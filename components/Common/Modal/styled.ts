import theme from '@styles/theme';
import styled from 'styled-components';

export const ModalTitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 24px;
  margin-bottom: 32px;
  color: ${theme.color.gray.light};
  > div {
    cursor: pointer;
  }
`;

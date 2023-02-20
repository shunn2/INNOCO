import theme from '@styles/theme';
import styled from 'styled-components';

export const ProjectVersionContainer = styled.div`
  min-width: 750px;
`;

export const VersionAlertMessage = styled.p`
  color: ${theme.color.white.dark};
`;

export const ArchivedContainer = styled.div`
  display: grid;
  gap: 20px 0;
`;

export const ArchivedWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(50px, 200px));
  justify-items: center;
  font-size: 20px;
`;

export const ModalClose = styled.div`
  display: flex;
  justify-content: flex-end;
  cursor: default;
  font-size: 32px;
`;

export const ModalContents = styled.div`
  overflow-y: scroll;
`;

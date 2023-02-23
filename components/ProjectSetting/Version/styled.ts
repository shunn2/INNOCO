import theme from '@styles/theme';
import styled from 'styled-components';

export const ProjectVersionContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export const VersionAlertMessage = styled.p`
  color: ${theme.color.white.dark};
  width: 100%;
  display: flex;
  justify-content: center;
`;

export const ArchivedContainer = styled.div`
  display: grid;
  width: 100%;
  gap: 20px 0;
  justify-items: center;
  margin-top: 50px;
`;

export const ArchivedWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(50px, 200px));
  justify-items: center;
  font-size: 20px;
  margin-bottom: 20px;
  cursor: pointer;
  &:hover {
    color: ${theme.color.blue.middle};
  }
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

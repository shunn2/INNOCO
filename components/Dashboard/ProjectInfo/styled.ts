import styled from 'styled-components';
import Image from 'next/image';

export const ProjectInfoContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const ProjectContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 12px;

  & > :first-child {
    margin-bottom: 4px;
  }
`;

export const ProjectThumbnail = styled(Image)`
  width: 60px;
  height: 36px;
`;

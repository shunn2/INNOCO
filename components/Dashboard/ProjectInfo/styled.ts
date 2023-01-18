import styled from 'styled-components';
import Image from 'next/image';

export const ProjectInfoContainer = styled.div`
  display: flex;
  align-items: flex-start;
  margin: 20px 0;
`;

export const ProjectContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 12px;

  & > :first-child {
    margin-bottom: 4px;
  }
`;

export const ProjectThumbnail = styled.img`
  width: 100px;
  height: 64px;
  border-radius: 8px;
`;

export const ProjectStatus = styled.div`
  display: flex;
  align-items: center;
  width: fit-content;
  height: 24px;
  padding: 6px;
  border: 1px solid white;
  border-radius: 20px;
  font-size: 12px;
`;

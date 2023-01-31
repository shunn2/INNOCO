import styled from 'styled-components';
import Image from 'next/image';
import theme from '@styles/theme';

export const ProjectInfoContainer = styled.a`
  background-color: ${theme.color.gray.middle};
  border-radius: 4px;
`;

export const ProjectContentWrapper = styled.div`
  padding: 16px 18px 16px;
  font-size: 20px;
  z-index: 9;
`;

export const ProjectThumbnailWrapeer = styled.div`
  overflow: hidden;
`;

export const ProjectThumbnail = styled.img`
  width: 100%;
  height: 240px;
  z-index: 5;
  transition: all 0.2s linear;
  &:hover {
    transform: scale(1.2);
  }
`;

export const ProjectStatus = styled.div`
  margin: 6px 0;
  font-size: 12px;
`;

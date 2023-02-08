import styled from 'styled-components';
import Image from 'next/image';
import theme from '@styles/theme';

export const ProjectInfoContainer = styled.a`
  background-color: ${theme.color.gray.middle};
  border-radius: 4px;
`;

export const ProjectContentWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 16px 18px 16px;
  font-size: 20px;
  z-index: 9;
`;

export const SettingWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-end;
`;

export const SettingModal = styled.div`
  position: absolute;
  background-color: ${theme.color.white.dark};
`;

export const SettingList = styled.div`
  width: 80px;
  font-size: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 8px 4px;
  &:hover {
    color: ${theme.color.unique.side};
    cursor: pointer;
  }
`;

export const ProjectThumbnailWrapeer = styled.div`
  cursor: pointer;
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

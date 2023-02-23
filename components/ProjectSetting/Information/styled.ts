import theme from '@styles/theme';
import styled from 'styled-components';

export const InformationContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
  @media (max-width: 800px) {
    flex-direction: column;
  }
`;

export const ThumbnailContainer = styled.div`
  color: ${theme.color.gray.light};
  margin-right: 50px;
`;

export const InputLabel = styled.div`
  font-size: 16px;
  color: ${theme.color.gray.light};
  margin-bottom: 16px;
`;

export const ThumbnailWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  min-width: 400px;
`;

export const Thumbnail = styled.img<{
  width: number;
  height: number;
}>`
  width: ${(props) => `${props.width}px`};
  height: ${(props) => `${props.height}px`};
  border: 2px solid ${theme.color.blue.middle};
  margin-bottom: 18px;
`;

export const ProjectInfoContainer = styled.div``;

export const StatusSelect = styled.select`
  background-color: ${theme.color.gray.middle};
  width: 300px;
  height: 50px;
  border-radius: 4px;
  padding: 0 12px;
  margin-left: -6px;
`;

export const StatusOption = styled.option``;

export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 285px;
`;
export const ChangeButton = styled.button`
  padding: 10px 12px;
  font-size: 16px;
  border-radius: 6px;
  background-color: ${theme.color.blue.middle};
  cursor: pointer;
`;

import theme from '@styles/theme';
import styled from 'styled-components';

export const ProjectModalContainer = styled.div`
  display: flex;
  height: 100%;
  flex-direction: column;
  justify-content: space-between;
`;

export const ButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

export const CloseButton = styled.div`
  font-size: 24px;
  padding: 4px;
  margin-bottom: 16px;
  cursor: pointer;
`;

export const SubmitButton = styled.button<{ disabled: boolean }>`
  background-color: ${(props) =>
    props.disabled ? theme.color.gray.middle : theme.color.blue.middle};
  padding: 6px 10px;
  border-radius: 4px;
  cursor: pointer;
  pointer-events: ${(props) => props.disabled && 'none'};
  &:hover {
    background-color: ${theme.color.blue.light};
  }
`;

export const Title = styled.div`
  font-size: 20px;
  margin-bottom: 14px;
  color: ${theme.color.gray.light};
`;

export const InputWrapper = styled.div`
  width: 100%;
  align-items: center;
  margin: 16px 0;
  color: ${theme.color.gray.light};
`;

export const InputLabel = styled.div`
  font-size: 12px;
  margin: 8px 0 12px 4px;
  color: ${theme.color.gray.light};
`;

export const ThumbnailWrapper = styled.div`
  display: flex;
  margin-top: 16px;
`;

export const Thumbnail = styled.img<{
  width: number;
  height: number;
  selected: boolean;
}>`
  width: ${(props) => `${props.width}px`};
  height: ${(props) => `${props.height}px`};
  border: 0.5px solid ${theme.color.unique.side};
  border: ${(props) =>
    props.selected ? `2px solid ${theme.color.blue.middle}` : ''};
`;

export const ThumbnailTitle = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 8px 0;
`;

export const TemplateContainer = styled.div`
  width: 100%;
  display: flex;
  overflow-x: scroll;
`;

export const TemplateWrapper = styled.div<{ selected?: boolean }>``;

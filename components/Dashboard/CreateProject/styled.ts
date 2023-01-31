import theme from '@styles/theme';
import styled from 'styled-components';

export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: end;
`;

export const CloseButton = styled.div`
  font-size: 24px;
  padding: 4px;
  margin-bottom: 16px;
  cursor: pointer;
`;

export const SubmitButton = styled.div`
  background-color: ${theme.color.blue.middle};
  padding: 6px 10px;
  border-radius: 4px;
  cursor: pointer;
`;

export const Title = styled.div`
  font-size: 20px;
  margin-bottom: 36px;
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
  margin: 8px 0 4px 4px;
`;

export const ThumbnailWrapper = styled.div`
  display: flex;
  margin-top: 16px;
`;

export const Thumbnail = styled.img`
  width: 300px;
  height: 240px;
  margin-left: 36px;
`;

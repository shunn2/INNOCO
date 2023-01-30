import theme from '@styles/theme';
import styled from 'styled-components';

export const ImageUploadWrapper = styled.div``;

export const ImageUploadInput = styled.input`
  position: absolute;
  width: 0;
  height: 0;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  border: 0;
`;

export const ImageUploadLabel = styled.label`
  background-color: ${theme.color.unique.side};
  display: inline-block;
  padding: 10px 12px;
  color: ${theme.color.white.light};
  border-radius: 6px;
  &:hover {
    color: ${theme.color.blue.middle};
  }
`;

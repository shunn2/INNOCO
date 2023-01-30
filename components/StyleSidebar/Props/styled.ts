import theme from '@styles/theme';
import styled from 'styled-components';

export const PropsBox = styled.div`
  margin: 16px 12px;
`;

export const PropsContainer = styled.div`
  display: flex;
  align-items: center;
  margin: 12px 0;
  color: #fff;
  color: ${theme.color.white.middle};
`;

export const Title = styled.div`
  font-size: 14px;
  line-height: 20px;
  margin-bottom: 4px;
  color: ${theme.color.white.middle};
  //margin or line-height 조정
`;

export const ImageContainer = styled.div<{ imageUrl: string }>`
  width: 48px;
  height: 48px;
  border-radius: 6px;
  margin-right: 12px;
  background-image: url(${(props) => props.imageUrl});
  background-size: 100% 100%;
`;

export const ImageInput = styled.input`
  width: 200px;
  height: 48px;
  color: ${theme.color.white.dark};
  padding: 2px 6px;
  border-radius: 4px;
  text-align: center;
  text-overflow: ellipsis;
  &:hover {
    background-color: ${theme.color.gray.middle};
  }
  ::placeholder {
    text-align: center;
  }
  &:focus {
    border: 2px solid ${theme.color.blue.light};
    outline-color: ${theme.color.blue.light};
  }
`;

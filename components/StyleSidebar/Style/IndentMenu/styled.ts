import theme from '@styles/theme';
import styled from 'styled-components';

export const IndentContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

export const IndentTitle = styled.div<{ type?: string }>`
  position: absolute;
  top: 12px;
  left: 16px;
  color: ${(props) =>
    props.type === 'padding' ? `#fff` : `${theme.color.white.dark}`};
`;

export const MarginContainer = styled.div`
  position: relative;
  width: 100%;
  height: 180px;
  background-color: #373c44;
`;

export const IndentBox = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  width: 100%;
`;

export const InputBox = styled.div`
  width: 70px;
  padding: 6px 0;
`;

export const IndentInput = styled.input`
  width: 100%;
  height: 24px;
  color: ${theme.color.white.dark};
  padding: 2px 6px;
  border-radius: 4px;
  text-align: center;
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

export const PaddingContainer = styled.div`
  position: relative;
  width: 146px;
  height: 108px;
  background-color: ${theme.color.gray.middle};
`;

export const CenterBorder = styled.div`
  width: 4px;
  height: 18px;
  background-color: #373c44;
`;

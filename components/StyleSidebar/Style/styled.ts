import theme from '@styles/theme';
import styled from 'styled-components';

export const StyleBox = styled.div`
  margin: 16px 12px;
  position: relative;
`;

export const StyleContainer = styled.div`
  display: flex;
  align-items: center;
  margin: 12px 0;
  color: #fff;
  color: ${theme.color.white.middle};
`;

export const ColorSquare = styled.div<{ color: string }>`
  width: 24px;
  height: 24px;
  border: 1px solid ${theme.color.white.middle};
  border-radius: 6px;
  margin-right: 12px;
  cursor: pointer;
  background-color: ${(props) => props.color};
`;

export const AbsoluteColorPicker = styled.div`
  position: absolute;
  z-index: 99;
  top: 0px;
  left: 36px;
`;

export const InputContainer = styled.div`
  padding: 4px 16px 16px 4px;
  align-items: center;
`;

export const Title = styled.div`
  min-width: 70px;
  font-size: 14px;
  line-height: 20px;
  margin-bottom: 4px;
  color: ${theme.color.white.middle};
  //margin or line-height 조정
`;

export const SvgWrapper = styled.div<{ selected: boolean }>`
  padding: 4px;
  border: ${(props) =>
    props.selected
      ? `2px solid ${theme.color.white.dark}`
      : `0.5px solid ${theme.color.white.dark}`};
  margin-left: -1px;
  background-color: ${(props) => props.selected && '#373c44'};
  &:hover {
    background-color: #373c44;
  }
`;

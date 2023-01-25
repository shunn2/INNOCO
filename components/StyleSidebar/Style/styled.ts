import theme from '@styles/theme';
import styled from 'styled-components';

export const StyleContainer = styled.div`
  display: flex;
  align-items: center;
  color: #fff;
  padding: 0 12px;
`;

export const ColorSquare = styled.div<{ color: string }>`
  width: 24px;
  height: 24px;
  border: 1px solid #fff;
  border-radius: 6px;
  margin-right: 12px;
  cursor: pointer;
  background-color: ${(props) => props.color};
`;

export const AbsoluteColorPicker = styled.div`
  position: absolute;
  margin-left: -228px;
  margin-top: -20px;
`;

export const InputContainer = styled.div`
  padding: 4px 16px 16px 4px;
`;

export const InputTitle = styled.div`
  font-size: 14px;
  line-height: 20px;
  margin-bottom: 4px;
  color: ${theme.color.white.middle};
  //margin or line-height 조정
`;

export const SvgWrapper = styled.div<{ selected: boolean }>`
  padding: 4px;
  border: 0.5px solid #fff;
  margin-left: -1px;
  background-color: ${(props) => props.selected && '#373c44'};
  &:hover {
    background-color: #373c44;
  }
`;

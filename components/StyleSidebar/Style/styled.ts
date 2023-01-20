import styled from 'styled-components';

export const StyleContainer = styled.div`
  display: flex;
  align-items: center;
  color: #fff;
  cursor: pointer;
  padding: 0 12px;
`;

export const ColorSquare = styled.div<{ color: string }>`
  width: 24px;
  height: 24px;
  border: 1px solid #fff;
  border-radius: 6px;
  margin-right: 12px;
  background-color: ${(props) => props.color};
`;

export const AbsoluteColorPicker = styled.div`
  position: absolute;
  margin-left: -228px;
  margin-top: -20px;
`;

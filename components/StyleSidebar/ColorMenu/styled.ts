import styled from 'styled-components';

export const ColorContainer = styled.div`
  color: #fff;
  cursor: pointer;
`;

export const ColorSquare = styled.div<{ color: string }>`
  width: 24px;
  height: 24px;
  border: 1px solid #fff;
  border-radius: 6px;
  margin-right: 12px;
  color: ${(props) => props.color};
`;

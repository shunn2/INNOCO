import styled from 'styled-components';

export const BackgroundColorContainer = styled.div`
  color: #fff;
  cursor: pointer;
`;

export const BackgroundColorSquare = styled.div<{ backgroundColor: string }>`
  width: 24px;
  height: 24px;
  border: 1px solid #fff;
  border-radius: 6px;
  margin-right: 12px;
  background-color: ${(props) => props.backgroundColor};
`;

import theme from '@styles/theme';
import styled from 'styled-components';

export const EditPageContainer = styled.div``;

export const Title = styled.div`
  font-size: 20px;
  margin-bottom: 14px;
  color: ${theme.color.gray.light};
`;

export const InputWrapper = styled.div`
  width: 100%;
  align-items: center;
  margin: 16px 0 16px 6px;
  color: ${theme.color.gray.light};
`;

export const InputLabel = styled.div`
  font-size: 12px;
  margin: 8px 0 18px -4px;
  color: ${theme.color.gray.light};
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

export const DeleteButton = styled.button<{ disabled: boolean }>`
  background-color: ${(props) =>
    props.disabled ? theme.color.gray.middle : 'red'};
  padding: 6px 10px;
  border-radius: 4px;
  cursor: pointer;
  margin-right: 12px;
`;

import theme from '@styles/theme';
import styled from 'styled-components';

export const ProjectParticipantsContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const InputContainer = styled.div`
  min-width: 800px;
  margin: 16px 0 32px 0;
  display: flex;
  justify-content: center;
`;

export const InputLabel = styled.div`
  font-size: 16px;
  color: ${theme.color.gray.light};
`;

export const Button = styled.button<{
  validate?: boolean | number;
  disabled?: boolean;
}>`
  font-size: 14px;
  border-radius: 6px;
  min-width: 100px;
  margin: 0 32px;
  background-color: ${(props) =>
    props.validate && !props.disabled ? `${theme.color.blue.middle}` : '#aaa'};
  cursor: pointer;
`;

export const ParticipantsContainer = styled.div`
  min-width: 800px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const ParticipantsWrapper = styled.div`
  min-width: 800px;
  display: flex;
  align-items: center;
  margin: 12px 0;
`;

export const ParticipantId = styled.p`
  min-width: 200px;
  font-size: 24px;
  margin: 0 24px;
`;

export const ParticipantAuthority = styled.div`
  min-width: 300px;
  font-size: 24px;
  padding: 6px 8px;
`;

export const ParticipantRemove = styled.button`
  border: 3px solid #f73b3f;
  padding: 10px 18px;
  color: #f73b3f;
  background-color: #fff;
  font-weight: bold;
  cursor: pointer;
  &:hover {
    background-color: #f73b3f;
    color: #fff;
  }
`;

import styled from 'styled-components';

export const InvitationContainer = styled.div`
  display: grid;
  grid-template-rows: 1fr 50px;
  grid-row-gap: 30px;
`;

export const InvitationWrapper = styled.div`
  display: grid;
  grid-template-columns: 100px 200px 200px;
`;

export const ButtonWrapper = styled.div`
  position: fixed;
  display: flex;
  justify-content: space-between;
  width: 230px;
  bottom: 20px;
  right: 40px;
`;

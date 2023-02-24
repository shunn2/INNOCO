import { UserInvitation } from '@/types/setting';
import { Button } from '@components/Common';
import { useEffect, useState } from 'react';
import * as Styled from './styled';
import api from '@api/Api';
import { useRecoilValue } from 'recoil';
import { userInfoAtom } from '@recoil/user/atom';
import Alert from '@components/Common/Alert';

interface InvitationProps {
  invitationList: UserInvitation[];
  handleOpen: () => void;
}

const Invitations = (props: InvitationProps) => {
  const { invitationList, handleOpen } = props;
  const userInformation = useRecoilValue(userInfoAtom);
  const [selectedInvitations, setSelectedInvitations] = useState<string[]>([]);
  const handleSelectInvitation = (checked, id) => {
    if (checked) {
      setSelectedInvitations([...selectedInvitations, id]);
      return;
    }
    setSelectedInvitations(selectedInvitations.filter((el) => el !== id));
  };
  const acceptAllInvitation = async () => {
    const data = await api.acceptAllInvitation(userInformation.userLoginId);
    if (!data.value.code) {
      Alert({ icon: 'success', title: '초대가 모두 수락되었습니다' });
      handleOpen();
      return;
    }
    Alert({ icon: 'error', title: '잠시 후 다시 시도해주세요' });
  };
  const acceptInvitation = () => {
    selectedInvitations.forEach(async (el) => {
      const data = await api.acceptInvitation(el);
      if (data.value.code) {
        Alert({ icon: 'error', title: '잠시 후 다시 시도해주세요' });
        return false;
      }
    });
    Alert({ icon: 'success', title: '선택하신 초대가 모두 수락되었습니다' });
    handleOpen();
  };
  return (
    <Styled.InvitationContainer>
      {invitationList.map((invitation) => (
        <Styled.InvitationWrapper key={invitation.invitationId}>
          <input
            type={'checkbox'}
            checked={selectedInvitations.includes(invitation.invitationId)}
            onChange={(e) =>
              handleSelectInvitation(
                e.currentTarget.checked,
                invitation.invitationId
              )
            }
          />
          <div>{invitation.ownerId}</div>
          <div>{invitation.projectName}</div>
        </Styled.InvitationWrapper>
      ))}
      <Styled.ButtonWrapper>
        <Button onClick={() => acceptAllInvitation()}>모두 수락</Button>
        <Button onClick={() => acceptInvitation()}>선택 수락</Button>
      </Styled.ButtonWrapper>
    </Styled.InvitationContainer>
  );
};

export default Invitations;

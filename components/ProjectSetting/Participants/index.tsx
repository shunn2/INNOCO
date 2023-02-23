import { api } from '@api';
import editApi from '@api/editApi';
import { Select, SvgIcon } from '@components/Common';
import Alert from '@components/Common/Alert';
import StyleInput from '@components/Common/StyleInput';
import { ProjectInfo } from '@components/Dashboard';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import * as Styled from './styled';

interface InvitationPayload {
  projectId: string | string[];
  userEmail: string;
  authority: string;
}
interface ParticipantsList {
  editors: string[];
  viewers: string[];
}

interface InvitationLink {
  joinedUserCheck: boolean;
  invitationId: string;
  invitationLink: string;
}

const validateEmail = (input) => {
  const regex = /^[a-zA-Z0-9+-\_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/; //아이디@도메인
  return regex.test(input);
};

const ParticipantsSetting = () => {
  const projectId = useRouter().query.projectId;
  const [projectInformation, setProjectInformation] = useState({
    projectName: '',
  });
  const [invitationPayload, setInvitationPayload] = useState<InvitationPayload>(
    {
      projectId: projectId,
      userEmail: '',
      authority: 'EDITOR',
    }
  );
  const [emailValidation, setEmailValidation] = useState<boolean>(false);
  const [invitationLink, setInvitaionLink] = useState<InvitationLink>({
    joinedUserCheck: false,
    invitationId: '',
    invitationLink: '',
  });
  const [participantsList, setParticipantsList] = useState<ParticipantsList>({
    editors: [],
    viewers: [],
  });
  const getProjectInformation = async () => {
    const data = await api.fetchSingleProject(projectId);
    setProjectInformation(data.value);
  };
  const handleInputChange =
    (type: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      if (type === 'email') {
        if (validateEmail(e.target.value)) setEmailValidation(true);
        else setEmailValidation(false);
        setInvitationPayload({
          ...invitationPayload,
          userEmail: e.target.value,
        });
      }
      if (type === 'link') return;
    };
  const createInvitaionLink = async () => {
    console.log(invitationPayload.authority);

    const data = await editApi.createInvitationLink(invitationPayload);
    console.log(data);
    setInvitaionLink(data.value);
  };
  const changeAuthority = (e) => {
    setInvitationPayload({ ...invitationPayload, authority: e.target.value });
  };
  const getParticipantsList = async () => {
    const data = await editApi.getProjectParticipants(projectId);
    setParticipantsList(data.value);
  };
  const deleteParticipant = async (type, id) => {
    const data = await editApi.deleteParticipant(projectId, type, id);
  };
  const sendInvitationLink = async () => {
    let data;
    if (invitationLink.joinedUserCheck)
      data = await editApi.sendInvitationLink(
        invitationLink.invitationId,
        projectInformation.projectName,
        invitationPayload.userEmail
      );
    else data = await editApi.sendJoinLink(invitationPayload.userEmail);
    if (data.code === 0)
      Alert({ icon: 'success', title: '메일이 전송되었습니다' });
    else Alert({ icon: 'error', title: '메일 전송에 실패하였습니다.' });
  };
  useEffect(() => {
    getParticipantsList();
    if (projectId) getProjectInformation();
  }, [projectId]);

  return (
    <Styled.ProjectParticipantsContainer>
      <Styled.InputContainer>
        <StyleInput
          placeholder="이메일을 입력하세요."
          size={100}
          width={485}
          height={50}
          onChange={handleInputChange('email')}
        />
        <Select
          optionList={[
            { title: 'EDITOR', value: 'EDITOR' },
            { title: 'VIEWER', value: 'VIEWER' },
          ]}
          onChange={changeAuthority}
          selected={'EDITOR'}
        />
        <Styled.Button
          onClick={() => createInvitaionLink()}
          validate={emailValidation}
        >
          초대 링크 생성
        </Styled.Button>
      </Styled.InputContainer>
      <Styled.InputContainer>
        <StyleInput
          placeholder="초대 링크가 생성됩니다."
          value={invitationLink.invitationLink}
          size={100}
          width={650}
          height={50}
          onChange={handleInputChange('link')}
        />
        <Styled.Button
          validate={invitationLink.invitationId.length}
          onClick={() => sendInvitationLink()}
        >
          메일 전송
        </Styled.Button>
      </Styled.InputContainer>
      <Styled.ParticipantsContainer>
        {participantsList.editors.map((editor, editorIdx) => (
          <Styled.ParticipantsWrapper key={editor}>
            <SvgIcon type="participant_icon" />
            <Styled.ParticipantId>{editor}</Styled.ParticipantId>
            <Styled.ParticipantAuthority>EDITOR</Styled.ParticipantAuthority>
            <Styled.ParticipantRemove
              onClick={() => deleteParticipant('EDITOR', editor)}
            >
              Remove
            </Styled.ParticipantRemove>
          </Styled.ParticipantsWrapper>
        ))}
        {participantsList.viewers.map((viewer, viewerIdx) => (
          <Styled.ParticipantsWrapper key={viewer}>
            <SvgIcon type="participant_icon" />
            <Styled.ParticipantId>{viewer}</Styled.ParticipantId>
            <Styled.ParticipantAuthority>VIEWER</Styled.ParticipantAuthority>
            <Styled.ParticipantRemove
              onClick={() => deleteParticipant('VIEWER', viewer)}
            >
              Remove
            </Styled.ParticipantRemove>
          </Styled.ParticipantsWrapper>
        ))}
      </Styled.ParticipantsContainer>
    </Styled.ProjectParticipantsContainer>
  );
};

export default ParticipantsSetting;

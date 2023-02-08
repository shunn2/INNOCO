import { Project } from '@/types/project';
import { api } from '@api';
import { SvgIcon } from '@components/Common';
import {
  withAuthority,
  withPageId,
  withProjectId,
  withUserId,
} from '@recoil/project';
import projectAtom from '@recoil/project/atom';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import { uuid } from 'uuidv4';
import * as Styled from './styled';

interface ProjectProps {
  project?: Project;
}

const ProjectInfo = ({ project }: ProjectProps) => {
  const { data: session, status } = useSession();
  const [userId, setUserId] = useRecoilState(withUserId);
  const [userAuthority, setUserAuthority] = useRecoilState(withAuthority);
  const [pageId, setPageId] = useRecoilState(withPageId);
  const [_, setProjectId] = useRecoilState(withProjectId);

  const {
    projectId,
    projectName,
    projectStatus,
    projectThumbnailUrl,
    projectAuthority,
    mainPageId,
  } = project;
  const [isSettingOpen, setIsSettingOpen] = useState<boolean>(false);
  const handleSettingOpen = () => {
    setIsSettingOpen(!isSettingOpen);
  };
  const deleteProject = async () => {
    await api.deleteProject(projectId);
    location.reload();
  };
  console.log('main', mainPageId);

  return (
    <Styled.ProjectInfoContainer>
      <Link
        href={`/editor/${projectId}/${mainPageId}`}
        onClick={() => {
          console.log('expire', session.expires);
          setUserId(session.expires);
          setUserAuthority(
            projectAuthority === 'OWNER' ? 'EDITOR' : projectAuthority
          );
          setProjectId(projectId);
          setPageId(mainPageId);
        }}
      >
        <Styled.ProjectThumbnailWrapeer>
          <Styled.ProjectThumbnail src={projectThumbnailUrl} />
        </Styled.ProjectThumbnailWrapeer>
      </Link>
      <Styled.ProjectContentWrapper>
        <div>
          <div>{projectName}</div>
          <Styled.ProjectStatus>{projectStatus}</Styled.ProjectStatus>
        </div>
        <Styled.SettingWrapper onClick={handleSettingOpen}>
          <SvgIcon type="setting-icon" />
          {isSettingOpen && (
            <Styled.SettingModal>
              <Styled.SettingList>Edit</Styled.SettingList>
              <Styled.SettingList onClick={deleteProject}>
                Delete
              </Styled.SettingList>
            </Styled.SettingModal>
          )}
          <Authority>{projectAuthority}</Authority>
        </Styled.SettingWrapper>
      </Styled.ProjectContentWrapper>
    </Styled.ProjectInfoContainer>
  );
};

const Authority = styled.div`
  font-size: 12px;
  display: flex;
  margin-right: 8px;
  margin-top: 8px;
  justify-content: flex-end;
`;

export default ProjectInfo;

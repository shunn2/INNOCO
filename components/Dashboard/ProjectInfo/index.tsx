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
import { useRouter } from 'next/router';
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
  const router = useRouter();
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
  const handleEditClick = () => {
    router.push(`/setting/${projectId}`);
  };

  return (
    <Styled.ProjectInfoContainer>
      <Link
        href={`/editor/${projectId}/${mainPageId}`}
        onClick={() => {
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
        <Styled.ProjectInfoRow>
          <div>{projectName}</div>
          <Styled.SettingWrapper onClick={handleSettingOpen}>
            <SvgIcon type="setting-icon" />
            {isSettingOpen && (
              <Styled.SettingModal>
                <Styled.SettingList onClick={handleEditClick}>
                  Edit
                </Styled.SettingList>
                <Styled.SettingList onClick={deleteProject}>
                  Delete
                </Styled.SettingList>
              </Styled.SettingModal>
            )}
          </Styled.SettingWrapper>
        </Styled.ProjectInfoRow>
        <Styled.ProjectInfoRow className="mt-3">
          <Styled.ProjectStatus>{projectStatus}</Styled.ProjectStatus>
          <Styled.ProjectStatus>{projectAuthority}</Styled.ProjectStatus>
        </Styled.ProjectInfoRow>
      </Styled.ProjectContentWrapper>
    </Styled.ProjectInfoContainer>
  );
};

export default ProjectInfo;

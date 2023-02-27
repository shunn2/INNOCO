import { Project } from '@/types/project';
import { api } from '@api';
import { SvgIcon } from '@components/Common';
import Alert from '@components/Common/Alert';
import {
  withAuthority,
  withPageId,
  withProjectId,
  withUserId,
} from '@recoil/project';
import { userInfoAtom } from '@recoil/user/atom';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import * as Styled from './styled';

interface ProjectProps {
  project?: Project;
}

const ProjectInfo = ({ project }: ProjectProps) => {
  const router = useRouter();
  const userInformation = useRecoilValue(userInfoAtom);
  const setUserId = useSetRecoilState(withUserId);
  const setUserAuthority = useSetRecoilState(withAuthority);
  const setPageId = useSetRecoilState(withPageId);
  const setProjectId = useSetRecoilState(withProjectId);

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
  const deleteProject = () => {
    Alert({
      icon: 'warning',
      title: '프로젝트를 삭제하시겠습니까?',
      showCancelButton: true,
    }).then((res) => {
      if (res.isConfirmed) {
        api.deleteProject(projectId).then(() => location.reload());
      }
    });
  };
  const handleEditClick = () => {
    router.push(`/setting/${projectId}`);
  };

  return (
    <Styled.ProjectInfoContainer>
      <Link
        href={`/editor/${projectId}/${mainPageId}`}
        onClick={() => {
          setUserId(userInformation.userLoginId);
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
                {projectAuthority === 'OWNER' && (
                  <Styled.SettingList onClick={handleEditClick}>
                    Edit
                  </Styled.SettingList>
                )}
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

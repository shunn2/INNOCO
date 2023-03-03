import { Project } from '@/types/project';
import { api } from '@api';
import editApi from '@api/editApi';
import pageApi from '@api/pageApi';
import { SvgIcon } from '@components/Common';
import Alert from '@components/Common/Alert';
import useDidMountEffect from '@hooks/useDidMountEffect';
import {
  withAuthority,
  withPageId,
  withProjectId,
  withUserId,
} from '@recoil/project';
import { userInfoAtom } from '@recoil/user/atom';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import * as Styled from './styled';

interface ProjectProps {
  project?: Project;
}

const ProjectInfo = ({ project }: ProjectProps) => {
  const router = useRouter();
  const userInformation = useRecoilValue(userInfoAtom);
  const [mainPageId, setMainPageId] = useState<string>('');
  const setUserId = useSetRecoilState(withUserId);
  const setUserAuthority = useSetRecoilState(withAuthority);
  const [pageId, setPageId] = useRecoilState(withPageId);
  const setProjectId = useSetRecoilState(withProjectId);

  const {
    projectId,
    projectName,
    projectStatus,
    projectThumbnailUrl,
    projectAuthority,
    synced,
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
  const exitProject = () => {
    Alert({
      icon: 'warning',
      title: '프로젝트에서 나가시겠습니까?',
      showCancelButton: true,
    }).then((res) => {
      if (res.isConfirmed) {
        editApi
          .deleteParticipant(
            projectId,
            projectAuthority,
            userInformation.userLoginId
          )
          .then(() => location.reload());
      }
    });
  };
  const handleVersionChoice = async ({
    synced,
    projectAuthority,
  }: {
    synced: boolean;
    projectAuthority: string;
  }) => {
    if (projectAuthority === 'VIEWER' || projectStatus === 'PROGRESS') {
      await Alert({
        icon: 'info',
        title: '자동 저장된 버전에서 가져옵니다.',
      });
    } else if (projectAuthority === 'PROGRESS') {
      await Alert({
        icon: 'info',
        title: 'PUBLISH 이력이 없습니다.',
        text: '자동 저장 버전에서 가져옵니다.',
      });
    } else if (synced) {
      await Alert({
        icon: 'info',
        title: '수정 이력이 없습니다.',
        text: 'PUBLISH 버전에서 가져옵니다.',
      });
    } else if (!synced) {
      await Alert({
        icon: 'info',
        title: 'PUBLISH되지 않은 수정 이력이 있습니다.',
        text: '어디서 가져오시겠습니까?',
        showCancelButton: true,
        confirmButtonText: '게시된 프로젝트',
        cancelButtonText: '자동저장된 프로젝트',
        cancelButtonColor: '#DD6B55',
        allowOutsideClick: false,
        allowEscapeKey: false,
      }).then(async (res) => {
        if (res.isConfirmed) {
          await api.overWritePage(projectId);
        }
      });
    }
    const mainPage = await pageApi.getMainPageId(projectId);
    setPageId(mainPage.value);
    router.push(`/editor/${projectId}/${mainPage.value}`);
  };
  const handleEnterEditor = () => {
    setUserId(userInformation.userLoginId);
    setUserAuthority(
      projectAuthority === 'OWNER' ? 'EDITOR' : projectAuthority
    );
    setProjectId(projectId);
  };

  const handleEditClick = () => {
    router.push(`/setting/${projectId}`);
  };

  return (
    <Styled.ProjectInfoContainer>
      <Styled.ProjectThumbnailWrapper
        onClick={() => {
          handleEnterEditor();
          handleVersionChoice({ synced, projectAuthority });
        }}
      >
        <Styled.ProjectThumbnail src={projectThumbnailUrl} />
      </Styled.ProjectThumbnailWrapper>
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
                <Styled.SettingList
                  onClick={
                    projectAuthority === 'OWNER' ? deleteProject : exitProject
                  }
                >
                  {projectAuthority === 'OWNER' ? 'Delete' : 'Exit'}
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

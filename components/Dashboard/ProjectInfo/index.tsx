import { Project } from '@/types/project';
import { api } from '@api';
import { SvgIcon } from '@components/Common';
import projectAtom from '@recoil/project/atom';
import Link from 'next/link';
import { useState } from 'react';
import { useRecoilState } from 'recoil';
import { uuid } from 'uuidv4';
import * as Styled from './styled';

interface ProjectProps {
  project?: Project;
}

const ProjectInfo = ({ project }: ProjectProps) => {
  const [projectInfo, setProjectInfo] = useRecoilState(projectAtom);
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
  return (
    <Styled.ProjectInfoContainer>
      <Link
        href={`/editor/${projectId}/${mainPageId}`}
        onClick={() =>
          setProjectInfo({ authority: projectAuthority, name: uuid() })
        }
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
        </Styled.SettingWrapper>
      </Styled.ProjectContentWrapper>
    </Styled.ProjectInfoContainer>
  );
};

export default ProjectInfo;

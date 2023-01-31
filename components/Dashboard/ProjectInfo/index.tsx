import { Project } from '@/types/project';
import { api } from '@api';
import { SvgIcon } from '@components/Common';
import { useState } from 'react';
import * as Styled from './styled';

interface ProjectProps {
  project?: Project;
}

const ProjectInfo = ({ project }: ProjectProps) => {
  const { projectId, projectName, projectStatus, projectThumbnailUrl } =
    project;
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
      <Styled.ProjectThumbnailWrapeer>
        <Styled.ProjectThumbnail src={projectThumbnailUrl} />
      </Styled.ProjectThumbnailWrapeer>
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

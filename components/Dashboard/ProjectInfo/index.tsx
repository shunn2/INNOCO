import { Project } from '@/types/project';
import * as Styled from './styled';

interface ProjectProps {
  project?: Project;
}

const ProjectInfo = ({ project }: ProjectProps) => {
  const { projectName, projectStatus, projectThumbnailUrl } = project;
  return (
    <Styled.ProjectInfoContainer>
      <Styled.ProjectThumbnailWrapeer>
        <Styled.ProjectThumbnail src={projectThumbnailUrl} />
      </Styled.ProjectThumbnailWrapeer>
      <Styled.ProjectContentWrapper>
        <div>{projectName}</div>
        <Styled.ProjectStatus>{projectStatus}</Styled.ProjectStatus>
      </Styled.ProjectContentWrapper>
    </Styled.ProjectInfoContainer>
  );
};

export default ProjectInfo;

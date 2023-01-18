import { Project } from '@/types/project';
import * as Styled from './styled';

interface ProjectProps {
  project: Project;
}

const ProjectInfo = ({ project }: ProjectProps) => {
  const { projectName, projectStatus, projectThumbnailUrl } = project;
  return (
    <Styled.ProjectInfoContainer>
      <Styled.ProjectThumbnail
        src={projectThumbnailUrl}
        alt="프로젝트 썸네일"
        width="0"
        height="0"
        sizes="100vw"
      />
      <Styled.ProjectContentWrapper>
        <p>{projectName}</p>
        <Styled.ProjectStatus>{projectStatus}</Styled.ProjectStatus>
      </Styled.ProjectContentWrapper>
    </Styled.ProjectInfoContainer>
  );
};

export default ProjectInfo;

import * as Styled from './styled';

const ProjectInfo = () => {
  return (
    <Styled.ProjectInfoContainer>
      <Styled.ProjectThumbnail
        src={'/프로젝트 썸네일'}
        alt="프로젝트 썸네일"
        width="0"
        height="0"
        sizes="100vw"
      />
      <Styled.ProjectContentWrapper>
        <p>Title</p>
        <p>Content</p>
      </Styled.ProjectContentWrapper>
    </Styled.ProjectInfoContainer>
  );
};

export default ProjectInfo;

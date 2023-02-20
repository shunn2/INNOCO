import { Layout } from '@components/Common';
import ProjectEdit from '@components/ProjectSetting';
import styled from 'styled-components';

const ProjectSetting = () => {
  return (
    <Layout>
      <ProjectSettingContainer>
        <ProjectEdit />
      </ProjectSettingContainer>
    </Layout>
  );
};

const ProjectSettingContainer = styled.div`
  padding: 32px 80px;
`;

export default ProjectSetting;

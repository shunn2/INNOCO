import { SvgIcon, Header } from '@components/Common';
import styled from 'styled-components';
import Link from 'next/link';

const Dashboard = () => {
  const handleCreateProjectButton = () => {};
  return (
    <>
      <Header />
      <DashboardContainer>
        <Title>My Project</Title>
        <Link href="/editor">
          <CreateProjectButtonWrapper onClick={handleCreateProjectButton}>
            <SvgIcon type="project-create" size={32} />
            <p>Create New Project</p>
          </CreateProjectButtonWrapper>
        </Link>
        {/* TODO: 프로젝트 api 연동 */}
      </DashboardContainer>
    </>
  );
};

const DashboardContainer = styled.div`
  padding: 32px;
`;

const Title = styled.h1`
  font-size: 32px;
  margin-bottom: 16px;
`;

const CreateProjectButtonWrapper = styled.div`
  display: flex;
  align-items: center;

  & > :nth-child(2) {
    margin-left: 12px;
  }
`;

export default Dashboard;

import { SvgIcon, Layout } from '@components/Common';
import styled from 'styled-components';
import Link from 'next/link';
import { signOut, useSession } from 'next-auth/react';
import { api } from '@api';
import { dehydrate, QueryClient } from 'react-query';
import useProjects from '@hooks/useProjects';
import { ProjectInfo } from '@components/Dashboard';
import queryKeys from '@react-query/queryKeys';
import { Projects } from '@/types/project';
import { useEffect } from 'react';
import { createAxiosWithToken } from '@api/customAxios';

const Dashboard = () => {
  const handleCreateProjectButton = async () => {
    const { data } = await createAxiosWithToken().post('/projects', {
      projectName: 'testename111',
      projectThumbnailUrl: 'testeurl111',
    });
    console.log('create projects', data);
  };
  const projects: Projects = useProjects();

  return (
    <Layout>
      <DashboardContainer>
        <Title>My Project</Title>
        <Link href="/editor">
          <CreateProjectButtonWrapper onClick={handleCreateProjectButton}>
            <SvgIcon type="project-create" size={32} />
            <p>Create New Project</p>
          </CreateProjectButtonWrapper>
        </Link>
        {projects?.value.projects.map((project) => (
          <ProjectInfo project={project} key={project.projectId} />
        ))}
        <button
          onClick={() =>
            signOut({
              callbackUrl: '/auth/sign-in',
            })
          }
        >
          로그아웃
        </button>
      </DashboardContainer>
    </Layout>
  );
};

export const getServerSideProp = async (context) => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(queryKeys.projects, () =>
    api.fetchProjects()
  );
  const dehydratedState = dehydrate(queryClient);

  return {
    props: {
      dehydratedState: dehydratedState,
    },
  };
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

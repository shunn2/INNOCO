import { SvgIcon, Layout } from '@components/Common';
import styled from 'styled-components';
import { api } from '@api';
import { dehydrate, QueryClient } from 'react-query';
import useProjects from '@hooks/useProjects';
import { ProjectInfo } from '@components/Dashboard';
import queryKeys from '@react-query/queryKeys';
import { Projects } from '@/types/project';
import theme from '@styles/theme';
import { useEffect, useState } from 'react';
import CreateProject from '@components/Dashboard/CreateProject';
import { useRecoilValue } from 'recoil';
import { userInfoAtom } from '@recoil/user/atom';
import { UserInvitation } from '@/types/setting';
import CreateModal from '@components/Common/Modal';
import Invitations from '@components/ProjectSetting/Invitation';

const Dashboard = () => {
  const userInformation = useRecoilValue(userInfoAtom);
  const [projectList, setProjectList] = useState([]);
  const [invitationList, setInvitationList] = useState<UserInvitation[]>([]);
  const [createModalOpen, setCreateModalOpen] = useState<boolean>(false);
  const [inviteModalOpen, setInviteModalOpen] = useState<boolean>(true);
  const handleCreateModalOpen = () => {
    setCreateModalOpen(!createModalOpen);
  };

  const projects: Projects = useProjects();

  const getProjectList = async () => {
    const data = await api.fetchProjects();
    setProjectList(data.value.projects);
  };

  const getInvitationLink = async () => {
    const data = await api.getInvitationList(userInformation.userLoginId);
    setInvitationList(data.value || []);
  };
  useEffect(() => {
    if (!userInformation) return;
    if (userInformation.userLoginId.length) {
      getProjectList();
      getInvitationLink();
    }
  }, []);

  return (
    <Layout>
      <DashboardContainer>
        <Title>My Project</Title>
        <DashboardGrid>
          <ProjectBox>
            <CreateProjectButtonWrapper onClick={handleCreateModalOpen}>
              <SvgIcon type="project-create" size={36} />
              <span className="text-4xl">Create New Project</span>
            </CreateProjectButtonWrapper>
          </ProjectBox>
          {projectList.map((project) => (
            <ProjectInfo project={project} key={project.projectId} />
          ))}
        </DashboardGrid>
        {invitationList.length && (
          <CreateModal
            title="Invitation List"
            isOpen={inviteModalOpen}
            handleOpen={() => setInviteModalOpen(false)}
          >
            <Invitations
              invitationList={invitationList}
              handleOpen={() => setInviteModalOpen(false)}
            />
          </CreateModal>
        )}
        {createModalOpen && (
          <CreateProject
            isOpen={createModalOpen}
            handleIsOpen={handleCreateModalOpen}
          />
        )}
      </DashboardContainer>
    </Layout>
  );
};

export const getServerSideProps = async (context) => {
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

const DashboardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  grid-template-rows: repeat(auto-fill, minmax(320px, 1fr));
  grid-gap: 24px;
`;

const ProjectBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${theme.color.gray.middle};
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    color: ${theme.color.white.middle};
  }
`;

const Title = styled.h4`
  margin: 16px 0;
`;

const CreateProjectButtonWrapper = styled.div`
  display: flex;
  align-items: center;

  & > :nth-child(2) {
    margin-left: 12px;
  }
`;

export default Dashboard;

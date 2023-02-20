import editApi from '@api/editApi';
import CreateModal from '@components/Common/Modal';
import PagePreview from '@components/Common/PagePreview';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import * as Styled from './styled';

interface ArchivedProject {
  archivedProjectId: string;
  publishedDate: string;
  version: number;
}

const defaultArchived = [
  {
    archivedProjectId: '',
    publishedDate: '',
    version: 0,
  },
];

const VersionSetting = () => {
  const { data: session, status } = useSession();
  const projectId = useRouter().query.projectId;
  const [archivedList, setArchivedList] = useState<ArchivedProject[]>([]);
  const [openPreviewModal, setOpenPreviewModal] = useState<boolean>(false);
  const getArchivedProjects = async () => {
    const data = await editApi.getArchivedProject(projectId);
    console.log(data);

    setArchivedList(data.value);
  };
  const handlePreviewModal = async (archivedProjectId) => {
    const data = await editApi.getArchivedPages(archivedProjectId);
    setOpenPreviewModal(true);
  };

  useEffect(() => {
    getArchivedProjects();
  }, [projectId]);

  return (
    <Styled.ProjectVersionContainer>
      <Styled.VersionAlertMessage>
        프로젝트 버전은 최근 10개까지만 보관됩니다.
      </Styled.VersionAlertMessage>
      <Styled.ArchivedContainer>
        {archivedList.map((archived) => (
          <Styled.ArchivedWrapper key={archived.publishedDate}>
            <div>{archived.version}</div>
            <div>{archived.publishedDate}</div>
            <div onClick={() => handlePreviewModal(archived.archivedProjectId)}>
              미리보기
            </div>
            <div>CLICK</div>
          </Styled.ArchivedWrapper>
        ))}
      </Styled.ArchivedContainer>
      {openPreviewModal && (
        <CreateModal isOpen={openPreviewModal}>
          <Styled.ModalClose onClick={() => setOpenPreviewModal(false)}>
            x
          </Styled.ModalClose>
          <Styled.ModalContents>
            {/* <PagePreview id={session.expires} projectId={projectId} pageId={} /> */}
          </Styled.ModalContents>
        </CreateModal>
      )}
    </Styled.ProjectVersionContainer>
  );
};

export default VersionSetting;

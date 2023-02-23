import editApi from '@api/editApi';
import Alert from '@components/Common/Alert';
import CreateModal from '@components/Common/Modal';
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
  const projectId = useRouter().query.projectId;
  const [archivedList, setArchivedList] = useState<ArchivedProject[]>([]);
  const [openPreviewModal, setOpenPreviewModal] = useState<boolean>(false);
  const getArchivedProjects = async () => {
    const data = await editApi.getArchivedProject(projectId);
    setArchivedList(data.value);
  };
  const rollbackProject = async (archived: ArchivedProject) => {
    Alert({
      icon: 'warning',
      title: `프로젝트를 되돌리시겠습니까?`,
      text: `현재 프로젝트(ver.${archivedList[0].version + 1})이 ver.${
        archived.version
      }으로 되돌려집니다. 상위 버전(${archived.version} ~ ${
        archivedList[0].version
      })은 폐기됩니다.`,
      showCancelButton: true,
    }).then((res) => {
      if (res.isConfirmed) {
        const data = editApi
          .projectRollback(projectId, archived.archivedProjectId)
          .then(() => getArchivedProjects());
      }
    });
  };
  const handlePreviewModal = async (archivedProjectId) => {
    const data = await editApi.getArchivedPages(archivedProjectId);
    setOpenPreviewModal(true);
  };
  const getDateFormat = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();
    const hour = date.getHours() + 9;
    const minute = date.getMinutes();
    return `${year}년 ${month}월 ${day}일 ${hour}:${minute}`;
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
          <Styled.ArchivedWrapper key={archived.archivedProjectId}>
            <div>{archived.version}</div>
            <div>{getDateFormat(new Date(archived.publishedDate))}</div>
            {/* <div onClick={() => handlePreviewModal(archived.archivedProjectId)}>
              미리보기
            </div> */}
            <div onClick={() => rollbackProject(archived)}>Roll back</div>
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

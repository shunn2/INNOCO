import pageApi from '@api/pageApi';
import Alert from '@components/Common/Alert';
import StyleInput from '@components/Common/StyleInput';
import projectAtom from '@recoil/project/atom';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useRecoilState } from 'recoil';
import * as Styled from './styled';

interface EditPageProps {
  pageId: string;
  pageName: string;
  originMain: string;
  main: boolean;
  handleOpen: () => void;
}

const EditPage = (props: EditPageProps) => {
  const router = useRouter();
  const projectId = router.query.projectId;
  const { pageId, pageName, originMain, main, handleOpen } = props;
  const [projectInfo, setProjectInfo] = useRecoilState(projectAtom);
  const [editedPageName, setEditedPageName] = useState<string>(pageName);
  const [editedMain, setEditedMain] = useState<boolean>(main);
  const editPageInformation = async () => {
    let mainResponse = { code: 0 };
    let nameResponse;
    if (editedMain) {
      mainResponse = await pageApi.changePageMain(originMain, pageId);
      if (mainResponse.code === 3200) {
        Alert({ icon: 'error', title: '존재하지 않는 페이지입니다' });
      }
    }
    nameResponse = await pageApi.changePageName(
      projectId,
      pageId,
      editedPageName
    );
    if (nameResponse.code === 3202)
      Alert({ icon: 'error', title: '이미 존재하는 페이지 이름입니다' });
    if (!nameResponse.code && !mainResponse.code) {
      Alert({ icon: 'success', title: '페이지 정보를 변경하였습니다' });
      handleOpen();
    }
  };
  const deletePage = async () => {
    Alert({
      icon: 'warning',
      title: '삭제하시겠습니까?',
      showCancelButton: true,
    }).then((res) => {
      if (res.isConfirmed) {
        pageApi.deletePage(pageId);
        router.replace({
          pathname: '/editor/[projectId]/[pageId]',
          query: { projectId: projectId, pageId: originMain },
        });
        setProjectInfo({ ...projectInfo, pageId: originMain });
        handleOpen();
      }
    });
  };
  return (
    <Styled.EditPageContainer>
      <Styled.ButtonWrapper>
        <Styled.Title>Edit Page</Styled.Title>
        <Styled.CloseButton onClick={() => handleOpen()}>x</Styled.CloseButton>
      </Styled.ButtonWrapper>
      <Styled.InputWrapper>
        <Styled.InputLabel>Page Name</Styled.InputLabel>
        <StyleInput
          placeholder={editedPageName}
          value={editedPageName}
          onChange={(e) => setEditedPageName(e.target.value)}
          size={40}
          width={350}
          height={35}
        />
      </Styled.InputWrapper>
      <Styled.InputWrapper className="flex">
        <Styled.InputLabel style={{ marginBottom: 6 }}>Main</Styled.InputLabel>
        <input
          type="checkbox"
          checked={editedMain}
          onChange={(e) => setEditedMain(e.target.checked)}
          disabled={main}
        />
      </Styled.InputWrapper>
      <Styled.ButtonWrapper style={{ justifyContent: 'flex-end' }}>
        <Styled.DeleteButton onClick={() => deletePage()} disabled={main}>
          Delete
        </Styled.DeleteButton>
        <Styled.SubmitButton
          onClick={() => editPageInformation()}
          disabled={!editedPageName.trim().length}
        >
          EDIT
        </Styled.SubmitButton>
      </Styled.ButtonWrapper>
    </Styled.EditPageContainer>
  );
};

export default EditPage;

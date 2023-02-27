import { Templates } from '@/types/template';
import pageApi from '@api/pageApi';
import { Input } from '@components/Common';
import Alert from '@components/Common/Alert';
import useTemplates from '@hooks/useTemplates';
import projectAtom from '@recoil/project/atom';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useRecoilState } from 'recoil';
import * as Styled from './styled';

interface CreatePageProps {
  handleOpen: () => void;
}

const CreatePage = ({ handleOpen }: CreatePageProps) => {
  const router = useRouter();
  const projectId = router.query.projectId;
  const [projectInfo, setProjectInfo] = useRecoilState(projectAtom);
  const templates: Templates = useTemplates();
  const [pageName, setPageName] = useState<string>('');
  const [templateId, setTemplateId] = useState<string>(
    '63f4a2c717e25a640f5c1dc1'
  );

  const handlePageName = (e) => {
    setPageName(e.target.value);
  };
  const handleTemplateId = (id) => {
    setTemplateId(id);
  };
  const validateCreateButton = () => {
    //page name 중복 체크 추가 예정
    if (pageName.length) return false;
    return true;
  };
  const createPage = async () => {
    const data = await pageApi.createPage(projectId, pageName, templateId);
    if (data.code === 0) {
      router.replace({
        pathname: '/editor/[projectId]/[pageId]',
        query: { projectId: projectId, pageId: data.value },
      });
      setProjectInfo({ ...projectInfo, pageId: data.value });
      handleOpen();
    } else
      Alert({
        icon: 'warning',
        title: '페이지 이름이 중복됩니다.',
      });
  };
  return (
    <>
      <Styled.ButtonWrapper>
        <Styled.CloseButton onClick={handleOpen}>x</Styled.CloseButton>
      </Styled.ButtonWrapper>
      <Styled.Title>Make your Project</Styled.Title>
      <Styled.InputWrapper>
        <Styled.InputLabel>Page Name</Styled.InputLabel>
        <Input
          placeholder="page name"
          value={pageName}
          size={300}
          onChange={handlePageName}
        />
      </Styled.InputWrapper>
      <div>
        <Styled.InputLabel>Page Template</Styled.InputLabel>
        <Styled.TemplateContainer>
          {templates?.value.map((template, idx) => (
            <Styled.TemplateWrapper key={template.templateId}>
              <Styled.Thumbnail
                src={template.templateThumbnailUrl}
                width={250}
                height={250}
                onClick={() => handleTemplateId(template.templateId)}
                selected={templateId === template.templateId}
              />
              <Styled.ThumbnailTitle>
                {template.templateName}
              </Styled.ThumbnailTitle>
            </Styled.TemplateWrapper>
          ))}
        </Styled.TemplateContainer>
        <Styled.ButtonWrapper className="mt-12">
          <Styled.SubmitButton
            disabled={validateCreateButton()}
            onClick={() => createPage()}
          >
            Create
          </Styled.SubmitButton>
        </Styled.ButtonWrapper>
      </div>
    </>
  );
};

export default CreatePage;

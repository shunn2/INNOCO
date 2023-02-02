import { api } from '@api';
import { createAxiosWithToken } from '@api/customAxios';
import { Input } from '@components/Common';
import ImageUpload from '@components/Common/ImageUpload';
import CreateModal from '@components/Common/Modal';
import useTemplates from '@hooks/useTemplates';
import queryKeys from '@react-query/queryKeys';
import { Templates } from '@/types/template';
import { useEffect, useState } from 'react';
import { dehydrate, QueryClient, useQuery } from 'react-query';
import * as Styled from './styled';
import pageApi from '@api/pageApi';
interface CreateProjectProps {
  isOpen: boolean;
  handleIsOpen: () => void;
}

const CreateProject = ({ isOpen, handleIsOpen }: CreateProjectProps) => {
  const [projectName, setProjectName] = useState<string>('');
  const [projectThumbnail, setProjectThumbnail] = useState<string>();
  const [mainPageName, setMainPageName] = useState<string>('');
  const [templateId, setTemplateId] = useState<string>();

  const [createDisabled, setCreateDisabled] = useState<boolean>(true);

  const templates: Templates = useTemplates();

  const createProject = async () => {
    await api
      .createProject(projectName, projectThumbnail)
      .then((data) => pageApi.createPage(data.value, mainPageName, templateId));
    handleIsOpen();
    location.reload();
  };

  const handleTemplateId = (id) => {
    setTemplateId(id);
  };
  const handleProjectName = (e) => {
    setProjectName(e.target.value);
  };
  const handleMainPageName = (e) => {
    setMainPageName(e.target.value);
  };
  const handleSubmitDisabled = () => {
    if (!projectName.length || !mainPageName.length) {
      setCreateDisabled(true);
      return;
    }
    setCreateDisabled(false);
  };

  useEffect(() => {
    handleSubmitDisabled();
  }, [projectName, mainPageName]);

  return (
    <CreateModal isOpen={isOpen}>
      <Styled.ButtonWrapper>
        <Styled.CloseButton onClick={handleIsOpen}>x</Styled.CloseButton>
      </Styled.ButtonWrapper>
      <Styled.Title>Make your Project</Styled.Title>
      <Styled.InputWrapper>
        <Styled.InputLabel>Project Name</Styled.InputLabel>
        <Input
          placeholder="project name"
          size={300}
          onChange={handleProjectName}
        />
      </Styled.InputWrapper>
      <Styled.InputWrapper>
        <Styled.InputLabel>Project Thumbnail</Styled.InputLabel>
        <Styled.ThumbnailWrapper>
          <ImageUpload type="thumbnail" setURL={setProjectThumbnail} />
          <Styled.Thumbnail
            className="ml-9"
            src={projectThumbnail}
            width={300}
            height={240}
          />
        </Styled.ThumbnailWrapper>
      </Styled.InputWrapper>
      <Styled.InputWrapper>
        <Styled.InputLabel>Main Page Name</Styled.InputLabel>
        <Input
          placeholder="main page name"
          size={300}
          onChange={handleMainPageName}
        />
      </Styled.InputWrapper>
      <div>
        <Styled.InputLabel>Project Thumbnail</Styled.InputLabel>
        <Styled.TemplateContainer>
          <Styled.TemplateWrapper
            selected={templateId === ''}
            onClick={() => handleTemplateId('')}
          >
            <Styled.Thumbnail src={null} width={250} height={250} />
            <Styled.ThumbnailTitle>Blank</Styled.ThumbnailTitle>
          </Styled.TemplateWrapper>
          {templates?.value.map((template, idx) => (
            <Styled.TemplateWrapper
              key={template.templateId}
              selected={template.templateId === templateId}
            >
              <Styled.Thumbnail
                src={template.templateThumbnailUrl}
                width={250}
                height={250}
                onClick={() => handleTemplateId(template.templateId)}
              />
              <Styled.ThumbnailTitle>
                {template.templateName}
              </Styled.ThumbnailTitle>
            </Styled.TemplateWrapper>
          ))}
        </Styled.TemplateContainer>
      </div>
      <Styled.ButtonWrapper>
        <Styled.SubmitButton
          onClick={() => createProject()}
          disabled={createDisabled}
        >
          Create
        </Styled.SubmitButton>
      </Styled.ButtonWrapper>
    </CreateModal>
  );
};

export const getServerSideProp = async (context) => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(queryKeys.templates, () =>
    api.fetchTemplates()
  );
  const dehydratedState = dehydrate(queryClient);

  return {
    props: {
      dehydratedState: dehydratedState,
    },
  };
};

export default CreateProject;

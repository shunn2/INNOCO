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
  const [projectThumbnail, setProjectThumbnail] = useState<string>('/logo.png');
  const [mainPageName, setMainPageName] = useState<string>('');
  const [templateId, setTemplateId] = useState<string>();
  const [createDisabled, setCreateDisabled] = useState<boolean>(true);

  const [contentsOrder, setContentsOrder] = useState(0);

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
    if (!projectName.trim().length || !mainPageName.trim().length) {
      setCreateDisabled(true);
      return;
    }
    setCreateDisabled(false);
  };
  const handleContentsOrder = () => {
    if (!contentsOrder) setContentsOrder(1);
    else setContentsOrder(0);
  };

  useEffect(() => {
    handleSubmitDisabled();
  }, [projectName, mainPageName]);

  return (
    <CreateModal isOpen={isOpen}>
      <Styled.ProjectModalContainer>
        <Styled.ButtonWrapper>
          <p />
          <Styled.CloseButton onClick={handleIsOpen}>x</Styled.CloseButton>
        </Styled.ButtonWrapper>
        <Styled.Title>Make your Project</Styled.Title>
        {contentsOrder === 0 && (
          <>
            <Styled.InputWrapper>
              <Styled.InputLabel>Project Name</Styled.InputLabel>
              <Input
                placeholder="Project Name"
                value={projectName}
                size={300}
                onChange={handleProjectName}
              />
            </Styled.InputWrapper>
            <Styled.InputWrapper>
              <Styled.InputLabel>Project Thumbnail</Styled.InputLabel>
              <Styled.ThumbnailWrapper>
                <ImageUpload type="thumbnail" setURL={setProjectThumbnail} />
                <Styled.Thumbnail
                  className="ml-40"
                  src={projectThumbnail}
                  width={350}
                  height={240}
                  selected={false}
                />
              </Styled.ThumbnailWrapper>
            </Styled.InputWrapper>
          </>
        )}
        {contentsOrder === 1 && (
          <>
            <Styled.InputWrapper>
              <Styled.InputLabel>Main Page Name</Styled.InputLabel>
              <Input
                placeholder="main page name"
                value={mainPageName}
                size={300}
                onChange={handleMainPageName}
              />
            </Styled.InputWrapper>
            <div>
              <Styled.InputLabel>Page Template</Styled.InputLabel>
              <Styled.TemplateContainer>
                <Styled.TemplateWrapper
                  selected={templateId === ''}
                  onClick={() => handleTemplateId('')}
                ></Styled.TemplateWrapper>
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
            </div>
          </>
        )}
        <Styled.ButtonWrapper className="mt-12">
          {contentsOrder === 0 ? (
            <button />
          ) : (
            <Styled.SubmitButton
              disabled={false}
              onClick={() => handleContentsOrder()}
            >
              prev
            </Styled.SubmitButton>
          )}
          {contentsOrder === 1 ? (
            <Styled.SubmitButton
              onClick={() => createProject()}
              disabled={createDisabled}
            >
              Create
            </Styled.SubmitButton>
          ) : (
            <Styled.SubmitButton
              disabled={false}
              onClick={() => handleContentsOrder()}
            >
              next
            </Styled.SubmitButton>
          )}
        </Styled.ButtonWrapper>
      </Styled.ProjectModalContainer>
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

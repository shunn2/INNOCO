import { createAxiosWithToken } from '@api/customAxios';
import { Input } from '@components/Common';
import ImageUpload from '@components/Common/ImageUpload';
import CreateModal from '@components/Common/Modal';
import { useState } from 'react';
import * as Styled from './styled';
interface CreateProjectProps {
  isOpen: boolean;
  handleIsOpen: () => void;
}

const CreateProject = ({ isOpen, handleIsOpen }: CreateProjectProps) => {
  const [projectName, setProjectName] = useState<string>();
  const [projectThumbnail, setProjectThumbnail] = useState<string>();

  const createProject = async () => {
    const { data } = await createAxiosWithToken().post('/projects', {
      projectName: projectName,
      projectThumbnailUrl: projectThumbnail,
    });
    handleIsOpen();
    location.reload();
  };

  const handleProjectName = (e) => {
    setProjectName(e.target.value);
  };

  return (
    <CreateModal isOpen={isOpen}>
      <Styled.ButtonWrapper>
        <Styled.CloseButton onClick={handleIsOpen}>x</Styled.CloseButton>
      </Styled.ButtonWrapper>
      <Styled.Title>Make your Project</Styled.Title>
      <Styled.InputWrapper>
        <Styled.InputLabel>Project Name</Styled.InputLabel>
        <Input
          placeholder="type project name"
          size={300}
          onChange={handleProjectName}
        />
      </Styled.InputWrapper>
      <Styled.InputWrapper>
        <Styled.InputLabel>Project Thumbnail</Styled.InputLabel>
        <Styled.ThumbnailWrapper>
          <ImageUpload type="thumbnail" setURL={setProjectThumbnail} />
          <Styled.Thumbnail src={projectThumbnail} />
        </Styled.ThumbnailWrapper>
      </Styled.InputWrapper>
      <Styled.ButtonWrapper>
        <Styled.SubmitButton onClick={() => createProject()}>
          Create
        </Styled.SubmitButton>
      </Styled.ButtonWrapper>
    </CreateModal>
  );
};

export default CreateProject;

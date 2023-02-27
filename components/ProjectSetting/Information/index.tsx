import { api } from '@api';
import editApi from '@api/editApi';
import Alert from '@components/Common/Alert';
import ImageUpload from '@components/Common/ImageUpload';
import StyleInput from '@components/Common/StyleInput';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import * as Styled from './styled';

interface ProjectInfo {
  projectThumbnailUrl: string;
  projectName: string;
  projectStatus: string;
}

const statusOption = [
  { title: '공개', value: 'PUBLIC' },
  { title: '비공개', value: 'PRIVATE' },
  { title: '진행중', value: 'PROGRESS' },
];

const InformationSetting = () => {
  const projectId = useRouter().query.projectId;
  const [projectInformation, setProjectInformation] = useState<ProjectInfo>({
    projectThumbnailUrl: '',
    projectName: '',
    projectStatus: '',
  });
  const handleProjectInformation = (type, value) => {
    setProjectInformation({ ...projectInformation, [type]: value });
  };
  const getProjectInfo = async () => {
    const data = await api.fetchSingleProject(projectId);
    setProjectInformation(data.value);
  };
  const editProjectInfo = async () => {
    await editApi.editProjectInformation(projectId, projectInformation);
    Alert({ icon: 'success', title: '수정이 완료되었습니다.' });
  };
  useEffect(() => {
    if (projectId) getProjectInfo();
  }, [projectId]);
  return (
    <Styled.InformationContainer>
      <Styled.ThumbnailContainer>
        <Styled.InputLabel>Project Thumbnail</Styled.InputLabel>
        <Styled.ThumbnailWrapper>
          <Styled.Thumbnail
            src={projectInformation.projectThumbnailUrl}
            width={600}
            height={480}
          />
          <ImageUpload
            type="thumbnail"
            setURL={(url) =>
              handleProjectInformation('projectThumbnailUrl', url)
            }
          />
        </Styled.ThumbnailWrapper>
      </Styled.ThumbnailContainer>
      <Styled.ProjectInfoContainer>
        <div>
          <Styled.InputLabel>Project Name</Styled.InputLabel>
          <StyleInput
            placeholder={projectInformation.projectName}
            value={projectInformation.projectName}
            size={80}
            height={50}
            onChange={(e) =>
              handleProjectInformation('projectName', e.target.value)
            }
          />
        </div>
        <div>
          <Styled.InputLabel className="mt-32">
            Project Status
          </Styled.InputLabel>
          <Styled.StatusSelect
            defaultValue={projectInformation.projectStatus}
            disabled={projectInformation.projectStatus === 'PROGRESS'}
            onChange={(e) =>
              handleProjectInformation('projectStatus', e.target.value)
            }
          >
            {statusOption.map((option) => (
              <Styled.StatusOption
                key={option.value}
                value={option.value}
                selected={projectInformation.projectStatus === option.value}
              >
                {option.title}
              </Styled.StatusOption>
            ))}
          </Styled.StatusSelect>
        </div>
        <Styled.ButtonWrapper>
          <Styled.ChangeButton onClick={() => editProjectInfo()}>
            수정하기
          </Styled.ChangeButton>
        </Styled.ButtonWrapper>
      </Styled.ProjectInfoContainer>
    </Styled.InformationContainer>
  );
};

export default InformationSetting;

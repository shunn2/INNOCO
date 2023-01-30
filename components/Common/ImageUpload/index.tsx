import { api } from '@api';
import useImage from '@hooks/useImage';
import { ChangeEvent, PropsWithChildren } from 'react';
import * as Styled from './styled';

interface ImageUploadInterface {
  onClick: () => void;
}

const ImageUpload = (props: PropsWithChildren<ImageUploadInterface>) => {
  const { children, ...rest } = props;
  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const image = e.target.files[0];
    const formData = new FormData();
    formData.append('multipartFile', image);
    api.postImage(image);
  };
  return (
    <Styled.ImageUploadWrapper {...rest}>
      <input
        type={'file'}
        accept={'image/*'}
        onChange={(e) => handleImageUpload(e)}
      />
    </Styled.ImageUploadWrapper>
  );
};

export default ImageUpload;

import { api } from '@api';
import { Image } from '@/types/image';
import { ChangeEvent, PropsWithChildren } from 'react';
import * as Styled from './styled';
import { useRecoilState, useRecoilValue } from 'recoil';
import { elementInfoAtom } from '@recoil/selectedElement/atom';
import { withMainData } from '@recoil/editor';
import imageChange from '@utils/style/imageChange';

interface ImageUploadInterface {
  type?: string;
  setURL?: (url) => void;
}

const ImageUpload = (props: PropsWithChildren<ImageUploadInterface>) => {
  const { children, ...rest } = props;

  const element = useRecoilValue(elementInfoAtom);
  const [mainData, setMainData] = useRecoilState(withMainData);

  const handleImageUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const image = e.target.files[0];
    const data: Image = await api.postImage(image);
    if (props.type === 'thumbnail') return props.setURL(data.value);
    imageChange({ element, url: data.value, setMainData });
  };
  return (
    <Styled.ImageUploadWrapper {...rest}>
      <Styled.ImageUploadLabel htmlFor="image-upload">
        Choose File
      </Styled.ImageUploadLabel>
      <Styled.ImageUploadInput
        type={'file'}
        accept={'image/*'}
        onChange={(e) => handleImageUpload(e)}
        id="image-upload"
      />
    </Styled.ImageUploadWrapper>
  );
};

export default ImageUpload;

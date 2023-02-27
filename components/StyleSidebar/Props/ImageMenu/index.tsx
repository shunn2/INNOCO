import * as Styled from '../styled';
import ImageUpload from '@components/Common/ImageUpload';
import { useRecoilValue } from 'recoil';
import { elementInfoAtom } from '@recoil/selectedElement/atom';
import { useEffect, useState } from 'react';

const ImageMenu = () => {
  const element = useRecoilValue(elementInfoAtom);
  const [existImage, setExistImage] = useState<string>('');
  useEffect(() => {
    if (element.el.type !== 'section') {
      setExistImage(element.el.props.src || '');
    }
  }, [element]);
  return (
    <Styled.PropsBox>
      <Styled.PropsContainer>
        <Styled.Title>Src</Styled.Title>
      </Styled.PropsContainer>
      <Styled.PropsContainer>
        <Styled.ImageContainer imageUrl={existImage} />
        <Styled.ImageInput placeholder={existImage} disabled={true} />
      </Styled.PropsContainer>
      <Styled.PropsContainer>
        <ImageUpload />
      </Styled.PropsContainer>
    </Styled.PropsBox>
  );
};

export default ImageMenu;

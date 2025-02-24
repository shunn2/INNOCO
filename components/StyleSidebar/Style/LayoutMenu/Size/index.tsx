import { useRecoilState, useRecoilValue } from 'recoil';
import { withMainData } from '@recoil/editor';
import { elementInfoAtom } from '@recoil/selectedElement/atom';
import { useEffect, useState } from 'react';
import * as Styled from '../../styled';
import styleChange from '@utils/style/styleChange';
import getCurrentStyle from '@utils/style/getCurrentStyle';
import StyleInput from '@components/Common/StyleInput';
import MinSizeMenu from './MinSize';
import MaxSizeMenu from './MaxSize';

const SizeMenu = () => {
  const [size, setSize] = useState({ width: '', height: '' });

  const element = useRecoilValue(elementInfoAtom);
  const [mainData, setMainData] = useRecoilState(withMainData);

  const handleSizeChange = ({ e, type }: SizeChangeProps) => {
    styleChange({ element, type, value: e.target.value, setMainData });
  };

  useEffect(() => {
    setSize({
      width: getCurrentStyle({ element, type: 'width', mainData }) || 'none',
      height: getCurrentStyle({ element, type: 'height', mainData }) || 'none',
    });
  }, [element, mainData]);

  return (
    <>
      <Styled.StyleBox className="flex">
        <Styled.InputContainer>
          <Styled.Title>Width</Styled.Title>
          <StyleInput
            placeholder={size.width}
            size={50}
            onChange={(e) => handleSizeChange({ e, type: 'width' })}
          />
        </Styled.InputContainer>
        <Styled.InputContainer>
          <Styled.Title>Height</Styled.Title>
          <StyleInput
            placeholder={size.height}
            size={50}
            onChange={(e) => handleSizeChange({ e, type: 'height' })}
          />
        </Styled.InputContainer>
      </Styled.StyleBox>
      <MinSizeMenu />
      <MaxSizeMenu />
    </>
  );
};

interface SizeChangeProps {
  e: React.ChangeEvent<HTMLInputElement>;
  type: string;
}

export default SizeMenu;

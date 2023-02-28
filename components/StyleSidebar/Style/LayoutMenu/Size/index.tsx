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

  const handleSizeChange = ({ value, type }: SizeChangeProps) => {
    styleChange({ element, type, value, setMainData });
    setSize({ ...size, [type]: value });
  };

  useEffect(() => {
    setSize({
      width: getCurrentStyle({ element, type: 'width', mainData }) || 'none',
      height: getCurrentStyle({ element, type: 'height', mainData }) || 'none',
    });
  }, [element]);

  return (
    <>
      <Styled.StyleBox className="flex">
        <Styled.InputContainer>
          <Styled.Title>Width</Styled.Title>
          <StyleInput
            placeholder={size.width}
            value={size.width}
            size={50}
            onChange={(e) =>
              handleSizeChange({ value: e.target.value, type: 'width' })
            }
          />
        </Styled.InputContainer>
        <Styled.InputContainer>
          <Styled.Title>Height</Styled.Title>
          <StyleInput
            placeholder={size.height}
            value={size.height}
            size={50}
            onChange={(e) =>
              handleSizeChange({ value: e.target.value, type: 'height' })
            }
          />
        </Styled.InputContainer>
      </Styled.StyleBox>
      <MinSizeMenu />
      <MaxSizeMenu />
    </>
  );
};

interface SizeChangeProps {
  value: string;
  type: string;
}

export default SizeMenu;

import { useRecoilState, useRecoilValue } from 'recoil';
import { withMainData } from '@recoil/editor';
import { elementInfoAtom } from '@recoil/styleSideBar/atom';
import { useEffect, useState } from 'react';
import * as Styled from '../../styled';
import styleChange from '@utils/style/styleChange';
import getCurrentStyle from '@utils/style/getCurrentStyle';
import StyleInput from '@components/Common/StyleInput';

const SizeMenu = () => {
  const [size, setSize] = useState({ width: '', height: '' });

  const element = useRecoilValue(elementInfoAtom);
  const [mainData, setMainData] = useRecoilState(withMainData);

  const handleSizeChange = (e, type) => {
    styleChange({ element, type, value: e.target.value, setMainData });
  };

  useEffect(() => {
    setSize({
      width: getCurrentStyle({ element, type: 'width', mainData }) || 'none',
      height: getCurrentStyle({ element, type: 'height', mainData }) || 'none',
    });
  }, [element, mainData]);

  return (
    <Styled.StyleContainer className="flex">
      <Styled.InputContainer>
        <Styled.InputTitle>Width</Styled.InputTitle>
        <StyleInput
          placeholder={size.width}
          size={50}
          onChange={(e) => handleSizeChange(e, 'width')}
        />
      </Styled.InputContainer>
      <Styled.InputContainer>
        <Styled.InputTitle>Height</Styled.InputTitle>
        <StyleInput
          placeholder={size.height}
          size={50}
          onChange={(e) => handleSizeChange(e, 'height')}
        />
      </Styled.InputContainer>
    </Styled.StyleContainer>
  );
};

export default SizeMenu;

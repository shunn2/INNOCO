import { useRecoilState, useRecoilValue } from 'recoil';
import { withMainData } from '@recoil/editor';
import { elementInfoAtom } from '@recoil/selectedElement/atom';
import { useEffect, useState } from 'react';
import * as Styled from '../../../styled';
import styleChange from '@utils/style/styleChange';
import getCurrentStyle from '@utils/style/getCurrentStyle';
import StyleInput from '@components/Common/StyleInput';

const MinSizeMenu = () => {
  const [minSize, setMinSize] = useState({ minWidth: '', minHeight: '' });

  const element = useRecoilValue(elementInfoAtom);
  const [mainData, setMainData] = useRecoilState(withMainData);

  const handleSizeChange = ({ e, type }: SizeChangeProps) => {
    styleChange({ element, type, value: e.target.value, setMainData });
  };

  useEffect(() => {
    setMinSize({
      minWidth:
        getCurrentStyle({ element, type: 'minWidth', mainData }) || 'none',
      minHeight:
        getCurrentStyle({ element, type: 'minHeight', mainData }) || 'none',
    });
  }, [element, mainData]);

  return (
    <Styled.StyleBox className="flex">
      <Styled.InputContainer>
        <Styled.Title>Min-Width</Styled.Title>
        <StyleInput
          placeholder={minSize.minWidth}
          size={50}
          onChange={(e) => handleSizeChange({ e, type: 'minWidth' })}
        />
      </Styled.InputContainer>
      <Styled.InputContainer>
        <Styled.Title>Min-Height</Styled.Title>
        <StyleInput
          placeholder={minSize.minHeight}
          size={50}
          onChange={(e) => handleSizeChange({ e, type: 'minHeight' })}
        />
      </Styled.InputContainer>
    </Styled.StyleBox>
  );
};

interface SizeChangeProps {
  e: React.ChangeEvent<HTMLInputElement>;
  type: string;
}

export default MinSizeMenu;

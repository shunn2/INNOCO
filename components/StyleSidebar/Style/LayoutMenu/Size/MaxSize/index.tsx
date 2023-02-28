import { useRecoilState, useRecoilValue } from 'recoil';
import { withMainData } from '@recoil/editor';
import { elementInfoAtom } from '@recoil/selectedElement/atom';
import { useEffect, useState } from 'react';
import * as Styled from '../../../styled';
import styleChange from '@utils/style/styleChange';
import getCurrentStyle from '@utils/style/getCurrentStyle';
import StyleInput from '@components/Common/StyleInput';

const MaxSizeMenu = () => {
  const [maxSize, setMaxSize] = useState({ maxWidth: '', maxHeight: '' });

  const element = useRecoilValue(elementInfoAtom);
  const [mainData, setMainData] = useRecoilState(withMainData);

  const handleSizeChange = ({ value, type }: SizeChangeProps) => {
    styleChange({ element, type, value, setMainData });
    setMaxSize({ ...maxSize, [type]: value });
  };

  useEffect(() => {
    setMaxSize({
      maxWidth:
        getCurrentStyle({ element, type: 'maxWidth', mainData }) || 'none',
      maxHeight:
        getCurrentStyle({ element, type: 'maxHeight', mainData }) || 'none',
    });
  }, [element]);

  return (
    <Styled.StyleBox className="flex">
      <Styled.InputContainer>
        <Styled.Title>Max-Width</Styled.Title>
        <StyleInput
          placeholder={maxSize.maxWidth}
          value={maxSize.maxWidth}
          size={50}
          onChange={(e) =>
            handleSizeChange({ value: e.target.value, type: 'maxWidth' })
          }
        />
      </Styled.InputContainer>
      <Styled.InputContainer>
        <Styled.Title>Max-Height</Styled.Title>
        <StyleInput
          placeholder={maxSize.maxHeight}
          value={maxSize.maxHeight}
          size={50}
          onChange={(e) =>
            handleSizeChange({ value: e.target.value, type: 'maxHeight' })
          }
        />
      </Styled.InputContainer>
    </Styled.StyleBox>
  );
};

interface SizeChangeProps {
  value: string;
  type: string;
}

export default MaxSizeMenu;

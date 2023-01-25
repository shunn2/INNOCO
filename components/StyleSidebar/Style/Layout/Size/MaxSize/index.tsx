import { useRecoilState, useRecoilValue } from 'recoil';
import { withMainData } from '@recoil/editor';
import { elementInfoAtom } from '@recoil/styleSideBar/atom';
import { useEffect, useState } from 'react';
import * as Styled from '../../../styled';
import styleChange from '@utils/style/styleChange';
import getCurrentStyle from '@utils/style/getCurrentStyle';
import StyleInput from '@components/Common/StyleInput';

const MaxSizeMenu = () => {
  const [maxSize, setMaxSize] = useState({ maxWidth: '', maxHeight: '' });

  const element = useRecoilValue(elementInfoAtom);
  const [mainData, setMainData] = useRecoilState(withMainData);

  const handleSizeChange = ({ e, type }: SizeChangeProps) => {
    styleChange({ element, type, value: e.target.value, setMainData });
  };

  useEffect(() => {
    setMaxSize({
      maxWidth:
        getCurrentStyle({ element, type: 'maxWidth', mainData }) || 'none',
      maxHeight:
        getCurrentStyle({ element, type: 'maxHeight', mainData }) || 'none',
    });
  }, [element, mainData]);

  return (
    <Styled.StyleContainer className="flex">
      <Styled.InputContainer>
        <Styled.Title>Max-Width</Styled.Title>
        <StyleInput
          placeholder={maxSize.maxWidth}
          size={50}
          onChange={(e) => handleSizeChange({ e, type: 'maxWidth' })}
        />
      </Styled.InputContainer>
      <Styled.InputContainer>
        <Styled.Title>Max-Height</Styled.Title>
        <StyleInput
          placeholder={maxSize.maxHeight}
          size={50}
          onChange={(e) => handleSizeChange({ e, type: 'maxHeight' })}
        />
      </Styled.InputContainer>
    </Styled.StyleContainer>
  );
};

interface SizeChangeProps {
  e: React.ChangeEvent<HTMLInputElement>;
  type: string;
}

export default MaxSizeMenu;

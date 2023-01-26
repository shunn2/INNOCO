import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { elementInfoAtom } from '@recoil/styleSideBar/atom';
import { withMainData } from '@recoil/editor';
import styleChange from '@utils/style/styleChange';
import getCurrentStyle from '@utils/style/getCurrentStyle';
import { SvgIcon } from '@components/Common';
import * as Styled from '../../styled';
import StyleInput from '@components/Common/StyleInput';
import FlexMenu from './Flex';

const displayList = ['block', 'flex', 'grid', 'inline-block', 'inline', 'none'];

const DisplayMenu = () => {
  const [display, setDisplay] = useState<string>();

  const element = useRecoilValue(elementInfoAtom);
  const [mainData, setMainData] = useRecoilState(withMainData);

  const handleDisplayChange = (value) => {
    setDisplay(value);
    styleChange({ element, type: 'display', value, setMainData });
  };

  useEffect(() => {
    setDisplay(getCurrentStyle({ element, type: 'display', mainData }) || '');
  }, [element, mainData]);

  return (
    <Styled.StyleBox>
      <Styled.StyleContainer>
        <Styled.Title>Display</Styled.Title>
      </Styled.StyleContainer>
      <Styled.StyleContainer className="my-4">
        {displayList.map((v) => (
          <Styled.SvgWrapper
            key={v}
            selected={v === display}
            onClick={() => handleDisplayChange(v)}
          >
            <SvgIcon type={`${v}-icon`} />
          </Styled.SvgWrapper>
        ))}
      </Styled.StyleContainer>
      <Styled.StyleContainer className="my-4">
        <StyleInput
          placeholder={display}
          size={100}
          onChange={(e) => handleDisplayChange(e.target.value)}
        />
      </Styled.StyleContainer>
      {display === 'flex' && <FlexMenu />}
    </Styled.StyleBox>
  );
};

export default DisplayMenu;

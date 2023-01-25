import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { elementInfoAtom } from '@recoil/styleSideBar/atom';
import { withMainData } from '@recoil/editor';
import styleChange from '@utils/style/styleChange';
import getCurrentStyle from '@utils/style/getCurrentStyle';
import { SvgIcon } from '@components/Common';
import * as Styled from '../../styled';

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
    <Styled.StyleContainer>
      {displayList.map((v, idx) => (
        <Styled.SvgContainer
          key={v}
          selected={v === display}
          onClick={() => handleDisplayChange(v)}
        >
          <SvgIcon type={`${v}-icon`} />
        </Styled.SvgContainer>
      ))}
    </Styled.StyleContainer>
  );
};

export default DisplayMenu;

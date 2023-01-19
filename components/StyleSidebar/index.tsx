import React, { useState } from 'react';
import * as Styled from './styled';
import { useRecoilValue } from 'recoil';
import { elementInfoAtom } from '@recoil/styleSideBar/atom';
import { PropsTab, StyleTab } from './TabMenu';

const StyleSidebar = () => {
  const clickedComponent = useRecoilValue(elementInfoAtom);
  const [tab, setTab] = useState(1);
  const handleTab = (value: number) => {
    setTab(value);
  };
  return (
    <Styled.StyleSidebar>
      {clickedComponent.id ? (
        <>
          <Styled.TabWrapper>
            <Styled.Tab selected={tab === 1} onClick={() => handleTab(1)}>
              Styles
            </Styled.Tab>
            <Styled.Tab selected={tab === 2} onClick={() => handleTab(2)}>
              Props
            </Styled.Tab>
          </Styled.TabWrapper>
          {tab === 1 && <StyleTab />}
          {tab === 2 && <PropsTab />}
        </>
      ) : (
        <div
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            fontSize: '24px',
          }}
        >
          Click Component!
        </div>
      )}
    </Styled.StyleSidebar>
  );
};

export default StyleSidebar;

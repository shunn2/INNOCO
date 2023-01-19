import React from 'react';
import * as Styled from './styled';
import ColorMenu from './ColorMenu';
import ToggleMenu from './ToggleMenu';
import BackgroundColorMenu from './BackgroundMenu';
import { useRecoilValue } from 'recoil';
import { elementInfoAtom } from '@recoil/styleSideBar/atom';
import ComponentInfo from './ComponentInfo';

const StyleSidebar = () => {
  const clickedComponent = useRecoilValue(elementInfoAtom);
  return (
    <Styled.StyleSidebar>
      {clickedComponent.id ? (
        <>
          <ComponentInfo />
          <ToggleMenu title="Color">
            <ColorMenu />
          </ToggleMenu>
          <ToggleMenu title="Background">
            <BackgroundColorMenu />
          </ToggleMenu>
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

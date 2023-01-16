import React from 'react';
import * as Styled from './styled';
import ColorMenu from './ColorMenu';
import ToggleMenu from './ToggleMenu';
import BackgroundColorMenu from './BackgroundMenu';

const StyleSidebar = () => {
  return (
    <Styled.StyledSidebar>
      <ToggleMenu title="Color">
        <ColorMenu />
      </ToggleMenu>
      <ToggleMenu title="Background">
        <BackgroundColorMenu />
      </ToggleMenu>
    </Styled.StyledSidebar>
  );
};

export default StyleSidebar;

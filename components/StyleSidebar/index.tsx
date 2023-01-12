import React from 'react';
import * as Styled from './styled';
import ColorMenu from './ColorMenu';
import ToggleMenu from './ToggleMenu';

const StyleSidebar = () => {
  return (
    <Styled.StyledSidebar>
      <ToggleMenu title="COLOR">
        <ColorMenu />
      </ToggleMenu>
    </Styled.StyledSidebar>
  );
};

export default StyleSidebar;

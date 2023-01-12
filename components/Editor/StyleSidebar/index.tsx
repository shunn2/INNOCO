import * as Styled from './styled';
import { ToggleMenu } from '@components/Editor';
import ColorMenu from './ColorMenu';

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

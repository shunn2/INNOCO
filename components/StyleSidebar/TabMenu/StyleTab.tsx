import ComponentInfo from '../ComponentInfo';
import { BackgroundColorMenu, ColorMenu } from '../Style';
import DisplayMenu from '../Style/Layout/Display';
import SizeMenu from '../Style/Layout/Size';
import ToggleMenu from '../ToggleMenu';
import * as Styled from './styled';

const StyleTab = () => {
  return (
    <Styled.TabContents>
      <ComponentInfo />
      <ToggleMenu title="Layout">
        <DisplayMenu />
        <SizeMenu />
      </ToggleMenu>
      <ToggleMenu title="Color">
        <ColorMenu />
      </ToggleMenu>
      <ToggleMenu title="Background">
        <BackgroundColorMenu />
      </ToggleMenu>
    </Styled.TabContents>
  );
};

export default StyleTab;

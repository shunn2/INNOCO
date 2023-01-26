import ComponentInfo from '../ComponentInfo';
import { BackgroundColorMenu, ColorMenu } from '../Style';
import IndentMenu from '../Style/IndentMenu';
import DisplayMenu from '../Style/LayoutMenu/Display';
import SizeMenu from '../Style/LayoutMenu/Size';
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
      <ToggleMenu title="Indents">
        <IndentMenu />
      </ToggleMenu>
    </Styled.TabContents>
  );
};

export default StyleTab;

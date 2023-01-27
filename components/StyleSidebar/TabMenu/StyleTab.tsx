import ComponentInfo from '../ComponentInfo';
import {
  BackgroundColorMenu,
  ColorMenu,
  DisplayMenu,
  IndentMenu,
  SizeMenu,
} from '../Style';
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

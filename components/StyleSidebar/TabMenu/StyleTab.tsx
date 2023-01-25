import ComponentInfo from '../ComponentInfo';
import { BackgroundColorMenu, ColorMenu } from '../Style';
import DisplayMenu from '../Style/Layout/Display';
import SizeMenu from '../Style/Layout/Size';
import ToggleMenu from '../ToggleMenu';

const StyleTab = () => {
  return (
    <>
      <ComponentInfo />
      <ToggleMenu title="Color">
        <ColorMenu />
      </ToggleMenu>
      <ToggleMenu title="Background">
        <BackgroundColorMenu />
      </ToggleMenu>
      <ToggleMenu title="Layout">
        <DisplayMenu />
        <SizeMenu />
      </ToggleMenu>
    </>
  );
};

export default StyleTab;

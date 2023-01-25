import ComponentInfo from '../ComponentInfo';
import { BackgroundColorMenu, ColorMenu } from '../Style';
import MinSizeMenu from '../Style/Layout/MinSize';
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
        <SizeMenu />
        <MinSizeMenu />
      </ToggleMenu>
    </>
  );
};

export default StyleTab;

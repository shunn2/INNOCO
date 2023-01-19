import ComponentInfo from '../ComponentInfo';
import { BackgroundColorMenu, ColorMenu } from '../Style';
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
    </>
  );
};

export default StyleTab;

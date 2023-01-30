import * as Styled from './styled';
import ComponentInfo from '../ComponentInfo';
import ToggleMenu from '../ToggleMenu';
import ImageMenu from '../Props/ImageMenu';

const PropsTab = () => {
  return (
    <Styled.TabContents>
      <ComponentInfo />
      <ToggleMenu title="Main">
        <ImageMenu />
      </ToggleMenu>
    </Styled.TabContents>
  );
};

export default PropsTab;

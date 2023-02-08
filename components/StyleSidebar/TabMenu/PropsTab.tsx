import * as Styled from './styled';
import ComponentInfo from '../ComponentInfo';
import ToggleMenu from '../ToggleMenu';
import ImageMenu from '../Props/ImageMenu';
import { useRecoilValue } from 'recoil';
import { elementInfoAtom } from '@recoil/selectedElement/atom';
import HrefMenu from '../Props/HrefMenu';

const PropsTab = () => {
  const currentSelectedElement = useRecoilValue(elementInfoAtom);
  return (
    <Styled.TabContents>
      <ComponentInfo />
      <ToggleMenu title="Main">
        {currentSelectedElement.el.type === 'Image' && <ImageMenu />}
        {currentSelectedElement.el.type === 'Link' && <HrefMenu />}
      </ToggleMenu>
    </Styled.TabContents>
  );
};

export default PropsTab;

import { SvgIcon } from '@components/Common';
import { elementInfoAtom } from '@recoil/selectedElement/atom';
import { useRecoilValue } from 'recoil';
import * as Styled from './styled';

const ComponentInfo = () => {
  const clickedComponent = useRecoilValue(elementInfoAtom);
  return (
    <Styled.ComponentInfoWrapper>
      <Styled.ComponentInfoContainer>
        <SvgIcon type={`${clickedComponent.el.type.toLowerCase()}-icon`} />
        <p>{clickedComponent.el.type}</p>
      </Styled.ComponentInfoContainer>
    </Styled.ComponentInfoWrapper>
  );
};

export default ComponentInfo;

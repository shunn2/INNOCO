import { ControlBox } from '@components/Common';
import { withMainData } from '@recoil/editor';
import { elementInfoAtom } from '@recoil/styleSideBar/atom';
import { deleteElement } from '@utils/control';
import { IframeEditorReturn } from '@utils/iframe/iframeEditorReturn';
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';

interface WidgetProps {
  top: number;
  left: number;
}

const ControlWidget = (props) => {
  const [main, setMain] = useRecoilState(withMainData);
  const [element, setElement] = useRecoilState(elementInfoAtom);
  const component = IframeEditorReturn().contentDocument.getElementById(
    element.id
  );
  return (
    <div
      className="absolute flex justify-between items-center"
      style={{
        width: `${component.offsetWidth}px`,
        marginBottom: `${component.offsetHeight + 25}px`,
      }}
    >
      <ControlBox>{element.el.type}</ControlBox>
      <ControlBox onClick={() => deleteElement(element, setMain)}>X</ControlBox>
    </div>
  );
};

export default ControlWidget;

import { ControlBox } from '@components/Common';
import { withMainData } from '@recoil/editor';
import { elementInfoAtom } from '@recoil/selectedElement/atom';
import { deleteElement, duplicateElement } from '@utils/control';
import { IframeEditorReturn } from '@utils/iframe/iframeEditorReturn';
import Image from 'next/image';
import { useRecoilState, useRecoilValue, useResetRecoilState } from 'recoil';

const ElementControlWidget = () => {
  const [main, setMain] = useRecoilState(withMainData);
  const element = useRecoilValue(elementInfoAtom);
  const resetElement = useResetRecoilState(elementInfoAtom);
  const component = IframeEditorReturn().contentDocument.getElementById(
    element.id
  );

  const handleDeleteElement = (e) => {
    deleteElement({ e, element, setMain });
    resetElement();
  };

  return (
    <div
      className="absolute flex justify-between items-center"
      style={{
        minWidth: `${component && component.clientWidth + 8}px`,
        marginTop: `-26px`,
      }}
    >
      <ControlBox>{element.el.type}</ControlBox>
      <ControlBox>
        <div
          onClick={(e) => duplicateElement({ e, element, main, setMain })}
          className="mx-1"
        >
          <Image src="/iframe/duplicate.png" alt="" width={24} height={24} />
        </div>
        <div onClick={(e) => handleDeleteElement(e)} className="mx-1">
          <Image src="/iframe/trash.png" alt="" width={26} height={26} />
        </div>
      </ControlBox>
    </div>
  );
};

export default ElementControlWidget;

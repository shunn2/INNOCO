import { ControlBox } from '@components/Common';
import { withMainData } from '@recoil/editor';
import { elementInfoAtom } from '@recoil/styleSideBar/atom';
import { deleteElement, duplicateElement } from '@utils/control';
import { IframeEditorReturn } from '@utils/iframe/iframeEditorReturn';
import { useRecoilState, useRecoilValue } from 'recoil';

const ElementControlWidget = () => {
  const [main, setMain] = useRecoilState(withMainData);
  const element = useRecoilValue(elementInfoAtom);
  const component = IframeEditorReturn().contentDocument.getElementById(
    element.id
  );

  return (
    <div
      className="absolute flex justify-between items-center"
      style={{
        minWidth: `${component.offsetWidth}px`,
        marginBottom: `${component.offsetHeight + 25}px`,
      }}
    >
      <ControlBox>{element.el.type}</ControlBox>
      <ControlBox>
        <div
          onClick={(e) => duplicateElement(e, element, main, setMain)}
          className="mx-1"
        >
          <img
            src="/iframe/duplicate.png"
            alt=""
            width={'24px'}
            height={'24px'}
          />
        </div>
        <div
          onClick={(e) => deleteElement(e, element, setMain)}
          className="mx-1"
        >
          <img src="/iframe/trash.png" alt="" width={'26px'} height={'26px'} />
        </div>
      </ControlBox>
    </div>
  );
};

export default ElementControlWidget;

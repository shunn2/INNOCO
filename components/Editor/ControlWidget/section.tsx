import { ControlBox } from '@components/Common';
import { withMainData, withSectionOrder } from '@recoil/editor';
import { elementInfoAtom } from '@recoil/styleSideBar/atom';
import { deleteSection, duplicateSection } from '@utils/control';
import { IframeEditorReturn } from '@utils/iframe/iframeEditorReturn';
import { useRecoilState, useRecoilValue } from 'recoil';

const SectionControlWidget = () => {
  const [main, setMain] = useRecoilState(withMainData);
  const [sectionOrder, setSectionOrder] = useRecoilState(withSectionOrder);
  const element = useRecoilValue(elementInfoAtom);
  const component = IframeEditorReturn().contentDocument.getElementById(
    element.id
  );
  console.log(element);

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
          onClick={(e) =>
            duplicateSection(e, element, main, setMain, setSectionOrder)
          }
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
          onClick={(e) => deleteSection(e, element, setMain, setSectionOrder)}
          className="mx-1"
        >
          <img src="/iframe/trash.png" alt="" width={'26px'} height={'26px'} />
        </div>
      </ControlBox>
    </div>
  );
};

export default SectionControlWidget;

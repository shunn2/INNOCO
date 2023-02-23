import { ControlBox } from '@components/Common';
import { withMainData, withSectionOrder } from '@recoil/editor';
import { elementInfoAtom } from '@recoil/selectedElement/atom';
import { deleteSection, duplicateSection } from '@utils/control';
import { IframeEditorReturn } from '@utils/iframe/iframeEditorReturn';
import Image from 'next/image';
import { useRecoilState, useRecoilValue, useResetRecoilState } from 'recoil';

const SectionControlWidget = () => {
  const [main, setMain] = useRecoilState(withMainData);
  const [sectionOrder, setSectionOrder] = useRecoilState(withSectionOrder);
  const element = useRecoilValue(elementInfoAtom);
  const resetElement = useResetRecoilState(elementInfoAtom);
  const component = IframeEditorReturn().contentDocument.getElementById(
    element.id
  );

  const handleDeleteSection = (e) => {
    deleteSection({ e, element, setMain, setSectionOrder });
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
          onClick={(e) =>
            duplicateSection({ e, element, main, setMain, setSectionOrder })
          }
          className="mx-1"
        >
          <Image src="/iframe/duplicate.png" alt="" width={24} height={24} />
        </div>
        <div onClick={(e) => handleDeleteSection(e)} className="mx-1">
          <Image src="/iframe/trash.png" alt="" width={26} height={26} />
        </div>
      </ControlBox>
    </div>
  );
};

export default SectionControlWidget;

import { withMainData } from '@recoil/editor';
import { elementInfoAtom } from '@recoil/selectedElement/atom';
import { dragStart } from '@utils/drag';
import { clickEffectStyle, dragEffectStyle } from '@utils/effect';
import { PropsWithChildren } from 'react';
import { useRecoilState } from 'recoil';

interface CreateSectionProps {
  sectionId: string;
  sectionIdx: number;
  draggingOver: any;
  insertLocation: string;
  handleDragOver: (e: React.DragEvent<HTMLDivElement>) => void;
  handleDrop: (e: DragEvent) => void;
  onClick: (e: any) => void;
  handleEditorChange: () => void;
}

const CreateSection = (props: PropsWithChildren<CreateSectionProps>) => {
  const {
    children,
    sectionId,
    sectionIdx,
    draggingOver,
    insertLocation,
    handleDragOver,
    handleDrop,
    onClick,
    handleEditorChange,
  } = props;
  const [main, setMain] = useRecoilState(withMainData);

  const [currentSelectedElement, setCurrentSelectedElement] =
    useRecoilState(elementInfoAtom);
  return (
    <div
      id={sectionId}
      key={sectionId}
      {...main[sectionId].sectionProps}
      className={`${dragEffectStyle({
        insertLocation,
        draggingOverId: draggingOver?.el.id,
        elementId: sectionId,
      })} ${clickEffectStyle({
        clickedId: currentSelectedElement.id,
        elementId: sectionId,
      })}`}
      onDragStart={(e) =>
        dragStart({
          e: e,
          element: main[sectionId],
          idx: sectionIdx,
          sectionId,
        })
      }
      onDragOver={(e) => handleDragOver(e)}
      onDrop={handleDrop}
      //   onDragEnd={() => handleEditorChange()}
      onClick={(e) => onClick(e)}
    >
      {children}
    </div>
  );
};

export default CreateSection;

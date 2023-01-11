import { DragDropProps } from './types';

const DragSection = (e, draggingOver, setSectionOrder) => {
  const { elIdx } = JSON.parse(e.dataTransfer.getData('dragging'));
  setSectionOrder((prev) => {
    const cur = [...prev];
    const draggingOverSectionIdx = cur.indexOf(draggingOver.sectionId);
    const dragged = cur.splice(elIdx, 1)[0];
    cur.splice(draggingOverSectionIdx, 0, dragged);
    return cur;
  });
};

export default DragSection;

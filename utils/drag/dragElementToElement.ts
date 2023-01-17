import { DragDropProps } from './types';

const DragElementToElement = (e, draggingOver, insertLocation, setMain) => {
  const { elIdx, sectionId } = JSON.parse(e.dataTransfer.getData('dragging'));
  setMain((prev) => {
    const cur = JSON.parse(JSON.stringify(prev));
    const dragged = cur[sectionId].children.splice(elIdx, 1)[0];
    if (insertLocation === 'l' || insertLocation === 't') {
      if (draggingOver.idx < elIdx || draggingOver.sectionId !== sectionId) {
        cur[draggingOver.sectionId].children.splice(
          draggingOver.idx === 0 ? 0 : draggingOver.idx,
          0,
          dragged
        );
      } else {
        cur[draggingOver.sectionId].children.splice(
          draggingOver.idx === 0 ? 0 : draggingOver.idx - 1,
          0,
          dragged
        );
      }
    }
    if (insertLocation === 'r' || insertLocation === 'b') {
      if (draggingOver.idx < elIdx || draggingOver.sectionId !== sectionId) {
        cur[draggingOver.sectionId].children.splice(
          draggingOver.idx + 1,
          0,
          dragged
        );
      } else {
        cur[draggingOver.sectionId].children.splice(
          draggingOver.idx,
          0,
          dragged
        );
      }
    }
    return cur;
  });
};

export default DragElementToElement;

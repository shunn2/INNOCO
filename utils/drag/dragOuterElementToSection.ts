import { DragDropProps } from './types';

const DragOuterElementToSection = (e, draggingOver, setMain) => {
  const { el } = JSON.parse(e.dataTransfer.getData('dragging'));
  setMain((prev) => {
    const cur = JSON.parse(JSON.stringify(prev));
    cur[draggingOver.sectionId].children.push(el);
    return cur;
  });
};

export default DragOuterElementToSection;

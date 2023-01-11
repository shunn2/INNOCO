import { DragDropProps } from './types';

const DragOuterSection = (e, draggingOver, setMain, setSectionOrder) => {
  const { el } = JSON.parse(e.dataTransfer.getData('dragging'));
  setSectionOrder((prev) => {
    const cur = [...prev];
    cur.splice(draggingOver.idx, 0, el.id);
    return cur;
  });
  setMain((prev) => {
    const cur = { ...prev };
    cur[el.id] = el;
    return cur;
  });
};

export default DragOuterSection;

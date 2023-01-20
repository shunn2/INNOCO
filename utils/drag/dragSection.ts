import React from 'react';

interface DragSectionProps {
  e: React.DragEvent;
  draggingOver: any;
  setSectionOrder: (prev) => void;
}

const DragSection = ({
  e,
  draggingOver,
  setSectionOrder,
}: DragSectionProps) => {
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

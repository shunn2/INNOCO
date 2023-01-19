import React from 'react';

interface DragElementToSectionProps {
  e: React.DragEvent;
  draggingOver: any;
  setMain: (prev) => void;
}

const DragElementToSection = ({
  e,
  draggingOver,
  setMain,
}: DragElementToSectionProps) => {
  const { elIdx, sectionId } = JSON.parse(e.dataTransfer.getData('dragging'));
  setMain((prev) => {
    const cur = JSON.parse(JSON.stringify(prev));
    const dragged = cur[sectionId].children.splice(elIdx, 1)[0];
    cur[draggingOver.sectionId].children.push(dragged);
    return cur;
  });
};

export default DragElementToSection;

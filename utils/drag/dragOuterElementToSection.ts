import React from 'react';

interface DragOuterElementToSectionProps {
  e: React.DragEvent;
  draggingOver: any;
  setMain: (prev) => void;
}

const DragOuterElementToSection = ({
  e,
  draggingOver,
  setMain,
}: DragOuterElementToSectionProps) => {
  const { el } = JSON.parse(e.dataTransfer.getData('dragging'));
  setMain((prev) => {
    const cur = JSON.parse(JSON.stringify(prev));
    cur[draggingOver.sectionId].children.push(el);
    return cur;
  });
};

export default DragOuterElementToSection;

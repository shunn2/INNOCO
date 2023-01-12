import React from 'react';
import { DragStartProps } from './types';

const dragStart = ({ e, element, idx, sectionId }: DragStartProps) => {
  e.dataTransfer.setData(
    'dragging',
    JSON.stringify({
      el: element,
      elIdx: idx,
      sectionId: sectionId,
    })
  );
  e.stopPropagation();
};

dragStart.defaultProps = {
  idx: '',
  sectionId: '',
};

export default dragStart;

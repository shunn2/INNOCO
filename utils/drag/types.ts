import React from 'react';

export interface DragStartProps {
  e: React.DragEvent<HTMLDivElement>;
  element: any;
  idx: string | number;
  sectionId: string;
}

export interface DragDropProps {
  e: React.DragEvent<HTMLDivElement>;
  draggingOver: any;
  insertLocation: string;
  setMain: () => void;
  setSectionOrder: () => void;
}

import React from 'react';

export interface duplicateElementProps {
  e: React.MouseEvent<HTMLDivElement>;
  element: any;
  main: any;
  setMain: (prev) => void;
}

export interface duplicateSectionProps {
  e: React.MouseEvent<HTMLDivElement>;
  element: any;
  main: any;
  setMain: (prev) => void;
  setSectionOrder: (prev) => void;
}

export interface deleteElementProps {
  e: React.MouseEvent<HTMLDivElement>;
  element: any;
  setMain: (prev) => void;
}

export interface deleteSectionProps {
  e: React.MouseEvent<HTMLDivElement>;
  element: any;
  setMain: (prev) => void;
  setSectionOrder: (prev) => void;
}

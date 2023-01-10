import React from 'react';

export type SvgIconType =
  | 'box-icon'
  | 'button-icon'
  | 'image-icon'
  | 'text-icon'
  | 'section-icon'
  | 'link-icon'
  | 'align-items-start'
  | 'align-items-center'
  | 'align-items-end'
  | 'justify-content-start'
  | 'justify-content-center'
  | 'justify-content-end'
  | 'plus'
  | 'down-icon'
  | 'project-create';

interface SvgIconProps {
  type: SvgIconType;
  size: number;
}

const SvgIcon = ({ type, size }: SvgIconProps) => {
  return (
    <svg width={size} height={size}>
      <use href={`#${type}`} />
    </svg>
  );
};

SvgIcon.defaultProps = {
  size: 24,
};

export default SvgIcon;

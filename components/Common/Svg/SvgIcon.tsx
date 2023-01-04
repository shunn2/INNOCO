import React from 'react';

export type SvgIconType =
  | 'box-icon'
  | 'button-icon'
  | 'image-icon'
  | 'text-icon'
  | 'section-icon'
  | 'link-icon';

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

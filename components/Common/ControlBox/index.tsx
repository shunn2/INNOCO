import React, { PropsWithChildren } from 'react';

interface BoxProps {
  variant: 'auth';
  type?: 'Box' | 'submit';
  disabled?: boolean;
  onClick?: () => void;
}

const ControlBox = (props) => {
  const { children, ...rest } = props;
  return (
    <div
      {...rest}
      className="px-4 py-4 flex justify-center items-center rounded bg-sky-500 h-3.5 text-slate-200 text-white text-xs"
    >
      {children}
    </div>
  );
};

export default ControlBox;

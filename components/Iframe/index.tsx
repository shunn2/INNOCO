import { useState } from 'react';
import { createPortal } from 'react-dom';

import { IframStyle as S } from './styled';

const CustomIframe = ({ children, ...props }) => {
  const [contentRef, setContentRef] = useState(null);

  const mountNode = contentRef?.contentWindow?.document?.body;

  return (
    <S.IframeBox>
      <S.Iframe {...props} ref={setContentRef}>
        {mountNode && createPortal(children, mountNode)}
      </S.Iframe>
    </S.IframeBox>
  );
};

export default CustomIframe;

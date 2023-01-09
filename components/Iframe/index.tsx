import { useState } from 'react';
import { createPortal } from 'react-dom';

import { IframStyle as Styled } from './styled';

const CustomIframe = ({ children, ...props }) => {
  const [contentRef, setContentRef] = useState(null);

  const mountNode = contentRef?.contentWindow?.document?.body;

  return (
    <Styled.IframeBox>
      <Styled.Iframe {...props} ref={setContentRef}>
        {mountNode && createPortal(children, mountNode)}
      </Styled.Iframe>
    </Styled.IframeBox>
  );
};

export default CustomIframe;

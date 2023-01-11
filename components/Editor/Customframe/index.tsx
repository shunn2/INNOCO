import { PropsWithChildren, useState } from 'react';
import { createPortal } from 'react-dom';
import { IframStyle as Styled } from './styled';

interface IframeProps {
  title: string;
  frameBorder: string | number;
  allowFullScreen: boolean;
  id: string;
}

const CustomIframe = ({
  children,
  ...props
}: PropsWithChildren<IframeProps>) => {
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

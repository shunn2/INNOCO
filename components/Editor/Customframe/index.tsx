import { IframeEditorReturn } from '@utils/iframe/iframeEditorReturn';
import { PropsWithChildren, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { IframStyle as Styled } from './styled';

interface IframeProps {
  title: string;
  frameBorder: string | number;
  id: string;
}

const CustomIframe = ({
  children,
  ...props
}: PropsWithChildren<IframeProps>) => {
  const [contentRef, setContentRef] = useState(null);

  const mountNode = contentRef?.contentWindow?.document?.body;

  useEffect(() => {
    const frame = IframeEditorReturn();
    let script = document.createElement('script');
    script.src = 'https://cdn.tailwindcss.com';
    let link = document.createElement('link');
    link.href = 'https://unpkg.com/tailwindcss@^2/dist/tailwind.min.css';
    link.rel = 'stylesheet';
    frame.contentWindow.document.head.appendChild(script);
    frame.contentWindow.document.head.appendChild(link);
  }, [contentRef]);

  return (
    <Styled.IframeBox>
      <Styled.Iframe {...props} ref={setContentRef}>
        {mountNode && createPortal(children, mountNode)}
      </Styled.Iframe>
    </Styled.IframeBox>
  );
};

export default CustomIframe;

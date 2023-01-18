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
    const isIFrame = (prop: HTMLElement | null): prop is HTMLIFrameElement =>
      prop !== null && prop.tagName === 'IFRAME';
    const frame = document.getElementById('editor_iframe');
    if (isIFrame(frame)) {
      let script = document.createElement('script');
      script.src = 'https://cdn.tailwindcss.com';
      let link = document.createElement('link');
      link.href = 'https://unpkg.com/tailwindcss@^2/dist/tailwind.min.css';
      link.rel = 'stylesheet';
      frame.contentWindow.document.head.appendChild(script);
      frame.contentWindow.document.head.appendChild(link);
      // let doc = frame.contentDocument;
      // doc.head.appendChild(script);
      // let doc = frame.contentDocument;
      // doc.body.innerHTML =
      //   doc.body.innerHTML +
      //   `<style>.element_event:hover{border: 4px solid #0077CC;} .element_event:visited{border: 4px solid #0077CC;}</style>`;
    }
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

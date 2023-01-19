export const IframeEditorReturn = () => {
  const isIFrame = (prop: HTMLElement | null): prop is HTMLIFrameElement =>
    prop !== null && prop.tagName === 'IFRAME';
  const frame = document.getElementById('editor_iframe');
  if (isIFrame(frame)) return frame;
  return null;
};

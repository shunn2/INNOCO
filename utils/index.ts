const isIFrame = (input: HTMLElement | null): input is HTMLIFrameElement =>
  input !== null && input.tagName === 'IFRAME';

const getInsertLocation = (e, element, direction = 'row') => {
  const frame = document.getElementById('editor_iframe');
  if (isIFrame(frame)) {
    const dragOver = frame.contentWindow.document.getElementById(element.id);
    const { x, y, width, height } = dragOver.getBoundingClientRect(); //component
    const { clientX, clientY } = e; //mouse
    if (direction === 'row') {
      if (clientX >= x + width / 2) {
        return 'right';
      } else return 'left';
    }
    if (direction === 'col') {
      if (clientY > y + height / 2) {
        console.log('down');
      } else {
        console.log('up');
      }
    }
  }
};
//섹션끼리 일때는 col로
//섹션일때는 다른 것으로

export { getInsertLocation };

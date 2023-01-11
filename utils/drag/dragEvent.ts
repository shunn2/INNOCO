const DragEvent = {
  handleDragStart: (e, element, idx, sectionId) => {
    e.dataTransfer.setData(
      'dragging',
      JSON.stringify({
        el: element,
        idx: idx,
        sectionId: sectionId,
      })
    );
    e.stopPropagation();
  },
};

export default DragEvent;

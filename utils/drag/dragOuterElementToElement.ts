const DragOuterElementToElement = (
  e,
  draggingOver,
  insertLocation,
  setMain
) => {
  const { el, elIdx, sectionId } = JSON.parse(
    e.dataTransfer.getData('dragging')
  );
  setMain((prev) => {
    const cur = JSON.parse(JSON.stringify(prev));
    if (insertLocation === 'left' || insertLocation === 'up') {
      if (draggingOver.idx < elIdx || draggingOver.sectionId !== sectionId) {
        cur[draggingOver.sectionId].children.splice(
          draggingOver.idx === 0 ? 0 : draggingOver.idx,
          0,
          el
        );
      } else {
        cur[draggingOver.sectionId].children.splice(
          draggingOver.idx === 0 ? 0 : draggingOver.idx - 1,
          0,
          el
        );
      }
    }
    if (insertLocation === 'right' || insertLocation === 'down') {
      if (draggingOver.idx < elIdx || draggingOver.sectionId !== sectionId) {
        cur[draggingOver.sectionId].children.splice(
          draggingOver.idx + 1,
          0,
          el
        );
      } else {
        cur[draggingOver.sectionId].children.splice(draggingOver.idx, 0, el);
      }
    }
    return cur;
  });
};

export default DragOuterElementToElement;
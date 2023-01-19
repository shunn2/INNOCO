interface DragEffectProps {
  insertLocation: string;
  draggingOverId: string;
  elementId: string;
}

const DragEffectStyle = (props: DragEffectProps) => {
  const { insertLocation, draggingOverId, elementId } = props;
  return draggingOverId === elementId
    ? `border-${insertLocation}-4 box-border border-sky-500`
    : '';
};

export default DragEffectStyle;

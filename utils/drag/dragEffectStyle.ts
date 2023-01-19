interface DragEffectProps {
  insertLocation: string;
  draggingOverId: string;
  elementId: string;
}

const DragEffectStyle = (props: DragEffectProps) => {
  const { insertLocation, draggingOverId, elementId } = props;
  return draggingOverId === elementId
    ? `border-${insertLocation}-2 box-border border-sky-500`
    : '';
};

/**
 * 추후 컴포넌트 이동 시 컴포넌트가 속한 section 색상 또한 변경 예정
 */

export default DragEffectStyle;

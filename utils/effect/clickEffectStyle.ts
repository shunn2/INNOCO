interface ClickEffectProps {
  clickedId: string;
  elementId: string;
}

const ClickEffectStyle = ({ clickedId, elementId }: ClickEffectProps) => {
  return clickedId === elementId ? `border-4 border-sky-500` : '';
};

export default ClickEffectStyle;

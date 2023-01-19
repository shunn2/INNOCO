interface ClickEffectProps {
  elementId: string;
  clickedId: string;
}

const ClickEffectStyle = ({ elementId, clickedId }: ClickEffectProps) => {
  return clickedId === elementId ? `border-4 border-sky-500` : '';
};

export default ClickEffectStyle;

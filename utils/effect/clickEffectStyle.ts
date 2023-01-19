import { elementInfoAtom } from '@recoil/styleSideBar/atom';
import { useRecoilValue } from 'recoil';

interface ClickEffectProps {
  elementId: string;
}

const ClickEffectStyle = ({ elementId }: ClickEffectProps) => {
  const clickedElement = useRecoilValue(elementInfoAtom);
  return clickedElement.id === elementId ? `border-4 border-sky-500` : '';
};

export default ClickEffectStyle;

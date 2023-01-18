import { ControlBox } from '@components/Common';
import { withMainData } from '@recoil/editor';
import { elementInfoAtom } from '@recoil/styleSideBar/atom';
import { deleteElement } from '@utils/control';
import { useRecoilState } from 'recoil';

interface WidgetProps {
  top: number;
  left: number;
}

const ControlWidget = (props) => {
  const [main, setMain] = useRecoilState(withMainData);
  const [element, setElement] = useRecoilState(elementInfoAtom);
  return (
    <div className="absolute flex justify-between items-center w-56 space-x-9 px-2 py-2 pr-6 mb-20">
      <ControlBox>{element.el.type}</ControlBox>
      <ControlBox onClick={() => deleteElement(element, setMain)}>X</ControlBox>
    </div>
  );
};

export default ControlWidget;

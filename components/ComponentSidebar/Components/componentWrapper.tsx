import * as Styled from './styled';
import { SvgIcon } from '@components/Common';
import { dragStart } from '@utils/drag';
import { v4 as uuidv4 } from 'uuid';

interface ComponentProps {
  type: string;
  icon: string | any;
  data: any;
}

const ComponentWrapper = (props: ComponentProps) => {
  const { type, icon, data } = props;
  const handleDragStart = (e) => {
    data.id = uuidv4();
    dragStart({ e: e, element: data, idx: '', sectionId: '' });
  };
  return (
    <Styled.ComponentItems draggable onDragStart={handleDragStart}>
      <SvgIcon type={icon} />
      <div>{type}</div>
    </Styled.ComponentItems>
  );
};

export default ComponentWrapper;

import { SvgIcon } from '@components/Common';
import * as Styled from './styled';
import { v4 as uuidv4 } from 'uuid';
import dragStart from '@utils/drag/dragStart';

const sectionData = {
  id: '',
  type: 'section',
  tag: 'div',
  sectionProps: {
    style: {
      width: '100%',
      minHeight: '100px',
      border: '1px solid black',
      display: 'flex',
      backgroundColor: 'black',
    },
    draggable: true,
  },
  content: '',
  class: {
    flex: true,
  },
  image: null,
  children: [],
};

const SectionComponent = () => {
  const handleDragStart = (e) => {
    sectionData.id = uuidv4();
    dragStart({ e: e, element: sectionData, idx: '', sectionId: '' });
  };
  return (
    <Styled.ComponentItems draggable onDragStart={handleDragStart}>
      <SvgIcon type="box-icon" />
      <div>Section</div>
    </Styled.ComponentItems>
  );
};

export default SectionComponent;

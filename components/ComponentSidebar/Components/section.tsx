import { SvgIcon } from '@components/Common';
import * as Styled from './styled';

const sectionData = {
  id: null,
  type: 'section',
  tag: 'div',
  sectionProps: {
    style: {
      width: '100%',
      minHeight: '100px',
      border: '1px solid black',
      display: 'flex',
      backgroundColor: 'white',
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
    // e.dataTransfer.setData('start', JSON.stringify(element));
    // e.dataTransfer.setData('idx', idx);
    // e.dataTransfer.setData('sId', sId);
  };
  return (
    <Styled.ComponentItems draggable>
      <SvgIcon type="box-icon" />
      <div>Section</div>
    </Styled.ComponentItems>
  );
};

export default SectionComponent;

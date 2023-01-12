import * as Styled from './styled';
import { SvgIcon } from '@components/Common';
import { dragStart } from '@utils/drag';
import { v4 as uuidv4 } from 'uuid';

const textData = {
  id: '',
  type: 'box',
  tag: 'div',
  parentProps: {
    draggable: false,
    style: {
      border: '2px solid black',
      width: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
  },
  props: {
    className: 'seonghonon',
    draggable: true,
    style: {
      width: '100px',
      height: '50px',
      backgroundColor: 'yellow',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
  },
  content: 'aaaaa',
  class: {
    abc: true,
  },
  image: null,
  children: [],
};

const BoxComponent = () => {
  const handleDragStart = (e) => {
    textData.id = uuidv4();
    dragStart({ e: e, element: textData, idx: '', sectionId: '' });
  };
  return (
    <Styled.ComponentItems draggable onDragStart={handleDragStart}>
      <SvgIcon type="box-icon" />
      <div>Text</div>
    </Styled.ComponentItems>
  );
};

export default BoxComponent;

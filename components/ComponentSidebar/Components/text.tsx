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
      width: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    className: ['border-transparent', 'border-4', 'hover:border-cyan-300'],
  },
  props: {
    className: ['border-transparent', 'border-4', 'hover:border-cyan-300'],
    draggable: true,
    style: {
      minWidth: '100px',
      minHeight: '50px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      fontSize: '20px',
      fontWeight: 'bold',
    },
    contentEditable: true,
    suppressContentEditableWarning: true,
    placeholder: 'abcde',
  },
  content: 'type your words',
  class: {
    abc: true,
  },
  image: null,
  children: [],
};

const TextComponent = () => {
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

export default TextComponent;

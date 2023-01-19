export const sectionData = {
  id: '',
  type: 'section',
  tag: 'div',
  sectionProps: {
    style: {
      width: '100%',
      minHeight: '100px',
      display: 'flex',
      backgroundColor: '#fff',
    },
    draggable: true,
    className: ['border-transparent', 'border-4', 'hover:border-cyan-300'],
  },
  content: '',
  class: {
    flex: true,
  },
  image: null,
  children: [],
};

export const textData = {
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

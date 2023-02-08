export const sectionData = {
  id: '',
  type: 'section',
  tag: 'div',
  sectionProps: {
    style: {
      width: '100%',
      minHeight: '100px',
      display: 'flex',
      backgroundColor: 'white',
      color: 'white',
    },
    draggable: true,
    className: ['border-transparent', 'border-4', 'hover:border-cyan-300'],
  },
  content: '',
  image: null,
  children: [],
};

export const textData = {
  id: '',
  type: 'Text',
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
      padding: '10px 14px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      fontSize: '16px',
      fontWeight: 'bold',
      backgroundColor: 'white',
      color: 'black',
    },
  },
  content: 'type your words',
  image: null,
  children: [],
};

export const buttonData = {
  id: '',
  type: 'Button',
  tag: 'button',
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
      padding: '10px 14px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      fontSize: '16px',
      fontWeight: 'bold',
      backgroundColor: 'dodgerblue',
      borderRadius: '12px',
      color: 'black',
    },
    onClick: () => console.log('button'),
  },
  content: 'Button',
  image: null,
  children: [],
};

export const linkData = {
  id: '',
  type: 'Link',
  tag: 'a',
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
      padding: '10px 14px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      fontSize: '16px',
      fontWeight: 'bold',
      backgroundColor: 'white',
      color: 'black',
      borderRadius: '12px',
    },
    href: '',
    target: '_blank',
  },
  content: 'Link',
  image: null,
  children: [],
};

export const imageData = {
  id: '',
  type: 'Image',
  tag: 'img',
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
      padding: '10px 14px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'white',
    },
    alt: 'image',
    src: '',
  },
  image: null,
  children: [],
};

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
    href: 'https://www.naver.com',
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
    src: 'data:image/jpeg;base64,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',
  },
  image: null,
  children: [],
};

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
      color: 'black',
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
      wordBreak: 'break-all',
      whiteSpace: 'pre-wrap',
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
    src: '/image_sample.jpg',
  },
  image: null,
  children: [],
};

export const guestBook = {
  id: 'guestBook',
  section_id: 1,
  type: 'section',
  dataComponent: 'guestBook',
  sectionProps: {
    style: {
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'white',
    },
  },
  children: [
    {
      id: 'content',
      type: 'content',
      tag: 'div',
      props: {
        style: {
          display: 'flex',
          alignItems: 'center',
          width: '500px',
          minHeight: '50px',
          color: 'black',
        },
      },
      children: [],
    },
    {
      id: 'input',
      type: 'input',
      tag: 'textarea',
      props: {
        placeholder: '방명록을 작성하세요',
        style: {
          width: '400px',
          height: '56px',
          padding: '16px',
          border: '0.5px solid #aaa',
          borderRadius: '6px',
          marginBottom: '12px',
          resize: 'none',
          color: 'black',
        },
      },
    },
    {
      id: 'button',
      type: 'button',
      tag: 'button',
      parentProps: {
        style: {
          display: 'flex',
          justifyContent: 'flex-end',
        },
      },
      props: {
        style: {
          padding: '4px 14px',
          fontSize: '14px',
          fontWeight: '500',
          backgroundColor: '#14B885',
          borderRadius: '4px',
          color: 'white',
        },
      },
    },
  ],
};

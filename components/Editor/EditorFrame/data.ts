const jsonData = {
  title: 'abcd',
  main: {
    section_1: {
      id: 'section_1',
      type: 'section',
      tag: 'div',
      sectionProps: {
        style: {
          width: '100%',
          height: '100px',
          border: '1px solid black',
          display: 'flex',
          backgroundColor: '#fff',
        },
        draggable: true,
      },
      content: '',
      class: {
        flex: true,
      },
      image: null,
      children: [
        {
          id: 'box_1',
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
              backgroundColor: 'red',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            },
          },
          content: 'box1',
          class: {
            abc: true,
          },
          image: null,
          children: [],
        },
        {
          id: 'box_2',
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
          content: 'box2',
          class: {
            abc: true,
          },
          image: null,
          children: [],
        },
        {
          id: 'box_4',
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
              backgroundColor: 'blue',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            },
          },
          content: 'box4',
          class: {
            abc: true,
          },
          image: null,
          children: [],
        },
        {
          id: 'box_5',
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
              backgroundColor: 'brown',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            },
          },
          content: 'box5',
          class: {
            abc: true,
          },
          image: null,
          children: [],
        },
      ],
    },
    section_2: {
      id: 'section_2',
      type: 'section',
      tag: 'div',
      sectionProps: {
        style: {
          width: '100%',
          height: '100px',
          border: '1px solid black',
          display: 'flex',
          backgroundColor: '#fff',
        },
        draggable: true,
      },
      content: '',
      class: {
        flex: true,
      },
      image: null,
      children: [
        {
          id: 'box_3',
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
              backgroundColor: 'green',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            },
          },
          content: 'box3',
          class: {
            abc: true,
          },
          image: null,
          children: [],
        },
      ],
    },
    section_3: {
      id: 'section_3',
      type: 'section',
      tag: 'div',
      sectionProps: {
        style: {
          width: '100%',
          height: '100px',
          border: '1px solid black',
          display: 'flex',
          backgroundColor: '#fff',
        },
        draggable: true,
      },
      content: '',
      class: {
        flex: true,
      },
      image: null,
      children: [],
    },
    section_4: {
      id: 'section_4',
      type: 'section',
      tag: 'div',
      sectionProps: {
        style: {
          width: '100%',
          height: '100px',
          border: '1px solid black',
          display: 'flex',
          backgroundColor: '#fff',
        },
        draggable: true,
      },
      content: '',
      class: {
        flex: true,
      },
      image: null,
      children: [],
    },
    section_5: {
      id: 'section_5',
      type: 'section',
      tag: 'div',
      sectionProps: {
        style: {
          width: '100%',
          height: '100px',
          border: '1px solid black',
          display: 'flex',
          backgroundColor: '#fff',
        },
        draggable: true,
      },
      content: '',
      class: {
        flex: true,
      },
      image: null,
      children: [],
    },
  },
  sectionOrder: [
    'section_1',
    'section_2',
    'section_3',
    'section_4',
    'section_5',
  ],
};

export default jsonData;

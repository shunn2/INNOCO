import React, { useEffect, useState } from 'react';
import { getInsertLocation } from '@utils/getInsertLocation';

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
          backgroundColor: 'white',
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
          backgroundColor: '#aaa',
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
    },
  },
  sectionOrder: ['section_1', 'section_2', 'section_3'],
};

const EditorFrame = () => {
  const [data, setData] = useState<any>();
  const [insertLoc, setInsertLoc] = useState<string>();
  useEffect(() => {
    setData(jsonData);
  }, []);

  const [draggingOver, setDraggingOver] = useState<any>();

  const handleDragStart = (e, element, sId = null, idx = null) => {
    e.dataTransfer.setData('start', JSON.stringify(element));
    e.dataTransfer.setData('idx', idx);
    e.dataTransfer.setData('sId', sId);
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    const start = JSON.parse(e.dataTransfer.getData('start'));
    const idx = e.dataTransfer.getData('idx');
    const sId = e.dataTransfer.getData('sId');

    if (start.type === 'section') {
      setData((prev) => {
        let cur = { ...prev };
        let copyOrder = [...cur.sectionOrder];
        let dragged = copyOrder.splice(idx, 1)[0];
        let draggingOverSectionIdx = cur.sectionOrder.indexOf(draggingOver.sId);
        copyOrder.splice(draggingOverSectionIdx, 0, dragged);
        cur.sectionOrder = copyOrder;
        return cur;
      });
    }
    if (start.type !== 'section') {
      if (draggingOver.el.type === 'section') {
        setData((prev) => {
          let cur = JSON.parse(JSON.stringify(prev));
          let dragged = cur.main[sId].children.splice(idx, 1)[0];
          cur.main[draggingOver.sId].children.push(dragged);
          return cur;
        });
      } else {
        setData((prev) => {
          let cur = JSON.parse(JSON.stringify(prev));
          let dragged = cur.main[sId].children.splice(idx, 1)[0];
          if (insertLoc === 'left') {
            cur.main[draggingOver.sId].children.splice(
              draggingOver.idx === 0 ? 0 : draggingOver.idx,
              0,
              dragged
            ); //Err 2개일 때는 안됨
          }
          /**
           * children 2
           */
          if (insertLoc === 'right') {
            cur.main[draggingOver.sId].children.splice(
              draggingOver.idx + 1,
              0,
              dragged
            );
          }
          return cur;
        });
      }
    }
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDragEnter = (e) => {
    e.preventDefault();
  };

  const getBorderStyle = (loc: string) => {};

  const handleDragOver = (e, element, sId, idx) => {
    setDraggingOver({ el: element, sId: sId, idx: idx });
    setInsertLoc(getInsertLocation({ e, element }));
    // e.dataTransfer.dropEffect = 'none';
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
  };

  const handleDragEnd = (e) => {
    setDraggingOver({ sectionId: null, idx: null, type: null });
  };
  const createChild = (compInfo, compIdx, sId) => {
    let props = {
      ...compInfo.props,
      id: compInfo.id,
      key: compInfo.id,
      onDragStart: (e) => handleDragStart(e, compInfo, sId, compIdx),
    };
    let child = React.createElement(compInfo.tag, props, compInfo.content);
    return child;
  };
  const createParent = (compInfo, compIdx, sId) => {
    let props = {
      ...compInfo.parentProps,
      id: `parent_${compInfo.id}`,
      key: `parent_${compInfo.id}`,
      onDragOver: (e) => handleDragOver(e, compInfo, sId, compIdx),
    };
    let parent = React.createElement(
      'div',
      props,
      createChild(compInfo, compIdx, sId)
    );
    return parent;
  };

  return (
    <div id="test">
      {data &&
        data.sectionOrder.map((sId, sIdx) => {
          if (data.main[sId].children.length) {
            return (
              <div
                id={sId}
                key={sId}
                {...data.main[sId].sectionProps}
                onDragStart={(e) =>
                  handleDragStart(e, data.main[sId], sId, sIdx)
                }
                onDragOver={(e) => handleDragOver(e, data.main[sId], sId, sIdx)}
                onDragEnd={(e) => handleDragEnd(e)}
                onDrop={(e) => handleDrop(e)}
              >
                {data.main[sId].children.map((comp, compI) =>
                  createParent(comp, compI, sId)
                )}
              </div>
            );
          }
          return (
            <div
              id={sId}
              key={sId}
              {...data.main[sId].sectionProps}
              onDragStart={(e) => handleDragStart(e, data.main[sId], sId, sIdx)}
              onDragOver={(e) => handleDragOver(e, data.main[sId], sId, sIdx)}
              onDragEnd={(e) => handleDragEnd(e)}
              onDrop={(e) => handleDrop(e)}
            ></div>
          );
        })}
      <button onClick={(e) => console.log(data.main)}>click</button>
    </div>
  );
};
export default EditorFrame;

import React, { useState } from 'react';
import { getInsertLocation } from '@utils/getInsertLocation';
import jsonData from './data';

interface DragProps {
  e: React.DragEvent<HTMLDivElement>;
  element: any;
  elementIdx: number | null;
  sectionId: string;
}

const EditorFrame = () => {
  const [data, setData] = useState<any>(jsonData);
  const [insertLoc, setInsertLoc] = useState<string>();

  const [draggingOver, setDraggingOver] = useState<any>();

  const handleDragStart = (e, element, sectionId = null, idx = null) => {
    e.dataTransfer.setData('start', JSON.stringify(element));
    e.dataTransfer.setData('idx', idx);
    e.dataTransfer.setData('sectionId', sectionId);
    e.stopPropagation();
  };
  //dragging 네임으로 el: element, idx:idx, sectionId:sectionId
  const handleDrop = (e) => {
    const start = JSON.parse(e.dataTransfer.getData('start'));
    const idx = e.dataTransfer.getData('idx');
    const sectionId = e.dataTransfer.getData('sectionId');
    console.log(start, idx, sectionId);
    if (start.id === draggingOver.el.id) return;
    if (start.type === 'section') {
      setData((prev) => {
        const cur = { ...prev };
        let copyOrder = [...cur.sectionOrder];
        if (idx !== '') {
          let dragged = copyOrder.splice(idx, 1)[0];
          let draggingOverSectionIdx = cur.sectionOrder.indexOf(
            draggingOver.sectionId
          );
          copyOrder.splice(draggingOverSectionIdx, 0, dragged);
          cur.sectionOrder = copyOrder;
          return cur;
        } else {
          cur.main[start.id] = start;
          copyOrder.splice(draggingOver.idx, 0, start.id);
          cur.sectionOrder = copyOrder;
          return cur;
        }
      });
    }
    if (start.type !== 'section') {
      if (draggingOver.el.type === 'section') {
        setData((prev) => {
          let cur = JSON.parse(JSON.stringify(prev));
          let dragged = cur.main[sectionId].children.splice(idx, 1)[0];
          cur.main[draggingOver.sectionId].children.push(dragged);
          return cur;
        });
      } else {
        setData((prev) => {
          let cur = JSON.parse(JSON.stringify(prev));
          let dragged = cur.main[sectionId].children.splice(idx, 1)[0];
          if (insertLoc === 'left' || insertLoc === 'up') {
            if (
              draggingOver.idx < idx ||
              draggingOver.sectionId !== sectionId
            ) {
              cur.main[draggingOver.sectionId].children.splice(
                draggingOver.idx === 0 ? 0 : draggingOver.idx,
                0,
                dragged
              );
            } else {
              cur.main[draggingOver.sectionId].children.splice(
                draggingOver.idx === 0 ? 0 : draggingOver.idx - 1,
                0,
                dragged
              );
            }
            //Err 같은 sId일때 오른쪽에서 왼쪽으로 가면 안됨
          }
          if (insertLoc === 'right' || insertLoc === 'down') {
            if (
              draggingOver.idx < idx ||
              draggingOver.sectionId !== sectionId
            ) {
              cur.main[draggingOver.sectionId].children.splice(
                draggingOver.idx + 1,
                0,
                dragged
              );
            } else {
              cur.main[draggingOver.sectionId].children.splice(
                draggingOver.idx,
                0,
                dragged
              );
            }
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

  const handleDragOver = (e, element, sectionId, idx) => {
    setDraggingOver({ el: element, sectionId: sectionId, idx: idx });
    setInsertLoc(getInsertLocation({ e, element }));
    console.log(getInsertLocation({ e, element }));

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
  const createChild = (compInfo, compIdx, sectionId) => {
    let props = {
      ...compInfo.props,
      id: compInfo.id,
      key: compInfo.id,
      onDragStart: (e) => handleDragStart(e, compInfo, sectionId, compIdx),
    };
    let child = React.createElement(compInfo.tag, props, compInfo.content);
    return child;
  };
  const createParent = (compInfo, compIdx, sectionId) => {
    let props = {
      ...compInfo.parentProps,
      id: `parent_${compInfo.id}`,
      key: `parent_${compInfo.id}`,
      onDragOver: (e) => handleDragOver(e, compInfo, sectionId, compIdx),
    };
    let parent = React.createElement(
      'div',
      props,
      createChild(compInfo, compIdx, sectionId)
    );
    return parent;
  };

  return (
    <div id="test">
      {data &&
        data.sectionOrder.map((sectionId, sectionIdx) => {
          if (data.main[sectionId].children.length) {
            return (
              <div
                id={sectionId}
                key={sectionId}
                {...data.main[sectionId].sectionProps}
                onDragStart={(e) =>
                  handleDragStart(
                    e,
                    data.main[sectionId],
                    sectionId,
                    sectionIdx
                  )
                }
                onDragOver={(e) =>
                  handleDragOver(e, data.main[sectionId], sectionId, sectionIdx)
                }
                onDragEnd={(e) => handleDragEnd(e)}
                onDrop={(e) => handleDrop(e)}
              >
                {data.main[sectionId].children.map((element, elementIdx) =>
                  createParent(element, elementIdx, sectionId)
                )}
              </div>
            );
          }
          return (
            <div
              id={sectionId}
              key={sectionId}
              {...data.main[sectionId].sectionProps}
              onDragStart={(e) =>
                handleDragStart(e, data.main[sectionId], sectionId, sectionIdx)
              }
              onDragOver={(e) =>
                handleDragOver(e, data.main[sectionId], sectionId, sectionIdx)
              }
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

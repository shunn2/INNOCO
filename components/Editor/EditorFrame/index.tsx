import React, { useState } from 'react';
import { useRecoilState } from 'recoil';

import { getInsertLocation } from '@utils/getInsertLocation';
import { withMainData, withSectionOrder } from '@recoil/editor';
import {
  dragElementToElement,
  dragElementToSection,
  dragOuterSection,
  dragSection,
  dragStart,
} from '@utils/drag';

const EditorFrame = () => {
  const [main, setMain] = useRecoilState(withMainData);
  const [sectionOrder, setSectionOrder] = useRecoilState(withSectionOrder);
  const [insertLocation, setInsertLocation] = useState<string>();
  const [draggingOver, setDraggingOver] = useState<any>();

  const handleDrop = (e) => {
    const { el, elIdx } = JSON.parse(e.dataTransfer.getData('dragging'));
    if (el.id === draggingOver.el.id) return;
    if (el.type === 'section') {
      if (elIdx !== '') dragSection(e, draggingOver, setSectionOrder);
      else dragOuterSection(e, draggingOver, setMain, setSectionOrder);
    }
    if (el.type !== 'section') {
      if (draggingOver.el.type === 'section')
        dragElementToSection(e, draggingOver, setMain);
      else dragElementToElement(e, draggingOver, insertLocation, setMain);
    }
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDragOver = (e, element, sectionId, idx) => {
    setDraggingOver({ el: element, sectionId: sectionId, idx: idx });
    setInsertLocation(getInsertLocation({ e, element }));
    e.preventDefault();
    e.stopPropagation();
  };

  const createChild = (compInfo, compIdx, sectionId) => {
    let props = {
      ...compInfo.props,
      id: compInfo.id,
      key: compInfo.id,
      onDragStart: (e) =>
        dragStart({
          e: e,
          element: compInfo,
          idx: compIdx,
          sectionId: sectionId,
        }),
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
      {sectionOrder.map((sectionId, sectionIdx) => {
        if (main[sectionId].children.length) {
          return (
            <div
              id={sectionId}
              key={sectionId}
              {...main[sectionId].sectionProps}
              onDragStart={(e) =>
                dragStart({
                  e: e,
                  element: main[sectionId],
                  idx: sectionIdx,
                  sectionId: sectionId,
                })
              }
              onDragOver={(e) =>
                handleDragOver(e, main[sectionId], sectionId, sectionIdx)
              }
              onDrop={(e) => handleDrop(e)}
            >
              {main[sectionId].children.map((element, elementIdx) =>
                createParent(element, elementIdx, sectionId)
              )}
            </div>
          );
        }
        return (
          <div
            id={sectionId}
            key={sectionId}
            {...main[sectionId].sectionProps}
            onDragStart={(e) =>
              dragStart({
                e: e,
                element: main[sectionId],
                idx: sectionIdx,
                sectionId: sectionId,
              })
            }
            onDragOver={(e) =>
              handleDragOver(e, main[sectionId], sectionId, sectionIdx)
            }
            onDrop={(e) => handleDrop(e)}
          ></div>
        );
      })}
    </div>
  );
};
export default EditorFrame;

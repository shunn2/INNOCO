import React, { useState } from 'react';
import { getInsertLocation } from '@utils/getInsertLocation';
import { useRecoilState } from 'recoil';
import { elementInfoAtom } from '@recoil/styleSideBar/atom';
import { withMainData, withSectionOrder } from '@recoil/editor';
import {
  dragElementToElement,
  dragElementToSection,
  dragOuterElementToElement,
  dragOuterElementToSection,
  dragOuterSection,
  dragSection,
  dragStart,
} from '@utils/drag';

const EditorFrame = () => {
  const [main, setMain] = useRecoilState(withMainData);
  const [sectionOrder, setSectionOrder] = useRecoilState(withSectionOrder);
  const [insertLocation, setInsertLocation] = useState<string>();
  const [draggingOver, setDraggingOver] = useState<any>();

  const [element, setElement] = useRecoilState(elementInfoAtom);

  const handleElementClick = (sectionId, idx) => {
    const clickedElement = {
      index: idx,
      sectionId: sectionId,
    };
    setElement(clickedElement);
  };

  //dragging 네임으로 el: element, idx:idx, sectionId:sectionId
  const handleDrop = (e) => {
    const { el, elIdx } = JSON.parse(e.dataTransfer.getData('dragging'));
    if (el.id === draggingOver.el.id) return;
    if (el.type === 'section') {
      if (elIdx !== '') dragSection(e, draggingOver, setSectionOrder);
      else dragOuterSection(e, draggingOver, setMain, setSectionOrder);
    }
    if (el.type !== 'section') {
      if (draggingOver.el.type === 'section') {
        if (elIdx !== '') dragElementToSection(e, draggingOver, setMain);
        else dragOuterElementToSection(e, draggingOver, setMain);
      } else {
        if (elIdx !== '')
          dragElementToElement(e, draggingOver, insertLocation, setMain);
        else
          dragOuterElementToElement(e, draggingOver, insertLocation, setMain);
      }
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

  const createChild = (element, elementIdx, sectionId) => {
    let props = {
      ...element.props,
      id: element.id,
      key: element.id,
      onDragStart: (e) =>
        dragStart({
          e: e,
          element: element,
          idx: elementIdx,
          sectionId: sectionId,
        }),
    };
    let child = React.createElement(element.tag, props, element.content);
    return child;
  };

  const createParent = (element, elementIdx, sectionId) => {
    let props = {
      ...element.parentProps,
      id: `parent_${element.id}`,
      key: `parent_${element.id}`,
      onDragOver: (e) => handleDragOver(e, element, sectionId, elementIdx),
      onClick: () => handleElementClick(sectionId, elementIdx),
    };
    let parent = React.createElement(
      'div',
      props,
      createChild(element, elementIdx, sectionId)
    );
    return parent;
  };

  return (
    <div id="test">
      {sectionOrder.map((sectionId, sectionIdx) => (
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
          onDrop={handleDrop}
        >
          {main[sectionId].children.map((element, elementIdx) =>
            createParent(element, elementIdx, sectionId)
          )}
        </div>
      ))}
    </div>
  );
};
export default EditorFrame;

// initial-scale=1.0  // 초기 크기를 설정합니다.
// user-scalable=no // 확대 기능을 사용하지 않습니다.
// maximum-scale=1 // 최대 배율, 크기를 설정합니다.
// width=device-width  // 화면이 표현하는 사이즈를 디바이스 사이즈에 맞춥니다.

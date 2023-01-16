import React, { useEffect, useRef, useState } from 'react';
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
import { useContentEditable } from '@utils/useContentEditable';

const EditorFrame = () => {
  const [main, setMain] = useRecoilState(withMainData);
  const [sectionOrder, setSectionOrder] = useRecoilState(withSectionOrder);
  const [insertLocation, setInsertLocation] = useState<string>();
  const [draggingOver, setDraggingOver] = useState<any>();

  const [element, setElement] = useRecoilState(elementInfoAtom);

  const editorRef = useRef(null);

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
    const props = {
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
      onClick: () => handleElementClick(sectionId, elementIdx),
      onBlur: (e) => useContentEditable(e, elementIdx, sectionId, setMain),
      // onMouseEnter: (e) => getBorderStyle(e),
      // onMouseLeave: (e) => removeBorderStyle(e),
      className: `border-transparent border-4 hover:border-cyan-300 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent`,
    }; //https://velog.io/@real-bird/Javascript-%ED%81%B4%EB%A6%AD%ED%95%9C-div%EB%A7%8C-%EC%83%89%EC%83%81-%EB%B0%94%EA%BE%B8%EA%B8%B0
    const child = React.createElement(element.tag, props, element.content);
    return child;
  };

  const getBorderStyle = (e) => {
    const originalBorder = e.target.style.border;
    e.target.style.border = '2px solid red';
    e.preventDefault();
    e.stopPropagation();
  };

  const removeBorderStyle = (e) => {
    e.target.style.border = '';
    e.preventDefault();
    e.stopPropagation();
  };

  const createParent = (element, elementIdx, sectionId) => {
    const props = {
      ...element.parentProps,
      id: `parent_${element.id}`,
      key: `parent_${element.id}`,
      onDragOver: (e) => handleDragOver(e, element, sectionId, elementIdx),
    };
    const parent = React.createElement(
      element.tag,
      props,
      createChild(element, elementIdx, sectionId)
    );
    return parent;
  };

  useEffect(() => {
    editorRef.current.scrollIntoView({ behavior: 'auto', inline: 'center' });
  });

  return (
    <div style={{ width: '4000px', display: 'flex', justifyContent: 'center' }}>
      <div id="test" style={{ width: '1280px' }} ref={editorRef}>
        {sectionOrder.map((sectionId, sectionIdx) => (
          <div
            id={sectionId}
            key={sectionId}
            {...main[sectionId].sectionProps}
            className="bg-white"
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
        <div className="text-3xl font-bold underline">Hello world!</div>
        <button className="bg-red-500 text-white px-4 py-2 rounded-3xl mr-2">
          빨간색 버튼
        </button>
      </div>
    </div>
  );
};
export default EditorFrame;

// initial-scale=1.0  // 초기 크기를 설정합니다.
// user-scalable=no // 확대 기능을 사용하지 않습니다.
// maximum-scale=1 // 최대 배율, 크기를 설정합니다.
// width=device-width  // 화면이 표현하는 사이즈를 디바이스 사이즈에 맞춥니다.

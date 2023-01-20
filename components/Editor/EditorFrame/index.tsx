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
import { useContentEditable } from '@hooks/useContentEditable';
import ControlWidget from '../ControlWidget';
import { IframeEditorReturn } from '@utils/iframe/iframeEditorReturn';
import { clickEffectStyle, dragEffectStyle } from '@utils/effect';

const EditorFrame = () => {
  const [main, setMain] = useRecoilState(withMainData);
  const [sectionOrder, setSectionOrder] = useRecoilState(withSectionOrder);
  const [insertLocation, setInsertLocation] = useState<string>();
  const [draggingOver, setDraggingOver] = useState<any>();

  const [currentSelectedElement, setCurrentSelectedElement] =
    useRecoilState(elementInfoAtom);

  const editorRef = useRef(null);

  const frame = IframeEditorReturn();

  const handleElementClick = (sectionId, idx, element) => {
    const clickedElement = {
      id: element.id,
      el: element,
      index: idx,
      sectionId: sectionId,
    };
    setCurrentSelectedElement(clickedElement);
  };

  const handleDrop = (e) => {
    const { el, elIdx } = JSON.parse(e.dataTransfer.getData('dragging'));
    if (el.id === draggingOver.el.id) return;
    if (el.type === 'section') {
      if (elIdx !== '') dragSection({ e, draggingOver, setSectionOrder });
      else dragOuterSection({ e, draggingOver, setMain, setSectionOrder });
    }
    if (el.type !== 'section') {
      if (draggingOver.el.type === 'section') {
        if (elIdx !== '') dragElementToSection({ e, draggingOver, setMain });
        else dragOuterElementToSection({ e, draggingOver, setMain });
      } else {
        if (elIdx !== '')
          dragElementToElement({ e, draggingOver, insertLocation, setMain });
        else
          dragOuterElementToElement({
            e,
            draggingOver,
            insertLocation,
            setMain,
          });
      }
    }
    setDraggingOver(null);
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDragOver = (e, element, sectionId, idx) => {
    setDraggingOver({ el: element, sectionId: sectionId, idx: idx });
    setInsertLocation(getInsertLocation({ e, element }));
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDragEnd = () => {
    setDraggingOver(null);
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
      onDragEnd: () => handleDragEnd(),
      onClick: () => handleElementClick(sectionId, elementIdx, element),
      onBlur: (e) => useContentEditable(e, elementIdx, sectionId, setMain),
      className: clickEffectStyle({
        elementId: element.id,
        clickedId: currentSelectedElement.id,
      }),
      // className: element.parentProps.className.join(' '),
    };
    const child = React.createElement(element.tag, props, element.content);
    return child;
  };

  const createParent = (element, elementIdx, sectionId) => {
    const props = {
      ...element.parentProps,
      id: `parent_${element.id}`,
      key: `parent_${element.id}`,
      onDragOver: (e) => handleDragOver(e, element, sectionId, elementIdx),
      className: `box-border ${dragEffectStyle({
        insertLocation,
        draggingOverId: draggingOver?.el.id,
        elementId: element.id,
      })}`,
      // className: element.parentProps.className.join(' '),
    };
    const parent = React.createElement(
      element.tag,
      props,
      createChild(element, elementIdx, sectionId)
    );
    return parent;
  };

  useEffect(() => {
    editorRef.current.scrollIntoView({
      behavior: 'auto',
      block: 'end',
      inline: 'center',
    });
  }, []);

  return (
    <div
      style={{
        width: '4000px',
        display: 'flex',
        justifyContent: 'center',
        marginTop: '50px',
      }}
    >
      <div id="test" style={{ width: '1000px' }} ref={editorRef}>
        {sectionOrder.map((sectionId, sectionIdx) => (
          <div
            id={sectionId}
            key={sectionId}
            {...main[sectionId].sectionProps}
            className={main[sectionId].sectionProps.className.join(' ')}
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
            {main[sectionId].children.map((el, elementIdx) => {
              return (
                <div key={el.id} style={{ ...el.parentProps.style }}>
                  {el.id === currentSelectedElement.id && <ControlWidget />}
                  {createParent(el, elementIdx, sectionId)}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};
export default EditorFrame;

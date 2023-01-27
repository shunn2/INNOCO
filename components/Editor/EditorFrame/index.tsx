import React, { useEffect, useRef, useState } from 'react';
import { getInsertLocation } from '@utils/getInsertLocation';
import { useRecoilState } from 'recoil';
import { elementInfoAtom } from '@recoil/selectedElement/atom';
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
import ElementControlWidget from '../ControlWidget/element';
import SectionControlWidget from '../ControlWidget/section';
import { useContentEditable } from '@hooks/useContentEditable';
import { clickEffectStyle, dragEffectStyle } from '@utils/effect';
import { createElementProps } from '@/types/editor';

const EditorFrame = () => {
  const [main, setMain] = useRecoilState(withMainData);
  const [sectionOrder, setSectionOrder] = useRecoilState(withSectionOrder);
  const [insertLocation, setInsertLocation] = useState<string>();
  const [draggingOver, setDraggingOver] = useState<any>();
  const [dblClickElement, setDblClickElement] = useState<string>();
  const [currentSelectedElement, setCurrentSelectedElement] =
    useRecoilState(elementInfoAtom);

  const editorRef = useRef(null);

  const handleElementClick = (e, sectionId, idx, element) => {
    const clickedElement = {
      id: element.id,
      el: element,
      index: idx,
      sectionId: sectionId,
    };
    setCurrentSelectedElement(clickedElement);
    e.stopPropagation();
  };

  const handleElementDblClick = (elementId) => {
    setDblClickElement(elementId);
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
    setInsertLocation(
      getInsertLocation({
        e,
        element,
        direction: element.type === 'section' ? 'col' : 'row',
      })
    );
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDragEnd = () => {
    setDraggingOver(null);
  };

  const createChild = ({
    element,
    elementIdx,
    sectionId,
  }: createElementProps) => {
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
      contentEditable: dblClickElement === element.id,
      suppressContentEditableWarning: dblClickElement === element.id,
      onDragEnd: () => handleDragEnd(),
      onDoubleClick: () => handleElementDblClick(element.id),
      onClick: (e) => handleElementClick(e, sectionId, elementIdx, element),
      onBlur: (e) => {
        useContentEditable(e, elementIdx, sectionId, setMain);
        setDblClickElement('');
      },
      className: clickEffectStyle({
        clickedId: currentSelectedElement.id,
        elementId: element.id,
      }),
      // className: element.parentProps.className.join(' '),
    };
    // if (element.tag === 'img') return React.createElement(element.tag, props);
    return React.createElement(element.tag, props, element.content);
  };

  const createParent = ({
    element,
    elementIdx,
    sectionId,
  }: createElementProps) => {
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
    return React.createElement(
      'div',
      props,
      createChild({ element, elementIdx, sectionId })
    );
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
          <div key={sectionId}>
            {sectionId === currentSelectedElement.id && (
              <SectionControlWidget />
            )}
            <div
              id={sectionId}
              key={sectionId}
              {...main[sectionId].sectionProps}
              // className={main[sectionId].sectionProps.className.join(' ')}
              className={`${dragEffectStyle({
                insertLocation,
                draggingOverId: draggingOver?.el.id,
                elementId: sectionId,
              })} ${clickEffectStyle({
                clickedId: currentSelectedElement.id,
                elementId: sectionId,
              })}`}
              onDragStart={(e) =>
                dragStart({
                  e: e,
                  element: main[sectionId],
                  idx: sectionIdx,
                  sectionId,
                })
              }
              onDragOver={(e) =>
                handleDragOver(e, main[sectionId], sectionId, sectionIdx)
              }
              onDrop={handleDrop}
              onClick={(e) =>
                handleElementClick(e, sectionId, sectionIdx, main[sectionId])
              }
            >
              {main[sectionId].children.map((element, elementIdx) => (
                <div key={element.id} style={{ ...element.parentProps.style }}>
                  {element.id === currentSelectedElement.id && (
                    <ElementControlWidget />
                  )}
                  {createParent({ element, elementIdx, sectionId })}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default EditorFrame;

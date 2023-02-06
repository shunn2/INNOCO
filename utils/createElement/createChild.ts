import { useContentEditable } from '@hooks/useContentEditable';
import { withMainData } from '@recoil/editor';
import { elementInfoAtom } from '@recoil/selectedElement/atom';
import { dragStart } from '@utils/drag';
import { clickEffectStyle } from '@utils/effect';
import React, { useState } from 'react';
import { useRecoilState } from 'recoil';

interface CreateChildProps {
  element: any;
  elementIdx: number;
  sectionId: string;
}

const createChild = (props: CreateChildProps) => {
  const { element, elementIdx, sectionId } = props;
  const [main, setMain] = useRecoilState(withMainData);
  const [dblClickElement, setDblClickElement] = useState<string>();
  const [currentSelectedElement, setCurrentSelectedElement] =
    useRecoilState(elementInfoAtom);
  const handleElementClick = (e, sectionId, idx, element) => {
    const clickedElement = {
      id: element.id,
      el: element,
      index: idx,
      sectionId: sectionId,
    };
    setCurrentSelectedElement(clickedElement);
    console.log('click', currentSelectedElement);

    e.stopPropagation();
  };

  const handleElementDblClick = (elementId) => {
    setDblClickElement(elementId);
  };
  const option = {
    ...element.props,
    id: element.id,
    key: element.id,
    onDragStart: (e) =>
      dragStart({
        e,
        element,
        idx: elementIdx,
        sectionId,
      }),
    contentEditable: dblClickElement === element.id,
    suppressContentEditableWarning: dblClickElement === element.id,
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
  return React.createElement(element.tag, option, element.content);
};

export default createChild;

// import React from 'react';
// import createChild from './createChild';
// import { dragEffectStyle } from '@utils/effect';

// interface CreaetParentProps {
//   element: any;
//   elementIdx: number;
//   sectionId: string;
//   insertLocation: string;
//   draggingOver: any;
//   handleDragOver: (e) => void;
// }

// const createParent = (props: CreaetParentProps) => {
//   const {
//     element,
//     elementIdx,
//     sectionId,
//     insertLocation,
//     draggingOver,
//     handleDragOver,
//   } = props;
//   const option = {
//     ...element.parentProps,
//     id: `parent_${element.id}`,
//     key: `parent_${element.id}`,
//     onDragOver: (e) => handleDragOver(e),
//     className: `box-border ${dragEffectStyle({
//       insertLocation,
//       draggingOverId: draggingOver?.el.id,
//       elementId: element.id,
//     })}`,
//   };
//   return React.createElement(
//     'div',
//     option,
//     createChild({ element, elementIdx, sectionId })
//   );
// };

// export default createParent;

const abc = () => {};
export default abc;

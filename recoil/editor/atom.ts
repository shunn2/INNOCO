import { atom, selector } from 'recoil';
import jsonData from '@components/Editor/EditorFrame/data';

const editorAtom = atom({
  key: 'editor',
  default: jsonData,
});

// export const getEditorSelector = selector({
//   key: 'editor/get',
//   get: async ({}) => {},
//   set: ({ set }, newValue) => {
//     set(editorAtom, newValue);
//   },
// });

export default editorAtom;

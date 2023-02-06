import { atom, selector } from 'recoil';

const projectAtom = atom({
  key: 'projectAtom',
  default: {
    authority: 'VIEWER',
    name: '',
  },
});

// export const getEditorSelector = selector({
//   key: 'editor/get',
//   get: async ({}) => {},
//   set: ({ set }, newValue) => {
//     set(projectAtom, newValue);
//   },
// });

export default projectAtom;

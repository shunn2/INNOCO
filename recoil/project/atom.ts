import { atom, selector } from 'recoil';
import { recoilPersist } from 'recoil-persist'; // ✔

const { persistAtom } = recoilPersist();

const projectAtom = atom({
  key: 'projectAtom',
  default: {
    authority: '',
    id: '',
    pageId: '',
    projectId: '',
  },
  effects_UNSTABLE: [persistAtom],
});

// export const getEditorSelector = selector({
//   key: 'editor/get',
//   get: async ({}) => {},
//   set: ({ set }, newValue) => {
//     set(projectAtom, newValue);
//   },
// });

export default projectAtom;

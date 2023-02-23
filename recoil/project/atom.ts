import { atom } from 'recoil';
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

export default projectAtom;

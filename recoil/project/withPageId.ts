import { selector } from 'recoil';
import projectAtom from './atom';

const proejectWithPageId = selector({
  key: 'projectWithPageId',
  get: ({ get }) => get(projectAtom).pageId,
  set: ({ set }, newValue: any) =>
    set(projectAtom, (prev) => ({
      ...prev,
      pageId: newValue,
    })),
});

export default proejectWithPageId;

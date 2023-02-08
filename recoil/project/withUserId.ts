import { selector } from 'recoil';
import projectAtom from './atom';

const projectWithUserId = selector({
  key: 'projectWithUserId',
  get: ({ get }) => get(projectAtom).id,
  set: ({ set }, newValue: any) =>
    set(projectAtom, (prev) => ({
      ...prev,
      id: newValue,
    })),
});

export default projectWithUserId;

import { selector } from 'recoil';
import projectAtom from './atom';

const proejectWithProjectId = selector({
  key: 'projectWithProjectId',
  get: ({ get }) => get(projectAtom).projectId,
  set: ({ set }, newValue: any) =>
    set(projectAtom, (prev) => ({
      ...prev,
      projectId: newValue,
    })),
});

export default proejectWithProjectId;

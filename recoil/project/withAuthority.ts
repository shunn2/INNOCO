import { selector } from 'recoil';
import projectAtom from './atom';

const projectWithAuthority = selector({
  key: 'projectWithAuthority',
  get: ({ get }) => get(projectAtom).authority,
  set: ({ set }, newValue: any) =>
    set(projectAtom, (prev) => ({
      ...prev,
      authority: newValue,
    })),
});

export default projectWithAuthority;

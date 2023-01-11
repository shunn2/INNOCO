import { selector } from 'recoil';
import editorAtom from './atom';

const editorWithMainData = selector({
  key: 'editorWithMainData',
  get: ({ get }) => get(editorAtom).sectionOrder,
  set: ({ set }, newValue: any) =>
    set(editorAtom, (prev) => ({
      ...prev,
      main: newValue,
    })),
});

export default editorWithMainData;

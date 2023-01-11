import { selector } from 'recoil';
import editorAtom from './atom';

const editorWithSectionOrder = selector({
  key: 'editorWithSectionOrder',
  get: ({ get }) => get(editorAtom).sectionOrder,
  set: ({ set }, newValue: string[]) =>
    set(editorAtom, (prev) => ({
      ...prev,
      sectionOrder: newValue,
    })),
});

export default editorWithSectionOrder;

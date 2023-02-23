import { atom } from 'recoil';

const editorAtom = atom({
  key: 'editoratom',
  default: { title: '', main: {}, sectionOrder: [] },
});

export default editorAtom;

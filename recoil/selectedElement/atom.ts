import { atom } from 'recoil';
export const elementStyleAtom = atom({
  key: 'elementStyleAtom',
  default: {},
});

export const elementInfoAtom = atom({
  key: 'elementInfoAtom',
  default: {
    id: null,
    el: { type: '', props: { src: '', href: '' } },
    index: 0,
    sectionId: '',
  },
});

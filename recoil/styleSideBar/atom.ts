import React, { useContext } from 'react';
import { atom, selector, useRecoilCallback } from 'recoil';
export const elementStyleAtom = atom({
  key: 'elementStyleAtom',
  default: {},
});

export const elementInfoAtom = atom({
  key: 'elementInfoAtom',
  default: {
    index: 0,
    sectionId: '',
  },
});

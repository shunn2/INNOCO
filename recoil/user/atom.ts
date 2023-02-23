import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist'; // ✔

const { persistAtom } = recoilPersist();

export const userInfoAtom = atom({
  key: 'userInfoAtom',
  default: {
    userLoginId: '',
    userName: '',
    userEmail: '',
    userProfileUrl: '',
  },
  effects_UNSTABLE: [persistAtom],
});

import { atom } from 'recoil';

export const courseListState = atom({
  key: 'courseListState',
  default: [], // Initial value is an empty array
});
import { atom, DefaultValue, selector } from 'recoil'

export const ModalInfo = atom({
    key: 'modalInfo',
    default: {
      open: false,
      type: null
    }
  });
  
export const AccessToken = atom({
  key: 'AccessToken',
  default: ''
})

export const isLoggedInState = atom({
  key: 'isLoggedIn',
  default: false
})

export const ChainId = atom({
  key: 'ChainId',
  default: 31337
})

export const ModalMission = atom({
  key: 'Mission',
  default: false
})
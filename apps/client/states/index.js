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

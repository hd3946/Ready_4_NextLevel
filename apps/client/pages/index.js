import Head from "next/head";
import Header from "../components/Header";
import { useRecoilState } from 'recoil'
import { ModalInfo } from '../states' 
import { Button } from '@mui/material' 
import { LoginModal, ModalPortal } from '../modal'
import { ModalType } from '../components/WalletCard'

export default function Home() {
  const [modalInfo, setModalInfo] = useRecoilState(ModalInfo)
  const onClick = () => {
    console.log('modalInfo', modalInfo.open)
    setModalInfo({ open: true, type: ModalType.Login })
  }

  const handleClose = () => {
    setModalInfo({ open: false, type: null })
    // if (modalInfo.type === ModalType.SwitchNetwork || modalInfo.type === ModalType.SignMessage) {
    //   disconnect()
    //   setAccessToken('')
    // }
  }

  const Modal = (props) => {
    switch (props.modalType) {
      case ModalType.Login:
        return <LoginModal closePortal={handleClose} />
      // case ModalType.SwitchNetwork:
      //   return <SwitchNetworkModal closePortal={handleClose} />
      // case ModalType.SignMessage:
      //   return <SignMessageModal closePortal={handleClose} />
      // case ModalType.InvitationCode:
      //   return <InvitationModal closePortal={handleClose} />
      default:
        return <LoginModal closePortal={handleClose} />
    }
  }
  
  return (
    <>
      <Head>
        <title>R4NL</title>
      </Head>
      <Header />
      <Button onClick={onClick}>Test</Button>
      {modalInfo.open ? (
        <ModalPortal closePortal={handleClose}>
          <Modal modalType={modalInfo.type} />
        </ModalPortal>
      ): ''}
      <div id="modal-root"></div>
    </>
  );
}

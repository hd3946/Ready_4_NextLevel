import Head from "next/head";
import Header from "../components/Header";

export default function Home() {
  const [modalInfo, setModalInfo ] = useRecoilState(ModalInfo)

  return (
    <>
      <Head>
        <title>R4NL</title>
      </Head>
      <Header />
      {modalInfo.open ? (
        <ModalPortal closePortal={handleClose}>
          <Modal modalType={modalInfo.type} />
        </ModalPortal>
      ): ''}
      <div id="modal-root"></div>
    </>
  );
}

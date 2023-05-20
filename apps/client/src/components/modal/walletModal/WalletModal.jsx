import coinBase from "@assets/images/icons/coinbase.png";
import metamaskIcon from "@assets/images/icons/meta-mask.png";
import trustWalletIcon from "@assets/images/icons/trust.png";
import walletConnect from "@assets/images/icons/wallet.png";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FiChevronRight, FiX } from "react-icons/fi";
import { useRecoilState } from "recoil";
import { isMetaMaskInstalled } from "src/lib/metamaskhandler";
import { useModal } from "src/utils/ModalContext";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import WalletModalStyleWrapper from "./WalletModal.style";
import { isLoggedInState } from "../../../states";

const WalletModal = () => {
  const { walletModalHandle, handleMetamaskModal } = useModal();
  const { connectors ,isLoading, pendingConnector, connectAsync } = useConnect();
  const { disconnect } = useDisconnect();
  const { isConnected } = useAccount();
  const [selected, setSelected] = useState({ target: "", isPending: false });
  const [isLoggedIn, setLoggedIn] = useRecoilState(isLoggedInState);
  const connector = connectors[0]; // Test
    
  useEffect(() => {
    if (isConnected) {
      setSelected({ target: "", isPending: false });
    }
  }, [isConnected]);

  useEffect(() => {
    if (isLoading && pendingConnector) {
      if (selected.target === connector.id) {
        setSelected((prev) => ({ ...prev, isPending: true }));
      }
    } else {
    }
  }, [isLoading, pendingConnector]);

  const handleMetamask = async (e) => { 
    e.preventDefault(); 
    if (selected.isPending) {
      return;
    }
    if (!isMetaMaskInstalled()) {
      handleMetamaskModal();
    } else {
   
      // const account = await connectWallet();
      setSelected((prev) => ({ ...prev, target: connector.id }));
      setLoggedIn(true)
      walletModalHandle()
      console.log('metamask', isLoggedIn)
      // console.log('selected2', selected, connector.id ) 

      connectAsync({ connector }) 
        .catch((e) => {
          if (e.code === 4001) {
            setSelected({ target: "", isPending: false });
          }
          console.error(
            `error occurred while connecting wallet. code-${e?.code}, message-${e?.message}`
          );
        });
    }
  };
 
  return (
    <>
      <WalletModalStyleWrapper className="modal_overlay">
        <div className="mint_modal_box">
          <div className="mint_modal_content">
            <div className="modal_header">
              <h2>CONNECT WALLET</h2>
              <p>Please select a wallet to connect to this marketplace</p>
              <button onClick={() => walletModalHandle()}>
                <FiX />
              </button>
            </div>
            <div className="modal_body text-center">
              <div className="wallet_list">
                <Link href="#" onClick={(e) => handleMetamask(e)}>
                  <img src={metamaskIcon.src} alt="Meta-mask-Image" />
                  MetaMask
                  <span>
                    <FiChevronRight />
                  </span>
                </Link>
                <Link href="# ">
                  <img src={coinBase.src} alt="Coinbase-Image" />
                  Coinbase
                  <span>
                    <FiChevronRight />
                  </span>
                </Link>
                <Link href="# ">
                  <img src={trustWalletIcon.src} alt="Trust-Image" />
                  Trust Wallet
                  <span>
                    <FiChevronRight />
                  </span>
                </Link>
                <Link href="# ">
                  <img src={walletConnect.src} alt="Wallet-Image" />
                  WalletConnect
                  <span>
                    <FiChevronRight />
                  </span>
                </Link>
              </div>
              <div className="modal_bottom_text">
                By connecting your wallet, you agree to our
                <Link href="# ">Terms of Service</Link>
                <Link href="#">Privacy Policy</Link>
              </div>
            </div>
          </div>
        </div>
      </WalletModalStyleWrapper>
    </>
  );
};

export default WalletModal;

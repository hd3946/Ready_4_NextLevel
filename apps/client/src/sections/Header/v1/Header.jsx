import data from "@assets/data/menu/menuData";
import connectIcon from "@assets/images/icons/connect.png";
import logo from "@assets/images/logo.png";
import logo2 from "@assets/images/icons/r4nl_logo.png"
import Button from "@components/button";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  MdNotes,
  MdOutlineKeyboardArrowDown,
  MdOutlineKeyboardArrowRight,
} from "react-icons/md";
import { useRecoilState, useSetRecoilState } from "recoil";
import { useModal } from "src/utils/ModalContext";
import { useAccount, useDisconnect } from "wagmi";
import { ChainId, isLoggedInState } from "../../../states";
import MobileMenu from "../MobileMenu/MobileMenu";
import NavWrapper from "./Header.style";
import { UserIcon }  from "./UserIcon"

const CHAIN_ID = Number(31337);

const Header = () => {
  const { walletModalHandle } = useModal();
  const [isMobileMenu, setMobileMenu] = useState(false); 
  const [isLoggedIn, setLoggedIn] = useRecoilState(isLoggedInState);
  const setChainId = useSetRecoilState(ChainId);

  const { disconnect } = useDisconnect();
  const {
    isConnected,
    connector: activeConnector,
    address: account,
  } = useAccount();

  const handleMobileMenu = () => {
    setMobileMenu(!isMobileMenu);
  }; 

  useEffect(() => {
    if (isConnected) {
      if (activeConnector) {
        // setChainId(CHAIN_ID);
        setLoggedIn(true);
      }
    }  

  }, [isConnected, activeConnector]);

  // *******Comment out this code blew if you want to use sticky menu *******
  useEffect(() => {
    const header = document.getElementById("navbar");
    const handleScroll = window.addEventListener("scroll", () => {
      if (window.pageYOffset > 50) {
        header.classList.add("sticky");
      } else {
        header.classList.remove("sticky");
      }
    });

    return () => {
      window.removeEventListener("sticky", handleScroll);
    };
  }, []);

  const handleWalletBtn = (e) => {
    e.preventDefault();
    walletModalHandle();
  };

  const onClickDisconnectBtn = () => {
    disconnect()
  }

  return (
    <NavWrapper className="gamfi_header" id="navbar">
      <div className="container">
        {/* Main Menu Start */}
        <div className="gamfi_menu_sect">
          <div className="gamfi_menu_left_sect">
            <div className="logo" style={{margin:'auto'}}>
              <Link href="/">
                <img src={logo2.src} alt="gamfi nft logo" style={{width:'60px', height:'auto'}}/>
              </Link>
            </div>
          </div>
          <div className="gamfi_menu_right_sect gamfi_v1_menu_right_sect">
            <div className="gamfi_menu_list">
              <ul>
                {/* menu  */}
                {data?.map((menu, i) => (
                  <li key={i}>
                    <Link href={menu.url}>
                      {menu.title}{" "}
                      {menu.subMenus?.length > 0 && (
                        <MdOutlineKeyboardArrowDown />
                      )}
                    </Link>

                    {/* if has subMenu and length is greater than 0 */}
                    {menu.subMenus?.length > 0 && (
                      <ul className="sub_menu_list">
                        {menu.subMenus?.map((subMenu, i) => (
                          <li key={i}>
                            <Link href={subMenu.url}>
                              {subMenu.title}{" "}
                              {subMenu?.subMenuChilds?.length > 0 && (
                                <MdOutlineKeyboardArrowRight />
                              )}
                            </Link>

                            {/* if subMenu child has menu child */}
                            {subMenu?.subMenuChilds?.length > 0 && (
                              <ul className="sub_menu_child_list">
                                {subMenu?.subMenuChilds?.map((subChild, i) => (
                                  <li key={i}>
                                    <Link href={subChild.url}>
                                      {subChild.title}
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            )}
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
              </ul>
            </div>
            <div className="gamfi_menu_btns">
              <button className="menu_btn" onClick={() => handleMobileMenu()}>
                <MdNotes />
              </button>
              {isConnected ? (
                <>
                  {isLoggedIn ? (
                    <UserIcon
                      disconnect={onClickDisconnectBtn}
                      address={account}
                      connector={activeConnector}
                    />
                  ) : (
                    <h1>test</h1>
                    // <ConnectBtn disableRipple disabled={true}>
                    //   {signLoading ? <CircularProgress size={20} /> : "Signing"}
                    // </ConnectBtn>
                  )}
                </>
              ) : (
                <Button
                  sm
                  variant="white"
                  className="connect_btn"
                  onClick={(e) => handleWalletBtn(e)}
                >
                  <img src={connectIcon.src} alt="icon" />
                  Connect
                </Button>
              )}
            </div>
          </div>
        </div>
        {/* <!-- Main Menu END --> */}
        {/* <!-- mobile menu --> */}
        {isMobileMenu && <MobileMenu mobileMenuhandle={handleMobileMenu} />}
      </div>
    </NavWrapper>
  );
};

export default Header;

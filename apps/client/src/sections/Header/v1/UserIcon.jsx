import { Box, Tooltip } from "@mui/material";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { styled as MuiStyled } from "@mui/material/styles";
import React, { useState } from "react";

export function UserIcon({ disconnect, address, connector }) {
  const userColor = hashStringToColor(address);
  const [anchorEl, setAnchorEl] = useState(null);
  const [copied, setCopied] = useState(false);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const onClickLogout = () => {
    handleClose();
    disconnect();
  }; 

  const onClickAddressItem = () => {
    navigator.clipboard.writeText(address);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 1000);
  };

  return (
    <div>
      <svg
        width="45"
        height="45"
        viewBox="0 0 45 45"
        fill="none"
        xmlns="http:www.w3.org/2000/svg"
        onClick={handleClick}
      >
        <circle cx="22.5" cy="22.5" r="17.5" fill={userColor} />
        <circle cx="22.5" cy="22.5" r="22" stroke="#E3E3E3" />
      </svg>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        autoFocus={false}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        MenuListProps={{ disablePadding: true }}
        PaperProps={{
          style: {
            width: "230px",
            borderRadius: "0px",
            marginTop: "15px",
          },
        }}
      >
        <Box
          style={{
            height: "65px",
            width: "230px",
            backgroundColor: "#000",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            position: "relative",
          }}
        >
          <span style={{ color: "#fff", fontWeight: 800, fontSize: "18px" }}>
            My Wallet
          </span>
        </Box>

        <Box
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "20px 0px",
            alignItems: "center",
          }}
        >
          <CustomMenuItem onClick={() => onClickAddressItem()}>
            <Box
              style={{
                backgroundColor: userColor,
                width: "22px",
                height: "22px",
                border: `1px solid ${userColor}`,
                borderRadius: "4px",
                marginRight: "16px",
              }}
            />
            <Tooltip title={copied ? "Copied!" : "Copy"} placement="top" arrow>
              <span style={{ fontWeight: 500 }}>
                {truncateAddress(address)}
              </span>
            </Tooltip>
          </CustomMenuItem>
          <Box>
            <Logout onClick={onClickLogout}>Log out</Logout>
          </Box>
        </Box>
      </Menu>
    </div>
  );
}

const CustomMenuItem = MuiStyled(MenuItem)({
  fontSize: "16px",
  height: "50px",
  fontWeight: 500,
  display: "flex",
  justifyContent: "flex-start",
  alignItems: "center",
  width: "100%",
  marginBottom: "5px",
  padding: "0px 38px",
});

const Logout = MuiStyled(Box)({
  backgroundColor: "#F4F5F6",
  width: "152px",
  height: "44px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  color: "#555556",
  fontWeight: 800,
  cursor: "pointer",
  "&:hover": {
    backgroundColor: "#E5EF52",
    color: "#000",
  },
});

function djb2(str) {
  let hash = 5381
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) + hash + str.charCodeAt(i) /* hash * 33 + c */
  }
  return hash
}

export function hashStringToColor(str) {
  const hash = djb2(str);
  const r = (hash & 0xff0000) >> 16;
  const g = (hash & 0x00ff00) >> 8;
  const b = hash & 0x0000ff;
  return (
    "#" +
    ("0" + r.toString(16)).substr(-2) +
    ("0" + g.toString(16)).substr(-2) +
    ("0" + b.toString(16)).substr(-2)
  );
}

export const truncateAddress = (address) => {
  if (!address) return "No Account";
  const match = address.match(
    /^(0x[a-zA-Z0-9]{2})[a-zA-Z0-9]+([a-zA-Z0-9]{2})$/
  );
  if (!match) return address;
  return `${match[1]}…${match[2]}`;
};

import discord from "@assets/images/icons/discord.svg";
import linkedin from "@assets/images/icons/linkedin.svg";
import medium from "@assets/images/icons/medium.svg";
import titleShape from "@assets/images/icons/steps.png";
import test from "@assets/images/icons/Near.png";
import telegram from "@assets/images/icons/telegram.svg";
import twitter from "@assets/images/icons/twitter.svg";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import { styled as MuiStyled } from "@mui/material/styles";
import PageHeaderStyleWrapper from "./PageHeader.style";

const PageHeaderV1 = ({ currentPage, pageTitle }) => {
  return (
    <PageHeaderStyleWrapper>
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-8">
            <div className="breadcrumb_area">
              <div className="breadcrumb_menu">
                <img
                  className="heading_shape"
                  src={titleShape.src}
                  alt="bithu nft heading shape"
                />
              </div>
              <div style={{ display: "flex" }}>
                <img
                  src={test.src}
                  style={{
                    width: "100%",
                    height: "100%",
                    marginRight: "100px",
                  }}
                  alt=""
                />
                <div>
                  <h2 className="breadcrumb_title text-uppercase">
                    {pageTitle && pageTitle}
                  </h2>
                  <span>
                    Swap platform on Sui blockchain. Every XP you get in CREW3
                    can be used to redeem Suiswap token airdrops
                  </span>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      width: "30%",
                      marginTop: "1rem",
                    }}
                  >
                    <img src={discord.src} alt="social icon" />
                    <img src={linkedin.src} alt="social icon" />
                    <img src={medium.src} alt="social icon" />
                    <img src={twitter.src} alt="social icon" />
                    <img src={telegram.src} alt="social icon" />
                  </div>
                  <div style={{ marginTop: "1rem" }}>
                    <Stack direction="row" spacing={1}>
                      <CustomChip label="Onboarding" variant="outlined" />
                      <CustomChip label="Special" variant="outlined" />
                      <CustomChip label="Gift" variant="outlined" />
                      <CustomChip label="Join" variant="outlined" />
                      <CustomChip label="Invites" variant="outlined" />
                      <CustomChip label="Boost" variant="outlined" />
                      <CustomChip label="Quiz" variant="outlined" />
                      <CustomChip label="Twitter" variant="outlined" />
                      <CustomChip label="Follow" variant="outlined" />
                      <CustomChip label="Friend" variant="outlined" />
                    </Stack>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageHeaderStyleWrapper>
  );
};

export default PageHeaderV1;

const CustomChip = MuiStyled(Chip)({
  color: "white",
});

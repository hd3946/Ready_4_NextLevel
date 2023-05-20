import boost from "@assets/images/icons/boost.svg";
import download from "@assets/images/icons/download.svg";
import chemist from "@assets/images/icons/chemist.svg";
import Layout from "@components/layout";
import SEO from "@components/SEO";
import { Typography } from "@mui/material";
import MissionCard from "@sections/ProjectPages/ProjectsGrid/MissionCard";
import PageHeaderV1 from "@sections/ProjectPages/ProjectsList/PageHeader/PageHeaderV1";
import { Fragment } from "react"; 
import { useModal } from "src/utils/ModalContext";
import TwitterModal from "@components/modal/twitterModal"

export default function mission() {  
  return (
    <Fragment>
      <SEO title="NextLevel" />
      <TwitterModal />
      <Layout> 
        <PageHeaderV1 currentPage="PROJECTS" pageTitle="Near_Protocol" />
        <div
          className="col-lg-12"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }} 
        >
          <Typography sx={{ color: "purple", fontSize: "20px" }}>
            #Onboarding
          </Typography>
          <div style={{ display: "flex" }}>
            <MissionCard data={boost} missionTitle={"Mission 1. Visit the homepage"}/>
            <MissionCard data={download} missionTitle={"Mission 2. Follow Tweeter"}/>
            <MissionCard data={chemist} missionTitle={"Accessing the Telegram Channel for Mission 3"}/>
          </div>
        </div>

        <div
          className="col-lg-12"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography sx={{ color: "yellow", fontSize: "20px" }}>
            #Special
          </Typography>

          <div style={{ display: "flex" }}>
            <MissionCard data={boost} />
            <MissionCard data={download} />
            <MissionCard data={chemist} />
          </div>
        </div>
      </Layout>
    </Fragment>
  );
}

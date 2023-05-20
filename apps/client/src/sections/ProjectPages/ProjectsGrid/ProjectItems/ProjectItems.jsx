import projectData from "@assets/data/projects/dataV7";
import nextArrowIcon from "@assets/images/icons/next-arrow.png";
import coinIcon4 from "@assets/images/project/chain.png";
import coinIcon1 from "@assets/images/project/previous-image.png";
import coinIcon2 from "@assets/images/project/previous-image2.png";
import coinIcon3 from "@assets/images/project/previous-image3.png";
import Link from "next/link";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import ProjectCard from "../ProjectCard/ProjectCard";
import ProjectItemsStyleWrapper from "./ProjectItems.style";

const ProjectItems = () => {
  const { data } = projectData;
  return (
    <ProjectItemsStyleWrapper>
      <div className="container">
        <div className="single-project-row">
          <Tabs>
            <TabList>
              <div className="tab_btn_wrapper">
                {data?.map((child, i) => (
                  <Tab key={i}>
                    <button>{child.projectStatus}</button>
                  </Tab>
                ))}
              </div>

              <div className="item_sorting_list">
                <button>
                  All
                  <img src={nextArrowIcon.src} alt="icon" />
                  <ul className="sub-menu">
                    <li>NFT</li>
                    <li>Art</li>
                    <li>DAO</li>
                    <li>DeFi</li>
                    <li>Metaverse</li>
                  </ul>
                </button>
                <button>
                  All Block Chain
                  <img src={nextArrowIcon.src} alt="icon" />
                  <ul className="sub-menu">
                    <li>
                      <img src={coinIcon1.src} alt="icon" /> Binance (BSC)
                    </li>
                    <li>
                      <img src={coinIcon2.src} alt="icon" /> Ethereum (ETH)
                    </li>
                    <li>
                      <img src={coinIcon3.src} alt="icon" /> Polygon
                    </li>
                    <li>
                      <img src={coinIcon4.src} alt="icon" /> All Block Chain
                    </li>
                  </ul>
                </button>
              </div>
            </TabList>

            {data?.map((items, i) => (
              <TabPanel key={i} className="row tabs-row">
                {items.projects?.map((project, i) => (
                  <div key={i} className="col-lg-4 col-md-6">
                    <Link href="/mission" key={i}>
                      <ProjectCard key={i} {...project} />
                    </Link>
                  </div>
                ))}
              </TabPanel>
            ))}
          </Tabs>
        </div>
      </div>
    </ProjectItemsStyleWrapper>
  );
};

export default ProjectItems;

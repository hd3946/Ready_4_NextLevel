import CardHover from "@components/cardHover";
import PersonIcon from "@mui/icons-material/Person";
import PublicIcon from "@mui/icons-material/Public";
import RecommendIcon from "@mui/icons-material/Recommend";
import TwitterIcon from "@mui/icons-material/Twitter";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import Link from "next/link";
import ProjectCardStyleWrapper from "./ProjectCard.style";

const ProjectCard = ({
  thumb,
  title,
  price,
  saleEnd,
  coinIcon,
  projectDetails,
  socialLinks,
}) => {
  return (
    <ProjectCardStyleWrapper className="project_item_wrapper"> 
      <div className="project-info d-flex">
        <img src={thumb.src} alt="project thumb" /> 
        <div className="project-auother">
          <h4 className="mb-10">
            <span href="/projects-details-1">{title}</span>
          </h4>
          {/* <div className="dsc">PRICE (GAC) = {price}</div> */}
        </div>
      </div>
      <div className="project-content">
        <div className="project-header d-flex justify-content-between align-items-center">
          <div className="heading-title">
            <h4>{saleEnd} Days Left</h4>
          </div>
          <div className="project-icon">
            <img src={coinIcon.src} alt="coin icon" width={50} height={50} />
          </div>
        </div>
        <ul className="project-listing">
          {projectDetails[0].title} <span>{projectDetails[0].text}</span>
          <div>
            <Stack direction="row" spacing={1}>
              <Chip icon={<PersonIcon />} color="primary" label="1217.7k" />
              <Chip icon={<RecommendIcon />} label="102" color="primary" />
              <Chip icon={<TwitterIcon />} label="0" color="primary" />
              <Chip icon={<PublicIcon />} color="primary" />
            </Stack>
          </div>
        </ul>

        <div className="social-links">
          {socialLinks?.map((profile, i) => (
            <Link key={i} href={profile.url}>
              <img src={profile.icon.src} alt="social icon" />
            </Link>
          ))}
        </div>
      </div>

      <CardHover />
    </ProjectCardStyleWrapper>
  );
};

export default ProjectCard;

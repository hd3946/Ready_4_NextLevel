import Button from "@components/button";
import BannerStyleWrapper from "./Banner.style";
import Link from "next/link"
import bannerIcon from "@assets/images/icons/icon1.png";

const Banner = () => {
  return (
    <>
      <BannerStyleWrapper>
        <div className="container">
          <div className="banner-content text-center">
            <img
              src={bannerIcon.src}
              className="banner-icon"
              alt="banner icon"
            />
            <h1 className="banner-title">
              Hack the NEAR
            </h1>
            <div className="description">
              Create without Limits
            </div>
            <Link href="/projects-grid"> 
            <Button href="/projects-grid" variant="mint" md isCenter className="banner-btn">
              Start
            </Button>
            </Link>
          </div>
        </div>
      </BannerStyleWrapper>
    </>
  );
};

export default Banner;

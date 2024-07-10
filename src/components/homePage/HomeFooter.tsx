import { BsInstagram } from "react-icons/bs";
import { FaFacebookF, FaXTwitter } from "react-icons/fa6";
import { IoLogoYoutube } from "react-icons/io5";
import { useLocation } from "react-router-dom";
import { Button } from "../ui/button";
import footerLogoImage from "@/assets/images/FooterLogo.png";
import homeFooterLogo from "@/assets/images/HomeFooterLogo.png";
import RoundLogoImage from "@/assets/images/RoundLogo.png";

const HomeFooter = () => {
  const location = useLocation();

  const isHomePage = () => {
    return location.pathname === "/";
  };
  return (
    <div className="relative">
      <footer className="xl:max-w-[1160px] max-w-full mx-auto xl:px-0 px-5 flex justify-center items-end footerAfter">
        {isHomePage() && (
          <div className="h-[230px] absolute bottom-0 bg-[#71B2C9] lg:block hidden"></div>
        )}
        <div className="w-[1162px] bg-[#002A3A] z-[999] rounded-tl-[20px] rounded-tr-[20px] text-center">
          <div className="flex sm:gap-x-[33px] xl:ml-8 ml-0 xl:mt-[44px] mt-6 xl:justify-normal justify-center">
            <div className="relative">
              {/* <img
                className="xl:w-[951px] w-[810px] h-[84px] md:block hidden"
                src="../assets/img/network-group.png"
              /> */}
              <div className="flex justify-center items-center rounded-xl bg-white gap-3 w-[951px] h-[84px]">
                <div>
                  <p className="w-[300px] leading-4 text-justify text-sm text-[#002A3A] text-semibold">
                    Skillnet Ireland is funded from the National Training Fund
                    through the Department of Further and Higher Education,
                    Research, Innovation and Science.
                  </p>
                </div>
                <div>
                  <img src={footerLogoImage} alt="footer logo" />
                </div>
                <div>
                  <img src={homeFooterLogo} alt="" />
                </div>
                <div className="flex items-center">
                  <div>
                    <img src={RoundLogoImage} alt="round logo" />
                  </div>
                  <div>
                    <h6 className="text-base font-bold text-[#002A3A] text-left leading-4">
                      Co-funded by
                      <br />
                      the European Union
                    </h6>
                  </div>
                </div>
              </div>
              <div className="secondary-text flex justify-between items-center py-3">
                <p className="no-underline text-sm leading-5 font-abhaya font-bold">
                  © County Wexford Chamber 2023. All Rights Reserved.
                </p>

                <div className="flex gap-5  justify-center my-3">
                  <Button
                    variant={"ghost"}
                    className="w-[19px] h-[19px] p-0 hover:bg-transparent hover:text-white"
                  >
                    <FaXTwitter className="w-[19px] h-[19px]" />
                  </Button>
                  <Button
                    variant={"ghost"}
                    className="w-[19px] h-[19px] p-0 hover:bg-transparent hover:text-white"
                  >
                    <BsInstagram className="w-[19px] h-[19px]" />
                  </Button>
                  <Button
                    variant={"ghost"}
                    className="w-[19px] h-[19px] p-0 hover:bg-transparent hover:text-white"
                  >
                    <FaFacebookF className="w-[19px] h-[19px]" />
                  </Button>
                  <Button
                    variant={"ghost"}
                    className="w-[19px] h-[19px] p-0 hover:bg-transparent hover:text-white"
                  >
                    <IoLogoYoutube className="w-[19px] h-[19px]" />
                  </Button>
                </div>
              </div>
            </div>

            <ul className=" text-white flex flex-col  gap-y-[3px] text-start secondary-text">
              <a className="font-abhaya text-base font-bold cursor-pointer leading-5">
                Our Courses
              </a>
              <a className="font-abhaya text-base font-bold cursor-pointer leading-5">
                Membership
              </a>
              <a className="font-abhaya text-base font-bold cursor-pointer leading-5">
                Testimonial
              </a>
              <a className="font-abhaya text-base font-bold cursor-pointer leading-5">
                News
              </a>
              <a className="font-abhaya text-base font-bold cursor-pointer leading-5">
                Contact Us
              </a>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomeFooter;

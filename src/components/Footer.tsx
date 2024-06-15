import { FaFacebookF, FaXTwitter } from "react-icons/fa6";
import { BsInstagram } from "react-icons/bs";
import { IoLogoYoutube } from "react-icons/io5";
import { useLocation } from "react-router-dom";

function Footer() {
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
          <div className="flex items-end sm:gap-x-[33px] xl:ml-8 ml-0 xl:mt-9 mt-6 xl:justify-normal justify-center">
            <div className="relative">
              <img
                className="xl:w-[961px] w-[810px] h-[97px] md:block hidden"
                src="../assets/img/network-group.png"
              />
              <div className="absolute bottom-0 left-0 xl:w-[970px] w-[810px] h-0.5 top-[120px] secondary-background"></div>
            </div>

            <ul className=" text-white flex flex-col justify-center  gap-y-[3px] text-start secondary-text">
              <a className="font-calibri text-lg font-normal">Our Courses</a>
              <a className="font-calibri text-lg font-normal">Membership</a>
              <a className="font-calibri text-lg font-normal">Testimonial</a>
              <a className="font-calibri text-lg font-normal">News</a>
              <a className="font-calibri text-lg font-normal">Contact Us</a>
            </ul>
          </div>

          <div className="secondary-text xl:mt-[90px] mt-[80px]">
            <ul className="no-underline text-sm leading-5 font-calibri font-normal">
              © County Wexford Chamber 2023. All Rights Reserved.
            </ul>

            <div className="flex gap-5  justify-center xl:mt-7 mt-5 xl:mb-14 mb-12">
              <FaXTwitter className="w-[19px] h-[19px]" />
              <BsInstagram className="w-[19px] h-[19px]" />
              <FaFacebookF className="w-[19px] h-[19px]" />
              <IoLogoYoutube className="w-[19px] h-[19px]" />
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Footer;

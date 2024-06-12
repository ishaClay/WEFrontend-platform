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
    <footer className=" max-w-[1500px] relative flex justify-center items-end ">
      {isHomePage() && (
        <div className="h-[230px] absolute bottom-0 bg-[#71B2C9] lg:block hidden"></div>
      )}
      <div className="w-[1162px] h-[380px] bg-[#002A3A] z-[999] rounded-tl-[20px] rounded-tr-[20px] text-center">
        <div className="flex items-end sm:gap-x-[33px] md:ml-[32px] mt-[38px] md:justify-normal justify-center ">
          <div className="relative">
            <img
              className="xl:w-[961px] w-[810px] h-[97px] md:block hidden"
              src="../assets/img/network-group.png"
            />
            <div className="absolute bottom-0 left-[12px] w-[940px] h-0.5 top-[120px] secondary-background"></div>
          </div>

          <ul className=" text-white flex flex-col justify-center  gap-y-[3px] text-start secondary-text">
            <a>Our Courses</a>
            <a>Membership</a>
            <a>Testimonial</a>
            <a>News</a>
            <a>Contact Us</a>
          </ul>
        </div>

        <div className="secondary-text mt-[90px]">
          <ul className="no-underline sm:text-[14px] text-[10px] traking-[-4%] leading-[142%]">
            © County Wexford Chamber 2023. All Rights Reserved.
          </ul>

          <div className="flex gap-[18.27px]  justify-center mt-[30px]">
            <FaXTwitter className="w-[19px] h-[19px]" />
            <BsInstagram className="w-[19px] h-[19px]" />
            <FaFacebookF className="w-[19px] h-[19px]" />
            <IoLogoYoutube className="w-[19px] h-[19px]" />
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

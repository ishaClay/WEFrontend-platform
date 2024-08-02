import { Link } from "react-router-dom";
import GradientHeading from "./ourServices/GradientHeading";
import HomeHeader from "./homePage/HomeHeader";
import HomeFooter from "./homePage/HomeFooter";
import { Headset, MailCheck, NotebookTabs, PhoneCall } from "lucide-react";

const Contact = () => {
  return (
    <>
      <HomeHeader />
      <div className="lg:my-10 sm:my-5 my-0 xl:max-w-[1160px] max-w-full w-full mx-auto xl:px-0 px-4 py-7 min-h-[485px]">
        <div className="relative">
          <GradientHeading
            headings="Contact us"
            blacktext="Get in"
            pinktext="Touch"
          />
        </div>
        <div className="grid grid-cols-1 gap-[20px] lg:grid-cols-4 sm:grid-cols-2">
          <div className="card p-3 text-center mb-2 flex flex-col justify-center items-center h-[160px] shadow relative">
            <NotebookTabs />
            <h1 className="text-xl text-center leading-[19px] font-[700] font-calibri mb-[5px] pt-3 text-primary-button">
              Address
            </h1>
            <p className="text-base text-center leading-[21px] font-medium mt-[5px]">
              1105 W Peachtree St NW, Atlanta, GA 30309, United States
            </p>
            <img
              src="/src/assets/images/Ellipse1.png"
              alt="ellipse"
              className="absolute bottom-0 left-0 sm:block hidden"
            />
            <img
              src="/src/assets/images/Ellipse2.png"
              alt="ellipse"
              className="absolute top-0 right-0 sm:block hidden"
            />
            <img
              src="/src/assets/images/Ellipse3.png"
              alt="ellipse"
              className="absolute top-0 right-0 sm:block hidden"
            />
          </div>

          <div className="card p-3 text-center mb-2 flex flex-col justify-center items-center h-[160px] shadow relative">
            <PhoneCall />
            <h1 className="text-xl text-center leading-[19px] font-[700] font-calibri mb-[5px] pt-3 text-primary-button">
              Cell Phone
            </h1>
            <Link
              to="tel:(86) 13590328341"
              className="text-base text-center leading-[21px] font-medium mt-[5px]"
            >
              +14704306404
            </Link>
            <img
              src="/src/assets/images/Ellipse1.png"
              alt="ellipse"
              className="absolute bottom-0 left-0 sm:block hidden"
            />
            <img
              src="/src/assets/images/Ellipse2.png"
              alt="ellipse"
              className="absolute top-0 right-0 sm:block hidden"
            />
            <img
              src="/src/assets/images/Ellipse3.png"
              alt="ellipse"
              className="absolute top-0 right-0 sm:block hidden"
            />
          </div>

          <div className="card p-3 text-center mb-2 flex flex-col justify-center items-center h-[160px] shadow relative">
            <Headset />
            <h1 className="text-xl text-center leading-[19px] font-[700] font-calibri mb-[5px] pt-3 text-primary-button">
              Telephone
            </h1>
            <Link
              to="tel:86-755-8212 4051"
              className="text-base text-center leading-[21px] font-medium mt-[5px]"
            >
              +1 (470) 919-8100
            </Link>
            <img
              src="/src/assets/images/Ellipse1.png"
              alt="ellipse"
              className="absolute bottom-0 left-0 sm:block hidden"
            />
            <img
              src="/src/assets/images/Ellipse2.png"
              alt="ellipse"
              className="absolute top-0 right-0 sm:block hidden"
            />
            <img
              src="/src/assets/images/Ellipse3.png"
              alt="ellipse"
              className="absolute top-0 right-0 sm:block hidden"
            />
          </div>

          <div className="card p-3 text-center mb-2 flex flex-col justify-center items-center h-[160px] shadow relative">
            <MailCheck />
            <h1 className="text-xl text-center leading-[19px] font-[700] font-calibri mb-[5px] pt-3 text-primary-button">
              Email Id
            </h1>
            <Link
              to="mailto:info@oenashipping.com"
              className="text-base text-center leading-[21px] font-medium mt-[5px]"
            >
              info@oenashipping.com
            </Link>
            <img
              src="/src/assets/images/Ellipse1.png"
              alt="ellipse"
              className="absolute bottom-0 left-0 sm:block hidden"
            />
            <img
              src="/src/assets/images/Ellipse2.png"
              alt="ellipse"
              className="absolute top-0 right-0 sm:block hidden"
            />
            <img
              src="/src/assets/images/Ellipse3.png"
              alt="ellipse"
              className="absolute top-0 right-0 sm:block hidden"
            />
          </div>
        </div>
      </div>
      <HomeFooter />
    </>
  );
};

export default Contact;

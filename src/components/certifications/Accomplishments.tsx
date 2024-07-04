import image from "@/assets/images/EmillaAnderson.png";
import frameImage from "@/assets/images/Frame.png";
import { Button } from "../ui/button";
const Accomplishments = () => {
  return (
    <>
      <div className="lg:bg-white bg-transparent rounded-xl">
        <div className="grid grid-cols-9 bg-white sm:p-5 p-[15px] rounded-lg sm:gap-5 gap-[15px]">
          <div className="xl:col-span-4 col-span-9">
            <div className="flex shadow rounded-lg border border-[#dddddd33] xl:p-5 sm:p-4 p-2.5">
              <div className="sm:min-w-[100px] sm:w-[100px] sm:min-h-[100px] sm:h-[100px] min-w-[50px] min-h-[50px] w-[50px] h-[50px]">
                <img src={image} alt="" className="w-full h-full" />
              </div>
              <div className="sm:pl-[15px] pl-[10px]">
                <h5 className="xl:text-lg md:text-base text-sm font-semibold font-inter leading-[22px]">
                  Emilla Anderson
                </h5>
                <p className="sm:text-sm text-xs font-normal font-inter leading-4 sm:pt-3 pt-[10px]">
                  Certificate in the Sustainable Development Goals, Partnership,
                  People, Planet and Prosperity
                </p>
                <div className="flex items-center sm:text-sm text-xs font-normal font-inter leading-4 sm:pt-3 pt-[10px]">
                  <p>Started : </p>
                  <span>1 Mar, 2024</span>
                </div>
                <div className="flex items-center sm:text-sm text-xs font-normal font-inter leading-4 sm:pt-3 pt-[10px]">
                  <p>Completed : </p>
                  <span>15 Apr, 2024</span>
                </div>
                <div className="flex items-center sm:text-sm text-xs font-normal font-inter leading-4 sm:pt-3 pt-[10px]">
                  <p>Sustainability Level : </p>
                  <span className="font-semibold">Intermediate</span>
                </div>
              </div>
            </div>
          </div>
          <div className="xl:col-span-5 col-span-9 ml-auto mr-0 w-full">
            <div className="xl:h-[400px] md:h-[320px] h-[200px] flex justify-center items-center bg-[#F5F5F5] rounded-lg">
              <img
                src={frameImage}
                alt=""
                className="sm:w-[70px] w-[48px] sm:h-[70px] h-[48px]"
              />
            </div>
            <div className="md:text-right text-center sm:pt-5 pt-[15px]">
              <Button className="sm:uppercase capitalize bg-[#00778B] sm:text-base text-sm font-normal font-calibri leading-5 py-[8px] h-auto w-auto sm:px-[19px] px-[12px]">
                download certificate
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Accomplishments;

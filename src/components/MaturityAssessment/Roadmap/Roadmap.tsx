import Assign from "./Assign";
import SetTarget from "./SetTarget";

const Roadmap = () => {
  return (
    <div className="">
      <div className="mt-4 flex justify-between items-center mb-12 relative">
        <div className="flex items-center text-white relative">
          <div className="rounded-full sm:h-[32px] sm:w-[32px] h-[30px] w-[30px] flex items-center justify-center bg-[#D9D9D9]">
            <div className="text-base text-[#606060] font-calibri">1</div>
          </div>
          <div className="absolute top-0 md:ml-[-50px] text-center mt-8 md:w-[300px] sm:text-base text-sm font-medium text-[#000000]">
            Set Target
            <span className="hidden md:inline text-[12px] text-[#D9D9D9] ">
              {" "}
              (select the required pillars)
            </span>
          </div>
        </div>
        <div className="flex items-center text-gray-500 relative">
          <div className="rounded-full sm:h-[32px] sm:w-[32px] h-[30px] w-[30px] flex items-center justify-center bg-[#D9D9D9]">
            <div className="text-base text-[#606060] font-calibri">2</div>
          </div>
          <div className="absolute top-0 ml-[-50px] text-center mt-8 w-40 sm:text-base text-sm font-medium text-[#000000] ">
            Define Action Item
          </div>
        </div>
        <div className="flex items-center relative">
          <div className="rounded-full sm:h-[32px] sm:w-[32px] h-[30px] w-[30px] flex items-center justify-center bg-[#D9D9D9]">
            <div className="text-base text-[#606060] font-calibri">3</div>
          </div>
          <div className="absolute top-0 ml-[-10px] text-center mt-8  sm:text-base text-sm font-medium text-[#000000]">
            Assign
          </div>
        </div>
        <div className="w-full h-[1px] bg-[#D9D9D9] absolute top-0 bottom-0 left-0 right-0 m-auto z-0"></div>
      </div>
      {/* <Assign /> */}
      <SetTarget />
    </div>
  );
};

export default Roadmap;

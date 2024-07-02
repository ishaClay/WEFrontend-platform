import { Star, Users } from "lucide-react";

const Information = () => {
  return (
    <div>
      <div className="mb-5">
        <h5 className="font-bold font-nunito xl:text-xl sm:text-lg text-sm text-black pb-2">
          The standard Lorem Ipsum passage, used since the 1500s
        </h5>
        <p className="xl:text-base md:text-sm text-xs text-black font-nunito">
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum."
        </p>
      </div>
      <div className="mb-10">
        <h5 className="font-bold font-nunito xl:text-xl sm:text-lg text-sm text-black pb-2">
          The standard Lorem Ipsum passage, used since the 1500s
        </h5>
        <p className="xl:text-base md:text-sm text-xs text-black font-nunito">
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum."
        </p>
      </div>
      <div className="md:flex block items-center md:gap-8 gap-0">
        <div className="flex items-center md:mb-0 mb-4 gap-5">
          <div className="h-[42px] w-[42px] bg-[#F5F7FF] rounded-full flex items-center justify-center">
            <Users className="text-[#00778B]" />
          </div>
          <div className="">
            <h5 className="text-base font-nunito font-bold text-black pb-1">
              1000+
            </h5>
            <h6 className="text-xs text-black font-nunito">
              Delegates Enrolled
            </h6>
          </div>
        </div>
        <div className="flex items-center gap-5">
          <div className="h-[42px] w-[42px] bg-[#F5F7FF] rounded-full flex items-center justify-center">
            <Star className="text-[#00778B]" />
          </div>
          <div className="">
            <h5 className="text-base font-nunito font-bold text-black pb-1">
              1000+{" "}
              <span className="font-normal text-xs">(950 People like)</span>
            </h5>
            <h6 className="text-xs text-black font-nunito">
              Delegates Enrolled
            </h6>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Information;

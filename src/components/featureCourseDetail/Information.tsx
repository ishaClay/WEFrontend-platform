import { Star, Users } from "lucide-react";

const Information = ({ data }: any) => {
  return (
    <div>
      <div className="mb-5 py-5">
        <h5 className="font-bold font-droid xl:text-xl sm:text-lg text-sm text-black pb-2">
          Information
        </h5>
        <span
          className="xl:text-base md:text-sm text-xs text-black font-droid"
          dangerouslySetInnerHTML={{ __html: data?.description }}
        ></span>
        <h5 className="font-bold font-droid xl:text-xl sm:text-lg text-sm text-black py-2 ">
          Key Outcomes
        </h5>
        <span
          className="xl:text-base md:text-sm text-xs text-black font-droid block"
          dangerouslySetInnerHTML={{ __html: data?.keys }}
        ></span>
      </div>
      <div className="md:flex block items-center md:gap-8 gap-0">
        <div className="flex items-center md:mb-0 mb-4 gap-5">
          <div className="h-[42px] w-[42px] bg-[#F5F7FF] rounded-full flex items-center justify-center">
            <Users className="text-[#00778B]" />
          </div>
          <div className="">
            <h5 className="text-base font-droid font-bold text-black pb-1">
              {data?.courseEnroll}
            </h5>
            <h6 className="text-xs text-black font-droid">
              Delegates Enrolled
            </h6>
          </div>
        </div>
        <div className="flex items-center gap-5">
          <div className="h-[42px] w-[42px] bg-[#F5F7FF] rounded-full flex items-center justify-center">
            <Star className="text-[#00778B]" />
          </div>
          <div className="">
            <h5 className="text-base font-droid font-bold text-black pb-1">
              {data?.feedBack?.avgRate}/5{" "}
              <span className="font-normal text-xs">
                ({data?.feedBack?.peopleLikeCount} People like)
              </span>
            </h5>
            <h6 className="text-xs text-black font-droid">
              Delegates Enrolled
            </h6>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Information;

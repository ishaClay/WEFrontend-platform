import { Progress } from "../ui/progress";

type recentCourseItemProps = {
  data: {
    image: string;
    title: string;
    subTitle: string;
    progressCount: number;
    progressDes: string;
  };
};

const RecentCoursesItems = ({ data }: recentCourseItemProps) => {
  return (
    <div className="col-span-1 sm:p-5 p-0 shadow rounded-md lg:m-0 m-1">
      <div className="sm:flex block items-center">
        <div className="rounded-md overflow-hidden sm:min-w-[200px] sm:min-h-[200px] sm:w-[200px] w-full sm:h-[200px] sm:m-0 m-auto">
          <img src={data.image} alt="img" className="h-full" />
        </div>
        <div className="sm:ps-5 sm:p-0 p-4">
          <h6 className="text-base text-black font-nunito pb-2 font-normal">
            {data.subTitle}
          </h6>
          <h5 className="text-base font-medium text-black font-inter pb-2">
            {data.title}
          </h5>
          <span className="text-[#00778B] font-bold text-[26px] font-calibri">
            {data.progressCount}%
          </span>
          <Progress
            color="#00778B"
            value={data.progressCount}
            className="h-[8px] w-full rounded-full mb-2"
          />
          <p className="text-base font-nunito text-black font-normal">
            {data.progressDes}
          </p>
        </div>
      </div>
    </div>
  );
};

export default RecentCoursesItems;

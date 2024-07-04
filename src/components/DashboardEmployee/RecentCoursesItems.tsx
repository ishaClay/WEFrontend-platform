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
    <div className="col-span-1 p-5 shadow rounded-md">
      <div className="sm:flex block items-center sm:text-left text-center">
        <div className="rounded-md overflow-hidden min-w-[200px] min-h-[200px] w-[200px] h-[200px] sm:m-0 m-auto">
          <img src={data.image} alt="img" className="h-full" />
        </div>
        <div className="sm:ps-5 pt-5">
          <h6 className="sm:text-base text-sm text-black font-nunito pb-2 font-normal">
            {data.subTitle}
          </h6>
          <h5 className="sm:text-base text-sm font-medium text-black font-inter pb-2">
            {data.title}
          </h5>
          <span className="text-[#00778B] font-bold sm:text-[26px] text-[24px] font-calibri">
            {data.progressCount}%
          </span>
          <Progress
            color="#00778B"
            value={data.progressCount}
            className="h-[8px] w-full rounded-full mb-2"
          />
          <p className="sm:text-base text-sm font-nunito text-black font-normal">
            {data.progressDes}
          </p>
        </div>
      </div>
    </div>
  );
};

export default RecentCoursesItems;

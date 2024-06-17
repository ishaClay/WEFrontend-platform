import CourseList from "@/components/comman/CourseList";
import { Badge } from "@/components/ui/badge";

type courseListItemsProps = {
  data: {
    image: string;
    rating: number;
    title: string;
    trainer: string;
    enrolledComany: number;
    enrolledEmployees: number;
  };
};
const EnrolledCourseListItem = ({ data }: courseListItemsProps) => {
  return (
    <div className="">
      <div className="flex">
        <div className="">
          <img
            src={data.image}
            alt=""
            className="w-[152px] xl:h-[152px] h-[100px] rounded-md overflow-hidden"
          ></img>
        </div>
        <div className="text-left ps-6">
          <div className="flex items-cent+er xl:pb-5 pb-3">
            <CourseList rating={data.rating} />
            <Badge
              variant="outline"
              className="bg-[#FFD56A] p-1 px-3 text-[#3A3A3A] text-xs mx-2 font-Poppins font-normal"
            >
              Technology & Innovation
            </Badge>
            <Badge
              variant="outline"
              className="bg-[#D6F5AC] p-1 px-3 text-[#3A3A3A] text-xs font-Poppins font-normal"
            >
              Social
            </Badge>
          </div>
          <h5 className="text-[#1D2026] font-bold mb-3 text-base">
            {data.title}
          </h5>
          <h6 className="pb-2 flex font-calibri text-base text-[#1D2026]">
            <span>Trainer :</span>
            {data.trainer}
          </h6>
          <div className="flex items-center">
            <div className="pe-5 flex">
              <span className="text-base text-[#1D2026] font-calibri">
                Enrolled Companies :
              </span>
              <span className="text-base text-[#1D2026] font-calibri font-bold">
                {data.enrolledComany}
              </span>
            </div>
            <div className="flex">
              <span className="text-base text-[#1D2026] font-calibri">
                Enrolled Employees :
              </span>
              <span className="text-base text-[#1D2026] font-calibri font-bold">
                {data.enrolledEmployees}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnrolledCourseListItem;

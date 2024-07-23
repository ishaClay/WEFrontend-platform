/* eslint-disable no-unsafe-optional-chaining */
import { EmployeeEntityResult } from "@/types/Invition";
import CustomCarousel from "../comman/CustomCarousel";
import ActionItemsList from "./ActionItemsList";
import EnrolledCourses from "./EnrolledCourses";

type ProgressList = {
  data: EmployeeEntityResult;
};

const TeamProgresslistInner = ({ data }: ProgressList) => {
  return (
    <div className="grid xl:grid-cols-2 grid-cols-1 gap-[30px] pt-5 border-t border-[#D9D9D9]">
      <div className="col-span-1 rounded-xl border border-[#D9D9D9]">
        <div className="py-3 px-4 border-b border-[#D9D9D9]">
          <h5 className="text-base font-abhaya text-black font-semibold">
            Action Items
          </h5>
        </div>
        <div id="scrollStyle" className="max-h-[344px] overflow-auto">
          {data?.measure &&
            data?.measure.map((itm, index) => {
              return <ActionItemsList key={index} data={itm} />;
            })}
        </div>
      </div>
      <div className="col-span-1 rounded-xl border border-[#D9D9D9]">
        <div className="py-3 px-4 border-b border-[#D9D9D9]">
          <h5 className="text-base font-abhaya text-black font-semibold">
            Enrolled Courses
          </h5>
        </div>
        <div className="sm:px-5 sm:py-20 p-[15px]">
          <CustomCarousel containerClassName="">
            {(data?.courseAlloted ? data?.courseAlloted : []).map(
              (data, index) => {
                return <EnrolledCourses key={index} data={data} />;
              }
            )}
          </CustomCarousel>
        </div>
      </div>
    </div>
  );
};

export default TeamProgresslistInner;

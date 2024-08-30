/* eslint-disable no-unsafe-optional-chaining */
import CustomCarousel from "../comman/CustomCarousel";
import ActionItemsList from "./ActionItemsList";
import EnrolledCourses from "./EnrolledCourses";

const TeamProgresslistInner = ({ data }: any) => {
  return (
    <div className="grid xl:grid-cols-2 grid-cols-1 gap-[30px] pt-5 border-t border-[#D9D9D9]">
      <div className="col-span-1 rounded-xl border border-[#D9D9D9]">
        <div className="py-3 px-4 border-b border-[#D9D9D9]">
          <h5 className="text-base font-abhaya text-black font-semibold">
            Action Items
          </h5>
        </div>
        <div id="scrollStyle" className="max-h-[344px] overflow-auto">
          {(data?.measure?.length > 0)
            ? data?.measure?.map((itm: any, index: number) => {
                return <ActionItemsList key={index} data={itm} />;
              })
            : <div className="sm:px-5 sm:py-20 p-[15px] text-center">No Action Item Found</div>}
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
              (data: any, index: number) => {
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

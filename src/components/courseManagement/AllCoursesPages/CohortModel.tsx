/* eslint-disable @typescript-eslint/ban-ts-comment */
import { convertUTCToGMT } from "@/lib/utils";
import { AllCourse } from "@/types/allcourses";

const CohortModel = ({ isCohortShow }: { isCohortShow: AllCourse | null }) => {
  const getUpcommingCohort = (cohortData: AllCourse) => {
    function parseDate(year: string, month: string, date: string) {
      // Note: month is 0-based in JavaScript Date, so we subtract 1
      return new Date(`${year}-${month}-${date}`);
    }

    const upcomingItems =
      cohortData?.cohortGroups &&
      cohortData?.cohortGroups?.filter((item) => {
        const startDate = parseDate(
          item.slotStartDate?.year,
          item.slotStartDate?.month,
          item.slotStartDate?.date
        );

        // Check if the current date is within the start and end date range
        return convertUTCToGMT(startDate).isAfter(new Date());
      });

    const upcomingData = upcomingItems ? upcomingItems : [];

    return (
      <>
        {upcomingData?.length > 0 ? (
          upcomingData?.map((item, i) => {
            return (
              <div key={i}>
                <div className="rounded-[6px] py-[7px] px-[15px] my-[18px] border border-[#B6D8DF] bg-[#E4FBFF]">
                  <div className="pb-[6px]">
                    <p className="text-black text-xs">
                      <span className="font-medium text-base font-droid leading-5">
                        Cohort : {item?.name}
                      </span>
                    </p>
                  </div>
                  <div className="font-droid text-sm leading-3 text-[#000000] font-normal">
                    <span>Start Date : </span>
                    <span>
                      {`${item.slotStartDate.date
                        .toString()
                        .padStart(2, "0")}/${item?.slotStartDate?.month
                        .toString()
                        .padStart(2, "0")}/${item?.slotStartDate?.year}`}{" "}
                    </span>
                    <span>End Date : </span>
                    <span>{`${item.slotEndDate.date
                      .toString()
                      .padStart(2, "0")}/${item?.slotEndDate?.month
                      .toString()
                      .padStart(2, "0")}/${item?.slotEndDate?.year}`}</span>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="h-[100px] flex items-center justify-center">
            <p className="text-[18px] font-[600] font-droid">No Cohort</p>
          </div>
        )}
      </>
    );
  };

  return (
    <div>
      <h6 className="text-2xl font-bold font-droid leading-7">All Cohorts</h6>
      <div>{isCohortShow && getUpcommingCohort(isCohortShow)}</div>
    </div>
  );
};

export default CohortModel;

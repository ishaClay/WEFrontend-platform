import Loading from "@/components/comman/Error/Loading";
import NoDataText from "@/components/comman/NoDataText";
import { QUERY_KEYS } from "@/lib/constants";
import { getEmployeeWiseAction } from "@/services/apiServices/employee";
import { EmployeeActionResponse } from "@/types/employee";
import { useQuery } from "@tanstack/react-query";
import ActionItemsList from "./ActionItemsList";

const ActionItems = ({ selectAssessment }: { selectAssessment: string }) => {
  const userData = JSON.parse(localStorage.getItem("user") as string);
  const userID = userData?.query.detailsid;

  const { data, isLoading } = useQuery<EmployeeActionResponse>({
    queryKey: [QUERY_KEYS.getEmployeeWiseAcion, { selectAssessment }],
    queryFn: () => getEmployeeWiseAction(userID, selectAssessment),
  });

  return (
    <div>
      <div className="xl:flex block items-center gap-6 mb-5">
        <p className="text-[#606060] font-font-droid font-bold xl:mb-0 mb-3">
          All the action items that have been dedicated to you{" "}
        </p>
        <ul className="flex overflow-x-auto overflow-y-hidden items-center sm:gap-4 gap-2.5">
          <li className="text-center sm:min-w-[90px] min-w-[70px] py-2 text-xs font-font-droid bg-[#ddd] rounded-full font-semibold">
            Assigned
            <span className="block">{data?.data?.myActionItems?.assigned}</span>
          </li>
          <li className="text-center sm:min-w-[90px] min-w-[70px] py-2 text-xs text-white font-font-droid bg-[#F63636] rounded-full font-semibold">
            Delayed
            <span className="block">{data?.data?.myActionItems?.delayed}</span>
          </li>
          <li className="text-center sm:min-w-[90px] min-w-[70px] py-2 text-xs font-font-droid bg-[#FFD56A] rounded-full font-semibold">
            Ontime
            <span className="block">{data?.data?.myActionItems?.ontime}</span>
          </li>
          <li className="text-center sm:min-w-[90px] min-w-[70px] py-2 text-xs font-font-droid bg-[#64A70B] rounded-full font-semibold">
            Completed
            <span className="block">
              {data?.data?.myActionItems?.completed}
            </span>
          </li>
        </ul>
      </div>
      <div className="border border-[#D9D9D9] rounded-xl mb-10">
        {data?.data?.measureData?.length ? (
          data?.data?.measureData?.map((data, index) => {
            return <ActionItemsList data={data} key={index} />;
          })
        ) : (
          <NoDataText message="No Data Found" />
        )}
      </div>
      <Loading isLoading={isLoading} />
    </div>
  );
};

export default ActionItems;

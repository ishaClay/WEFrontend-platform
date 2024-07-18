import Loader from "@/components/comman/Loader";
import { QUERY_KEYS } from "@/lib/constants";
import { fetchEnrollmentRequest } from "@/services/apiServices/courseManagement";
import { useQuery } from "@tanstack/react-query";
import EnrollmentCourseListCard from "./EnrollmentCourseListCard";
import { useSelector } from "react-redux";

const EnrollmentCourseList = ({ status }: { status: string }) => {
  const statusparams = status === "0" ? "" : status;
  const { UserId } = useSelector((state: any) => state?.user);
  const { data: fetchEnrollRequestData, isPending: fetchEnrollRequestPending } =
    useQuery({
      queryKey: [QUERY_KEYS.fetchEnrollmentRequestBytrainer, status],
      queryFn: () => fetchEnrollmentRequest(UserId, statusparams),
    });

  return (
    <>
      <div>
        <div className="sm:pb-4 pb-0">
          {fetchEnrollRequestPending ? (
            <Loader />
          ) : (
            <>
              {fetchEnrollRequestData &&
              fetchEnrollRequestData.data.data?.length > 0 ? (
                fetchEnrollRequestData.data.data.map(
                  (data: any, index: number) => {
                    return <EnrollmentCourseListCard key={index} data={data} />;
                  }
                )
              ) : (
                <span className="text-center block py-10 text-xl">
                  No data found
                </span>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default EnrollmentCourseList;

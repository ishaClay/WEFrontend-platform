import Loader from "@/components/comman/Loader";
import { QUERY_KEYS } from "@/lib/constants";
import { fetchEnrollmentRequest } from "@/services/apiServices/courseManagement";
import { useQuery } from "@tanstack/react-query";
import EnrollmentCourseListCard from "./EnrollmentCourseListCard";

const EnrollmentCourseList = ({ status }: { status: string }) => {
  const statusparams = status === "0" ? "" : status;
  const { data: fetchEnrollRequestData, isPending: fetchEnrollRequestPending } =
    useQuery({
      queryKey: [QUERY_KEYS.fetchEnrollmentRequestBytrainer, status],
      queryFn: () => fetchEnrollmentRequest("596", statusparams),
    });

  return (
    <>
      <div>
        <div className="pb-4">
          {fetchEnrollRequestPending ? (
            <Loader />
          ) : (
            <>
              {fetchEnrollRequestData &&
                fetchEnrollRequestData.data.data.map(
                  (data: any, index: number) => {
                    return <EnrollmentCourseListCard key={index} data={data} />;
                  }
                )}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default EnrollmentCourseList;

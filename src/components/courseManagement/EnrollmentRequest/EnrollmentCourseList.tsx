import EnrollmentCourseListCard from "./EnrollmentCourseListCard";
import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/lib/constants";
import { fetchEnrollmentRequest } from "@/services/apiServices/courseManagement";

const EnrollmentCourseList = ({ status }: { status: string }) => {
  const { data: fetchEnrollRequestData, isPending: fetchEnrollRequestPending } =
    useQuery({
      queryKey: [QUERY_KEYS.fetchEnrollmentRequestBytrainer, status],
      queryFn: () => fetchEnrollmentRequest("11", status),
    });

  console.log(
    "fetchEnrollRequestData",
    fetchEnrollRequestData,
    fetchEnrollRequestPending
  );

  return (
    <>
      <div>
        <div className="bg-white">
          {fetchEnrollRequestData &&
            fetchEnrollRequestData.data.data.map((data: any, index: number) => {
              return <EnrollmentCourseListCard key={index} data={data} />;
            })}
        </div>
      </div>
    </>
  );
};

export default EnrollmentCourseList;

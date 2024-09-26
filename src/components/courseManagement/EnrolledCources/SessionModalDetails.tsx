/* eslint-disable @typescript-eslint/ban-ts-comment */
import Loader from "@/components/comman/Loader";
import NoDataText from "@/components/comman/NoDataText";
import { ScrollArea } from "@/components/ui/scroll-area";
import { getSingleLiveSession } from "@/services/apiServices/liveSession";
import { SingleLiveSession } from "@/types/liveSession";
import { useQuery } from "@tanstack/react-query";
import moment from "moment";
import SessionEmployeeItem from "./SessionEmployeeItem";

const SessionModalDetails = ({ id }: { id: number | null }) => {
  const { data, isLoading } = useQuery<SingleLiveSession>({
    queryKey: ["getSingleLiveSession", { id }],
    // @ts-ignore
    queryFn: () => getSingleLiveSession(id.toString() || "0"),
    enabled: !!id,
  });
  console.log("🚀 ~ SessionModalDetails ~ data:", data);

  const differenceInMillis = moment(data?.data?.startTime)
    .add(data?.data?.sessionDuration, "minutes")
    .diff(data?.data?.startTime);

  // Convert milliseconds to hours and minutes
  const duration = moment.duration(differenceInMillis);
  const hours = Math.floor(duration.asHours());
  const minutes = duration.minutes();

  return (
    <div>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="">
          <h3 className="text-2xl font-droid font-bold pb-5">Live Session</h3>
          <h5 className="pb-2.5 font-droid text-base font-bold">
            {data?.data?.subtitle}
          </h5>
          <h6 className="pb-2.5 font-droid text-base">
            {data?.data?.description}
          </h6>
          <h6 className="pb-2.5 font-droid text-base">
            Trainer :{" "}
            {data?.data?.trainerOrganization
              ? `${
                  data?.data?.trainerOrganization?.contactFirstName &&
                  data?.data?.trainerOrganization?.contactFirstName
                } ${
                  data?.data?.trainerOrganization?.contactSurname &&
                  data?.data?.trainerOrganization?.contactSurname
                }`
              : data?.data?.trainer?.name}
          </h6>
          <div className="flex pb-2.5">
            <h5 className="pe-5 text-[#606060] font-droid text-base">
              Start Date:{" "}
              <span className="text-black">
                {moment(data?.data?.startTime).format("DD-MM-YYYY")}
              </span>
            </h5>
            <h5 className="pe-5 text-[#606060] font-droid text-base">
              Start Time:{" "}
              <span className="text-black">
                {moment(data?.data?.startTime).format("hh:mm A")}
              </span>
            </h5>
            <h5 className="font-droid text-[#606060] text-base">
              Duration:{" "}
              <span className="text-black">
                {/* time2.diff(time1, 'minutes') */}
                {hours?.toString().padStart(2, "0")}:
                {minutes?.toString().padStart(2, "0")} Hours
              </span>
            </h5>
          </div>
          <h6 className="pb-5 font-droid text-base">
            Status : {data?.data?.status}
          </h6>
          <h4 className="pb-3 font-droid text-base font-bold">
            Employee Attendance
          </h4>
          <ScrollArea className="h-[300px]">
            {data?.data?.employee && data?.data?.employee?.length > 0 ? (
              data?.data?.employee?.map((data, index) => {
                return <SessionEmployeeItem key={index} data={data} />;
              })
            ) : (
              <NoDataText message="No Employee Found" />
            )}
          </ScrollArea>
        </div>
      )}
    </div>
  );
};

export default SessionModalDetails;

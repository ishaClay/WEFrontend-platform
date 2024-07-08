import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/lib/constants";
import { fetchSupportTicketCount } from "@/services/apiServices/supportRequestServices";
import { useSelector } from "react-redux";
import { cn, supportTicketIcon } from "@/lib/utils";
import Loader from "@/components/comman/Loader";

const SupportRequestDetails = () => {
  const { UserId } = useSelector((state: any) => state.user);

  const { data: support_request_count, isLoading } = useQuery({
    queryKey: [QUERY_KEYS.supportTicketCount],
    queryFn: () => fetchSupportTicketCount(UserId),
  });

  console.log("support_request_count", support_request_count);

  return (
    <>
      <div
        className={cn(
          `w-full grid xl:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-5`
        )}
      >
        {isLoading ? (
          <Loader />
        ) : (
          support_request_count?.data?.data &&
          Object.entries(support_request_count?.data?.data).map(
            ([key, value]: any) => (
              <div className="sm:h-[108px] h-[111px] border border-1px solid gray rounded-[6px] sm:flex block items-center sm:px-[20px] sm:py-[14px] p-[10px] gap-5 relative text-center">
                <div className="lg:w-[80px] lg:h-[80px] sm:w-[60px] sm:h-[60px] w-[40px] h-[40px] rounded-full bg-[#F5F7FF] flex items-center justify-center sm:m-0 m-auto">
                  <img
                    className="lg:max-w-[40px] sm:max-w-[30px] max-w-[24px]"
                    src={supportTicketIcon(key)}
                  />
                </div>
                <div>
                  <h2 className="font-[700] sm:text-[32px] text-[18px] sm:pb-2.5 pb-1">
                    +{value || 0}
                  </h2>
                  <h3 className="capitalize sm:text-base text-xs">{key}</h3>
                </div>
                <img
                  src="/src/assets/images/Ellipse1.png"
                  alt="ellipse"
                  className="absolute bottom-0 right-[10%] sm:block hidden"
                ></img>
                <img
                  src="/src/assets/images/Ellipse2.png"
                  alt="ellipse"
                  className="absolute top-0 right-0 sm:block hidden"
                ></img>
                <img
                  src="/src/assets/images/Ellipse3.png"
                  alt="ellipse"
                  className="absolute top-0 right-0 sm:block hidden"
                ></img>
              </div>
            )
          )
        )}
      </div>
    </>
  );
};

export default SupportRequestDetails;

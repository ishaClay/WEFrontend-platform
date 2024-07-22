import { cn, supportTicketIcon } from "@/lib/utils";
import { DataAnalytics } from "@/types/SupportRequest";

interface SupportRequestDetailsProps {
  data?: DataAnalytics;
}

const SupportRequestDetails = ({ data }: SupportRequestDetailsProps) => {
  return (
    <>
      <div
        className={cn(
          `w-full grid xl:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-5`
        )}
      >
        <div className="sm:h-[108px] h-[111px] border border-1px solid gray rounded-[6px] sm:flex block items-center sm:px-[20px] sm:py-[14px] p-[10px] gap-5 relative text-center">
          <div className="lg:w-[80px] lg:h-[80px] sm:w-[60px] sm:h-[60px] w-[40px] h-[40px] rounded-full bg-[#F5F7FF] flex items-center justify-center sm:m-0 m-auto">
            <img
              className="lg:max-w-[40px] sm:max-w-[30px] max-w-[24px]"
              src={supportTicketIcon("totalTickets")}
            />
          </div>
          <div>
            <h2 className="font-[700] sm:text-[32px] text-[18px] sm:pb-2.5 pb-1">
              +{data?.totalTickets || 0}
            </h2>
            <h3 className="capitalize sm:text-base text-xs">TotalTickets</h3>
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
        <div className="sm:h-[108px] h-[111px] border border-1px solid gray rounded-[6px] sm:flex block items-center sm:px-[20px] sm:py-[14px] p-[10px] gap-5 relative text-center">
          <div className="lg:w-[80px] lg:h-[80px] sm:w-[60px] sm:h-[60px] w-[40px] h-[40px] rounded-full bg-[#F5F7FF] flex items-center justify-center sm:m-0 m-auto">
            <img
              className="lg:max-w-[40px] sm:max-w-[30px] max-w-[24px]"
              src={supportTicketIcon("responded")}
            />
          </div>
          <div>
            <h2 className="font-[700] sm:text-[32px] text-[18px] sm:pb-2.5 pb-1">
             +{data?.responded || 0}
            </h2>
            <h3 className="capitalize sm:text-base text-xs">Responded</h3>
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
        <div className="sm:h-[108px] h-[111px] border border-1px solid gray rounded-[6px] sm:flex block items-center sm:px-[20px] sm:py-[14px] p-[10px] gap-5 relative text-center">
          <div className="lg:w-[80px] lg:h-[80px] sm:w-[60px] sm:h-[60px] w-[40px] h-[40px] rounded-full bg-[#F5F7FF] flex items-center justify-center sm:m-0 m-auto">
            <img
              className="lg:max-w-[40px] sm:max-w-[30px] max-w-[24px]"
              src={supportTicketIcon("resolved")}
            />
          </div>
          <div>
            <h2 className="font-[700] sm:text-[32px] text-[18px] sm:pb-2.5 pb-1">
              +{data?.resolved || 0}
            </h2>
            <h3 className="capitalize sm:text-base text-xs">Resolved</h3>
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
        <div className="sm:h-[108px] h-[111px] border border-1px solid gray rounded-[6px] sm:flex block items-center sm:px-[20px] sm:py-[14px] p-[10px] gap-5 relative text-center">
          <div className="lg:w-[80px] lg:h-[80px] sm:w-[60px] sm:h-[60px] w-[40px] h-[40px] rounded-full bg-[#F5F7FF] flex items-center justify-center sm:m-0 m-auto">
            <img
              className="lg:max-w-[40px] sm:max-w-[30px] max-w-[24px]"
              src={supportTicketIcon("pending")}
            />
          </div>
          <div>
            <h2 className="font-[700] sm:text-[32px] text-[18px] sm:pb-2.5 pb-1">
              +{data?.pending || 0}
            </h2>
            <h3 className="capitalize sm:text-base text-xs">Pending</h3>
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
      </div>
    </>
  );
};

export default SupportRequestDetails;
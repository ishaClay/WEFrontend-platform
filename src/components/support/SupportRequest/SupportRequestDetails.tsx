import ticket from "@/assets/images/ticket.png";
import ticketStar from "@/assets/images/ticket_star.png";
import message from "@/assets/images/message.png";
import resolved from "@/assets/images/Resolved.png";
import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/lib/constants";
import { fetchSupportTicketCount } from "@/services/apiServices/supportRequestServices";
import { useSelector } from "react-redux";

const SupportRequestDetails = () => {
  const { UserId } = useSelector((state: any) => state.user);

  const { data: support_request_count } = useQuery({
    queryKey: [QUERY_KEYS.supportTicketCount],
    queryFn: () => fetchSupportTicketCount(UserId),
  });
  return (
    <div className="w-full grid grid-cols-[repeat(4,auto)] gap-5 mt-[28px]">
      <div className="h-[108px] border border-1px solid gray rounded-[6px]  flex items-center justify-between sm:p-[26px] p-[5px]">
        <img className="w-[65px] h-[42px]" src={ticket} />
        <div className="text-center">
          <h2 className="font-[700] text-[32px] leading-[42px]">
            +{support_request_count?.data.data.totalTickets || 0}
          </h2>
          <h3>Total Tickets</h3>
        </div>
      </div>
      <div className="h-[108px] border border-1px solid gray rounded-[6px] flex items-center justify-between sm:p-[26px] p-[10px]">
        <img className="w-[42px] h-[42px]" src={message} />
        <div className="text-center">
          <h2 className="font-[700] text-[32px] leading-[42px]">
            +{support_request_count?.data.data.responded || 0}
          </h2>
          <h3>Responded</h3>
        </div>
      </div>
      <div className="h-[108px] border border-1px solid gray rounded-[6px] flex items-center justify-between sm:p-[26px] p-[10px]">
        <img className="w-[46px] h-[42px]" src={resolved} />
        <div className="text-center">
          <h2 className="font-[700] text-[32px] leading-[42px]">
            +{support_request_count?.data.data.resolved || 0}
          </h2>
          <h3>Resolved</h3>
        </div>
      </div>
      <div className="h-[108px] border border-1px solid gray rounded-[6px] flex items-center justify-between sm:p-[26px] p-[10px]">
        <img className="w-[73px] h-[42px]" src={ticketStar} />
        <div className="text-center">
          <h2 className="font-[700] text-[32px] leading-[42px]">
            +{support_request_count?.data.data.pending || 0}
          </h2>
          <h3>Pending</h3>
        </div>
      </div>
    </div>
  );
};

export default SupportRequestDetails;

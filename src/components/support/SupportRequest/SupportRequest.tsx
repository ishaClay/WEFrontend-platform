import SupportRequestDetails from "./SupportRequestDetails";
import SupportRequestTable from "./SupportRequestTable";
import { QUERY_KEYS } from "@/lib/constants";
import { fetchSupportTicketList } from "@/services/apiServices/supportRequestServices";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { Link } from "react-router-dom";
import { setPath } from "@/redux/reducer/PathReducer";
import { useAppDispatch } from "@/hooks/use-redux";
const SupportRequest = () => {
  const dispatch = useAppDispatch();
  const Role = location.pathname.split("/")[1];
  const userData = JSON.parse(localStorage.getItem("user") as string);
  const [page, setPage] = useState(1);
  const { UserId } = useSelector((state: RootState) => state.user);
  const [search, setSearch] = useState("");
  const { data: support_request_list, isPending: supportRequestPending } =
    useQuery({
      queryKey: [QUERY_KEYS.supportTicketList, { page, search }],
      queryFn: () =>
        fetchSupportTicketList(page.toString(), "10", search, +UserId),
    });

  return (
    <div className="bg-white">
      <div className="md:flex block justify-between items-center border-b border-[#D9D9D9] p-4">
        <div>
          <h6 className="font-calibri text-lg font-bold pb-2">
            Support Request
          </h6>
          <p className="text-[#606060] text-[15px] font-abhaya leading-[16px]">
            {+userData?.query?.role === 2
              ? "Here are all the support requests opened by your trainers or trainees "
              : "See what your trainees need help with—or ask something of your training provider"}{" "}
          </p>
        </div>
        <div>
          <Link
            to="add-new-ticket"
            onClick={() =>
              dispatch(
                setPath([
                  { label: "Support", link: null },
                  {
                    label: "Support Request",
                    link: `/${Role}/support-request`,
                  },
                  { label: "Add New Ticket", link: null },
                ])
              )
            }
            className="py-[10px] px-[20px] bg-primary-button text-color rounded-sm inline-block lg:mt-0 mt-3"
          >
            ADD NEW TICKET
          </Link>
        </div>
      </div>
      <div className="">
        <div className="sm:p-5 p-[15px]">
          <SupportRequestDetails
            data={support_request_list?.data?.dataAnalytics}
          />
        </div>
        <SupportRequestTable
          data={support_request_list}
          page={page}
          setPage={setPage}
          search={search}
          setSearch={setSearch}
          isLoading={supportRequestPending}
        />
      </div>
    </div>
  );
};

export default SupportRequest;

import { Link } from "react-router-dom";
import SupportRequestDetails from "./SupportRequestDetails";
import SupportRequestTable from "./SupportRequestTable";

const SupportRequest = () => {
  const userData = JSON.parse(localStorage.getItem("user") as string);
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
            className="py-[10px] px-[20px] bg-primary-button text-color rounded-sm inline-block lg:mt-0 mt-3"
          >
            ADD NEW TICKET
          </Link>
        </div>
      </div>
      <div className="">
        <div className="sm:p-5 p-3">
          <SupportRequestDetails />
        </div>
        <SupportRequestTable />
      </div>
    </div>
  );
};

export default SupportRequest;

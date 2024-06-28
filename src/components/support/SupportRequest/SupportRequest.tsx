import SupportRequestDetails from "./SupportRequestDetails";
import SupportRequestTable from "./SupportRequestTable";
import { Link } from "react-router-dom";

const SupportRequest = () => {
  return (
    <div className="bg-white rounded-xl">
      <div className="flex justify-between items-center border-b border-[#D9D9D9] p-4">
        <h6 className="font-calibri text-base font-bold">Support Request</h6>
        <div>
          <Link
            to="add-new-ticket"
            className="py-[10px] px-[20px] bg-primary-button text-color rounded-sm"
          >
            ADD NEW TICKET
          </Link>
        </div>
      </div>
      <div className="">
        <div className="lg:mb-10 sm:mb-8 mb-6 sm:p-5 p-[15px] pb-0">
          <SupportRequestDetails />
        </div>
        <SupportRequestTable />
      </div>
    </div>
  );
};

export default SupportRequest;

import Modal from "../comman/Modal";
import { Button } from "../ui/button";

const CompanyDetails = ({
  isOpen,
  // setIsOpen,
  companyData,
  handleReject,
  handleAccept,
}: {
  isOpen: boolean;
  // setIsOpen: Dispatch<React.SetStateAction<boolean>>;
  companyData: any;
  handleReject: () => void;
  handleAccept: () => void;
}) => {
  return (
    <Modal
      open={isOpen}
      onClose={() => {}}
      header="Company Details"
      titleClassName="text-[20px] font-droid font-semibold"
      showCloseButton={false}
    >
      <div>
        <div className="flex items-start">
          <h3 className="text-[18px] font-droid font-semibold max-w-[145px] w-full">
            Company Number:{" "}
          </h3>
          <span className="text-[18px] font-droid font-normal">
            {companyData?.company_num}
          </span>
        </div>
        <div className="flex items-start">
          <h3 className="text-[18px] font-droid font-semibold max-w-[145px] w-full">
            Company Name:{" "}
          </h3>
          <span className="text-[18px] font-droid font-normal">
            {companyData?.company_name}
          </span>
        </div>
        <div className="flex items-start">
          <h3 className="text-[18px] font-droid font-semibold max-w-[145px] w-full">
            Company Address:{" "}
          </h3>
          <span className="text-[18px] font-droid font-normal">
            {companyData?.company_addr_1}, {companyData?.company_addr_2}
            {companyData?.company_addr_3 ? "," : ""}{" "}
            {companyData?.company_addr_3}
            {companyData?.company_addr_4 ? "," : ""}{" "}
            {companyData?.company_addr_4}
          </span>
        </div>
        <div className="flex items-start">
          <h3 className="text-[18px] font-droid font-semibold max-w-[145px] w-full">
            Place of Business:{" "}
          </h3>
          <span className="text-[18px] font-droid font-normal">
            {companyData?.place_of_business}
          </span>
        </div>
        <div className="flex items-center gap-4 mt-4">
          <Button
            type="button"
            onClick={handleReject}
            className="w-full bg-slate-200 text-[#000] font-droid text-[16px]"
          >
            No
          </Button>
          <Button
            type="button"
            onClick={handleAccept}
            className="w-full bg-[#297F94] text-[#fff] font-droid text-[16px]"
          >
            Yes
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default CompanyDetails;

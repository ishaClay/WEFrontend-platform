import { Pencil, Trash2 } from "lucide-react";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";
import { DataEntity } from "@/types/certificate";

interface CertificateTempleteItemsProps {
  data: DataEntity;
}

const CertificateTempleteItems = ({data}: CertificateTempleteItemsProps) => {

  console.log(data,"certificartedata============")
  return (
    <div className="col-span-1 border border-[#D9D9D9] rounded-md md:mx-3 sm:mx-2 mx-0 mb-5">
      <div className="p-2 text-center ">
        <div className="">
          <img
            src={`${data?.backgroundImage}`}
            alt="backgroundImage"
            className="object-cover"
          />
        </div>
        <div className="">
          <img
            src={`${data?.logoImage}`}
            alt="logoImage"
            className="h-[50px]"
          />
        </div>
        <div className="pb-1">
          <h1 className="text-[14px] font-abhaya">{data?.title}</h1>
        </div>
        <div className="pb-2">
          <h1 className="font-abhaya text-[16px] text-[#58BA66] font-semibold underline underline-offset-4">
            Employe Name
          </h1>
        </div>
        <div className="text-[12px] pb-7">
          <p>{data?.bodyText}</p>
        </div>
        <div className="grid grid-cols-2 gap-2 justify-between ">
          <div className="flex gap-2 justify-between ">
            <div className="border-t border-black font-abhaya text-[14px]">
              <h2>{data?.administratorTitle}</h2>
              <h2>Head Of Marketing</h2>
            </div>
            <div className=" w-[50px]">
              <img
                src={`${data?.administratorSignature}`}
                className="object-cover"
              />
            </div>
          </div>
          <div className="flex gap-2 justify-between ">
            <div className=" w-[50px]">
              <img
                src={`${data?.instructorSignature}`}
                className="object-cover"
              />
            </div>
            <div className="border-t border-black font-abhaya text-[14px]">
              <h2>{data?.instructorTitle}</h2>
              <h2>President Director</h2>
            </div>
          </div>
        </div>
      </div>
      <h6 className="text-center font-calibri font-bold text-black text-base pb-2 pt-2">
        {data?.templateName}
      </h6>
      <div className="flex items-center justify-between border-t border-[#D9D9D9] p-2">
        <div>
          <Button className="bg-[#58BA66] xl:text-sm text-xs xl:h-10 h-8 font-nunito leading-1">
            ALLOCATE
          </Button>
        </div>
        <div>
          <Link to={`updatecertificate/${data?.id}`} className="">
            <Button className="p-2 w-8 h-8 bg-[#5CC1EE] me-2">
              <Pencil className="w-4 h-4" />
            </Button>
          </Link>
          <Button className="p-2 w-8 h-8 bg-[#FF5252]">
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CertificateTempleteItems;

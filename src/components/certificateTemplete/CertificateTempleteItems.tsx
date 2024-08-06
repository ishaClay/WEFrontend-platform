import { DataEntity } from "@/types/certificate";
import { Pencil, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { setPath } from "@/redux/reducer/PathReducer";
import { useAppDispatch } from "@/hooks/use-redux";
interface CertificateTempleteItemsProps {
  data: DataEntity;
}

const CertificateTempleteItems = ({ data }: CertificateTempleteItemsProps) => {
  const dispatch = useAppDispatch();
  const Role = location.pathname.split("/")[1];
  return (
    <div className="col-span-1 border border-[#D9D9D9] rounded-md md:mx-3 sm:mx-2 mx-0 mb-5">
      <div className=" text-center ">
        <div className="relative w-full">
          <img
            src={`${data?.backgroundImage}`}
            alt="backgroundImage"
            className="object-contain w-full mx-auto h-[300px]"
          />

          <div className="absolute top-0 text-center h-full p-4">
            <div className="flex justify-center pb-2 ">
              <img
                src={`${data?.cretificateText}`}
                alt="logoImage"
                className="h-[50px] object-cover bg-transparent "
              />
            </div>
            <div className="pb-2">
              <h1 className="text-[14px] font-abhaya">{data?.title}</h1>
            </div>
            <div className="pb-3">
              <h1 className="font-abhaya text-[16px] text-[#58BA66] font-semibold underline underline-offset-4">
                Employe Name
              </h1>
            </div>
            <div className="text-[12px] pb-5 h-[56px]">
              <p>{data?.bodyText}</p>
            </div>
            <div className="grid grid-cols-2 gap-2 justify-between ">
              <div className="flex gap-3 justify-between ">
                <div className="border-t border-black font-abhaya text-[14px]">
                  <h2>{data?.administratorTitle}</h2>
                  <h2>Head Of Marketing</h2>
                </div>
                <div className=" w-[40px] h-[40px]">
                  <img src={`${data?.companyLogo}`} className=" h-[40px]" />
                </div>
              </div>
              <div className="flex items-end gap-2 justify-between ">
                <div className=" w-[40px] h-[40px] overflow-hidden">
                  <img src={`${data?.companyLogo1}`} className="" />
                </div>
                <div>
                  <div className="">
                    {data?.instructorSignature ? (
                      <img
                        src={data?.instructorSignature || ""}
                        alt="logo"
                        className="max-w-[120px] w-full min-h-[30px] max-h-[30px] m-auto h-full object-contain"
                      />
                    ) : (
                      <div className="max-w-[100px] w-full min-h-[30px] max-h-[30px] mx-auto h-full"></div>
                    )}
                  </div>
                  <div
                    className="border-t font-nunito text-xs text-black font-medium leading-[18px] pt-2"
                    style={{ borderColor: data?.primaryColor }}
                  >
                    <h2>{data?.instructorTitle}</h2>
                    <h2>President Director</h2>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <h6 className="text-center font-abhaya font-bold text-black text-base pb-2 pt-2">
        {data?.templateName}
      </h6>
      <div className="flex items-center justify-between border-t border-[#D9D9D9] p-2.5">
        <div>
          <Button className="bg-[#58BA66] xl:text-sm text-xs w-[90px] h-[32px] font-nunito leading-1 p-0 leading-0">
            ALLOCATE
          </Button>
        </div>
        <div>
          <Link to={`updatecertificate/${data?.id}`} className="">
            <Button
              className="p-2 w-8 h-8 bg-[#5CC1EE] me-2"
              onClick={() =>
                dispatch(
                  setPath([
                    {
                      label: "Certificate Management",
                      link: null,
                    },
                    {
                      label: "Certificate List",
                      link: `/${Role}/certificate-template`,
                    },
                    {
                      label: "Update Certificate",
                      link: `/${Role}/certificate-template/updatecertificate/${data?.id}`,
                    },
                  ])
                )
              }
            >
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

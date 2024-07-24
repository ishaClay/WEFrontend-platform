import CertificateTempleteItems from "./CertificateTempleteItems";
import { useQuery } from "@tanstack/react-query";
import { certificateList } from "@/services/apiServices/certificate";
import { useSelector } from "react-redux";
import { QUERY_KEYS } from "@/lib/constants";
import { RootState } from "@/redux/store";
import Loader from "../comman/Loader";
const CertificateTemplete = () => {
  const { UserId } = useSelector((state: RootState) => state.user);
  const { data: certificate_data, isPending } = useQuery({
    queryKey: [QUERY_KEYS.getcertificate],
    queryFn: () => certificateList(UserId),
  });
  console.log(certificate_data?.data, "data============");
  return (
    <div className="bg-white rounded-lg">
      <div className=" md:flex block justify-between items-center border-b border-[#D9D9D9] p-4">
        <div className="border-b border-[#D9D9D9]">
          <h6 className="font-nunito text-base font-bold">All Certificate</h6>
          <p className="text-[#606060] text-[15px] font-abhaya leading-[16px]">
            All your created certificate templates
          </p>
        </div>
      </div>
      <div className="p-4">
        <div className="grid xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1">
          {certificate_data?.data?.map((item, index: number) => {
            return <CertificateTempleteItems data={item} key={index} />;
          })}
        </div>
      </div>
      {isPending && <Loader />}
    </div>
  );
};

export default CertificateTemplete;

import certificateImage1 from "@/assets/images/Certificate1.png";
import certificateImage2 from "@/assets/images/Certificate2.png";
import CertificateTempleteItems from "./CertificateTempleteItems";

const CertificateTemplete = () => {
  const templetDetails = [
    {
      image: certificateImage1,
      title: "Certificate Template1",
    },
    {
      image: certificateImage2,
      title: "Certificate Template13",
    },
  ];
  return (
    <div className="bg-white rounded-lg">
      <div className="px-5 py-2 border-b border-[#D9D9D9]">
        <div>
          <h3 className="text-[16px] font-[700] font-nunito">
            All Certificate
          </h3>
          <p className="text-[#606060] text-[15px]">All your created certificate templates</p>
        </div>
      </div>
      <div className="p-4">
        <div className="grid xl:grid-cols-4 grid-cols-3">
          {templetDetails.map((data, index) => {
            return <CertificateTempleteItems data={data} key={index} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default CertificateTemplete;

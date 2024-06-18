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
      <div className="p-5 border-b border-[#D9D9D9]">
        <h6 className="font-calibri text-base font-bold">All Certificate</h6>
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

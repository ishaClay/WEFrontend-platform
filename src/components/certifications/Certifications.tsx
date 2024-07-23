import certificateImage from "@/assets/images/Course_image.png";
import CertificationsList from "./CertificationsList";
const Certifications = () => {
  const certificationList = [
    {
      image: certificateImage,
      module: "Social | 5 modules",
      title:
        "Certificate in the Sustainable Development Goals, Partnership, People, Planet and Prosperity",
    },
    {
      image: certificateImage,
      module: "Social | 5 modules",
      title:
        "Certificate in the Sustainable Development Goals, Partnership, People, Planet and Prosperity",
    },
    {
      image: certificateImage,
      module: "Social | 5 modules",
      title:
        "Certificate in the Sustainable Development Goals, Partnership, People, Planet and Prosperity",
    },
    {
      image: certificateImage,
      module: "Social | 5 modules",
      title:
        "Certificate in the Sustainable Development Goals, Partnership, People, Planet and Prosperity",
    },
    {
      image: certificateImage,
      module: "Social | 5 modules",
      title:
        "Certificate in the Sustainable Development Goals, Partnership, People, Planet and Prosperity",
    },
    {
      image: certificateImage,
      module: "Social | 5 modules",
      title:
        "Certificate in the Sustainable Development Goals, Partnership, People, Planet and Prosperity",
    },
  ];

  return (
    <>
      <div className="lg:bg-white bg-transparent rounded-xl">
        <div className="grid xl:grid-cols-2 grid-cols-1 sm:gap-5 gap-4 bg-white sm:p-5 p-[15px] rounded-lg">
          {certificationList.map((data, index: number) => {
            return <CertificationsList key={index} data={data} />;
          })}
        </div>
      </div>
    </>
  );
};

export default Certifications;

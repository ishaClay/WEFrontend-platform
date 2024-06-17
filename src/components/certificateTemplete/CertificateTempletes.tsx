import certificateImage1 from "@/assets/images/Certificate1.png";
import certificateImage2 from "@/assets/images/Certificate2.png";
import { Pencil, Trash2 } from "lucide-react";
import { Button } from "../ui/button";

const CertificateTemplete = () => {
  const list = [
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
      <div className="flex">
        {list.map((data: any, index: number) => {
          return (
            <div key={index}>
              <div>
                <img src={data.image} alt="" />
                <h6>{data.title}</h6>
                <div className="flex items-center justify-between">
                  <div>
                    <Button>ALLOCATE</Button>
                  </div>
                  <div>
                    <Button className="p-2 w-8 h-8 bg-[#5CC1EE]">
                      <Pencil className="w-4 h-4" />
                    </Button>
                    <Button className="p-2 w-8 h-8 bg-[#FF5252]">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CertificateTemplete;

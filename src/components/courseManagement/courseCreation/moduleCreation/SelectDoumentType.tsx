import document_Option_1 from "@/assets/images/upload_option_1.png";
import document_Option_2 from "@/assets/images/upload_option_2.png";
import document_Option_3 from "@/assets/images/upload_option_3.png";
import document_Option_4 from "@/assets/images/upload_option_4.png";
import document_Option_5 from "@/assets/images/upload_option_5.png";
import document_Option_6 from "@/assets/images/upload_option_6.png";
import document_Option_7 from "@/assets/images/upload_option_7.png";
import SelectDoumentTypeItems from "./SelectDoumentTypeItems";
import { CircleX } from "lucide-react";

const SelectDoumentType = () => {
  const documentUploadType = [
    {
      documentSelectOption: document_Option_1,
    },
    {
      documentSelectOption: document_Option_2,
    },
    {
      documentSelectOption: document_Option_3,
    },
    {
      documentSelectOption: document_Option_4,
    },
    {
      documentSelectOption: document_Option_5,
    },
    {
      documentSelectOption: document_Option_6,
    },
    {
      documentSelectOption: document_Option_7,
    },
  ];
  return (
    <div>
      <h5 className="font-bold text-black text-xl font-calibri">
        Select Document Type
      </h5>
      <div className="flex flex-wrap justify-center items-center">
        {documentUploadType.map((data, index) => {
          return <SelectDoumentTypeItems key={index} data={data} />;
        })}
      </div>
    </div>
  );
};

export default SelectDoumentType;

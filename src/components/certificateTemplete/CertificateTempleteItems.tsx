import { Pencil, Trash2 } from "lucide-react";
import { Button } from "../ui/button";

type templetDetailsProps = {
  data: {
    image: string;
    title: string;
  };
};
const CertificateTempleteItems = ({ data }: templetDetailsProps) => {
  return (
    <div className="col-span-1 border border-[#D9D9D9] rounded-md mx-3 mb-5">
      <div className="p-2">
        <img src={data.image} alt="" className="w-full" />
      </div>
      <h6 className="text-center font-calibri font-bold text-black text-base pb-2">
        {data.title}
      </h6>
      <div className="flex items-center justify-between border-t border-[#D9D9D9] p-2">
        <div>
          <Button className="bg-[#58BA66] xl:text-sm text-xs xl:h-10 h-8 font-nunito leading-1">
            ALLOCATE
          </Button>
        </div>
        <div>
          <Button className="p-2 w-8 h-8 bg-[#5CC1EE] me-2">
            <Pencil className="w-4 h-4" />
          </Button>
          <Button className="p-2 w-8 h-8 bg-[#FF5252]">
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CertificateTempleteItems;

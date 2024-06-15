import dropFile from "@/assets/images/drop_file-img.png";
import { Button } from "@/components/ui/button";

const AllocateCertificateModalDetails = () => {
  return (
    <div className="text-center">
      <h3 className="text-xl font-calibri font-bold pb-5">
        Allocate Certificate
      </h3>
      <div className="border border-dashed border-[#D9D9D9] p-10 mb-8 rounded-md">
        <div className="text-center">
          <img src={dropFile} className="m-auto pb-6" />
          <h6 className="text-[#9E9E9E] text-sm pb-6 font-calibri">
            Drag and drop files here
          </h6>
          <h5 className="uppercase text-[#9E9E9E] pb-6 font-inter">-OR-</h5>
          <Button className="outline-none text-base rounded-md font-calibri text-white bg-[#42A7C3] py-8 px-14">
            Browse Files
          </Button>
        </div>
      </div>
      <h5 className="text-xl font-bold font-calibri pb-4">OR</h5>
      <h6 className="text-base font-calibri pb-8">
        System Generated Certificate :
        <span className="text-[#4285F4] ps-2">Generate Now</span>
      </h6>
      <Button className="outline-none text-base rounded-md font-calibri text-white bg-[#58BA66] py-7 px-3">
        Allocate Certificate
      </Button>
    </div>
  );
};

export default AllocateCertificateModalDetails;

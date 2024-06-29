import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { DataEntity } from "@/types/Pillar";

const CoursePathwayPageItems = ({ data }: { data: DataEntity }) => {
  console.log("🚀 ~ CoursePathwayPageItems ~ data:", data);

  return (
    <div className="h-[100px] border border-[#D9D9D9] rounded-md grid grid-cols-12 w-full mb-4 overflow-hidden">
      <div className="h-full flex items-center col-span-3 p-4 bg-[#F5F7FF] align-middle border-e border-[#D9D9D9]">
        <h4 className="align-middle text-base font-calibri font-bold">
          {data.pillarName}
        </h4>
      </div>
      {/* <div className="col-span-9 flex items-center">
        <div className="2xl:ps-12 xl:ps-5 ps-3">
          <Button className="py-4 px-5 rounded-full outline-none bg-[#FF5252] text-white text-base font-calibri">
            <Checkbox className="w-[24px] h-[24px] bg-white rounded-full border-bone me-3" />
            Introductory
          </Button>
        </div>
        <div className="2xl:ps-12 xl:ps-5 ps-3">
          <Button className="py-4 px-5 rounded-full outline-none bg-[#FFD56A] text-black text-base font-calibri hover:text-white">
            <Checkbox className="w-[24px] h-[24px] bg-white rounded-full border-bone me-3" />
            Intermediate
          </Button>
        </div>
        <div className="2xl:ps-12 xl:ps-5 ps-3">
          <Button className="py-4 px-5 rounded-full outline-none bg-[#D6F5AC] text-black text-base font-calibri hover:text-white">
            <Checkbox className="w-[24px] h-[24px] bg-white rounded-full border-bone me-3" />
            Advance
          </Button>
        </div>
      </div> */}
      <RadioGroup
        // defaultValue="comfortable"
        className="col-span-9 flex items-center gap-[50px] ml-[50px]"
      >
        <Label htmlFor={`r1_${data.id}`} className="flex items-center space-x-2 py-[10px] px-3 rounded-full outline-none bg-[#FF5252] text-white text-base font-calibri">
          <RadioGroupItem indicatorClassName="fill-[#58BA66]" className="text-[#58BA66] bg-white border-[#D9D9D9] outline-none w-6 h-6" value="default" id={`r1_${data.id}`} />
          <span className="text-base font-calibri">Introductory</span>
        </Label>
        <Label htmlFor={`r2_${data.id}`} className="flex items-center space-x-2 py-[10px] px-3 rounded-full outline-none bg-[#FFD56A] text-black text-base font-calibri">
          <RadioGroupItem indicatorClassName="fill-[#58BA66]" className="text-[#58BA66] bg-white border-[#D9D9D9] w-6 h-6" value="comfortable" id={`r2_${data.id}`} />
          <span className="text-base font-calibri">Intermediate</span>
        </Label>
        <Label htmlFor={`r3_${data.id}`} className="flex items-center space-x-2 py-[10px] px-3 rounded-full outline-none bg-[#D6F5AC] text-black text-base font-calibri">
          <RadioGroupItem indicatorClassName="fill-[#58BA66]" className="text-[#58BA66] bg-white border-[#D9D9D9] w-6 h-6" value="compact" id={`r3_${data.id}`} />
          <span className="text-base font-calibri">Advance</span>
        </Label>
      </RadioGroup>
    </div>
  );
};

export default CoursePathwayPageItems;

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

const CoursePathwayPageItems = ({ data }: { data: any }) => {
  return (
    <div className="h-[100px] border border-[#D9D9D9] rounded-md grid grid-cols-12 w-full mb-4 overflow-hidden">
      <div className="h-full flex items-center col-span-3 p-4 bg-[#F5F7FF] align-middle border-e border-[#D9D9D9]">
        <h4 className="align-middle text-base font-calibri font-bold">
          {data.courseName}
        </h4>
      </div>
      <div className="col-span-9 flex items-center">
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
      </div>
    </div>
  );
};

export default CoursePathwayPageItems;

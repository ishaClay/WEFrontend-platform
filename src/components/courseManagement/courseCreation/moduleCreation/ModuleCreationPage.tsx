import { Button } from "@/components/ui/button";
import { CirclePlus } from "lucide-react";
import CourseViewPage from "../courseView/CourseViewPage";

const ModuleCreationPage = () => {
  return (
    <div className="p-5">
      <div className="text-right pb-5">
        <Button className="bg-[#42A7C3] px-4 py-2 me-4 font-inter text-xs">
          <CirclePlus width={20} className="me-2" /> Add Module
        </Button>
      </div>

      {/* <div className="">
        {moduleCreationItems.map((data, index) => {
          return <ModuleCreationItems key={index} data={data} />;
        })}

        <div className="text-right">
          <Button className="outline-none text-base font-inter text-white bg-[#58BA66] py-6 px-8">
            Next
          </Button>
        </div>
      </div> */}

      <CourseViewPage />
    </div>
  );
};

export default ModuleCreationPage;

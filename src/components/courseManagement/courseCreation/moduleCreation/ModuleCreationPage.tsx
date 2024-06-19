import { Button } from "@/components/ui/button";
import ModuleCreationItems from "./ModuleCreationItems";
import { CirclePlus } from "lucide-react";
import CourseViewPage from "../courseView/CourseViewPage";

const ModuleCreationPage = () => {
  const moduleCreationItems = [
    {
      moduleId: 1,
      moduleTitle: "Chapter 1 - Intro",
      sectionTitle: "Dog’s Story 1",
      moduleInformation:
        "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', ",
      uploadContent: "Select Upload Document Type",
      moduleUrl: "Enter url here",
      documentDownload: "Management file.pdf",
    },
    {
      moduleId: 2,
      moduleTitle: "Chapter 1 - Intro",
      sectionTitle: "Dog’s Story 1",
      moduleInformation:
        "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', ",
      uploadContent: "Select Upload Document Type",
      moduleUrl: "Enter url here",
      documentDownload: "Management file.pdf",
    },
  ];
  return (
    <div className="p-5">
      <div className="text-right pb-5">
        <Button className="bg-[#42A7C3] px-4 py-2 me-4 font-inter text-xs">
          <CirclePlus width={20} className="me-2" /> Add Module
        </Button>
      </div>

      {moduleCreationItems.map((data, index) => {
        return <ModuleCreationItems key={index} data={data} />;
      })}

      {/* <CourseViewPage /> */}

      <div className="text-right">
        <Button className="outline-none text-base font-inter text-white bg-[#58BA66] py-6 px-8">
          Next
        </Button>
      </div>
    </div>
  );
};

export default ModuleCreationPage;

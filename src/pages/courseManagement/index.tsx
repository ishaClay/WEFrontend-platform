import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import CoursePathway from "./CoursePathway";
import ModuleCreation from "./ModuleCreation";
import BasicDetails from "./basicDetails";

const CourseManagement = () => {
  const tab = ["basic-details", "course-pathway", "module-creation", "forum"];
  const [searchParams] = useSearchParams();
  const paramsTab = searchParams?.get("tab") || "1";
  const [currentTab, setCurrentTab] = useState<string>(tab[+paramsTab - 1]);

  console.log("paramsTab", paramsTab);

  useEffect(() => {
    setCurrentTab(tab[+paramsTab - 1]);
  }, [paramsTab, tab]);

  return (
    <div className="bg-white p-4">
      <Tabs defaultValue={currentTab} className="">
        <div className="border-b">
          <TabsList className="grid w-full h-auto p-0 grid-cols-4 max-w-[600px]">
            <TabsTrigger
              value="basic-details"
              className=" data-[state=active]:text-[#00778B] data-[state=active]:border-[#00778B] border-b rounded-none border-transparent text-base font-bold py-5 font-calibri"
            >
              Basic Details
            </TabsTrigger>
            <TabsTrigger
              value="course-pathway"
              className="data-[state=active]:text-[#00778B] data-[state=active]:border-[#00778B] border-b rounded-none border-transparent text-base font-bold font-calibri text-[#000] py-5"
            >
              Course Pathway
            </TabsTrigger>
            <TabsTrigger
              value="module-creation"
              className="data-[state=active]:text-[#00778B] data-[state=active]:border-[#00778B] border-b rounded-none border-transparent text-base font-bold font-calibri text-[#000] py-5"
            >
              Module Creation
            </TabsTrigger>
            <TabsTrigger
              value="forum"
              className="data-[state=active]:text-[#00778B] data-[state=active]:border-[#00778B] border-b rounded-none border-transparent text-base font-bold font-calibri text-[#000] py-5"
            >
              Forum
            </TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value="basic-details">
          <BasicDetails />
        </TabsContent>
        <TabsContent value="course-pathway">
          <CoursePathway />
        </TabsContent>
        <TabsContent value="module-creation">
          <ModuleCreation />
        </TabsContent>
        <TabsContent value="forum"></TabsContent>
      </Tabs>
    </div>
  );
};

export default CourseManagement;

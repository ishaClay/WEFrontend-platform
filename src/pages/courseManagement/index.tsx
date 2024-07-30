import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MoveLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import BasicDetails from "./basicDetails";
import CoursePathway from "./CoursePathway";
import Forum from "./Forum";
import ModuleCreation from "./ModuleCreation";

const CourseManagement = () => {
  const [currentTab, setCurrentTab] = useState<string>("");
  const navigate = useNavigate();
  const location = useLocation();
  const search = window.location.search;
  const paramsTab = new URLSearchParams(search).get("tab") || "";
  const step = new URLSearchParams(search).get("step") || "";
  // const paramsId = new URLSearchParams(search).get("id");
  const paramsversion = new URLSearchParams(search).get("version");
  const pathName = location?.pathname?.split("/")[1];
  const courseId = +location?.pathname?.split("/")[3];

  useEffect(() => {
    if (paramsTab) {
      setCurrentTab(paramsTab);
    } else {
      setCurrentTab("0");
    }
  }, [paramsTab]);

  // useEffect(() => {
  //   if (+courseId) {
  //     // navigate(window.location);
  //     if (courseId && currentTab === "0") {
  //       navigate(
  //         `/${pathName}/create_course/${courseId}?tab=${currentTab}&step=${step}&version=${paramsversion}`
  //       );
  //     } else {
  //       navigate(
  //         `/${pathName}/create_course/${courseId}?tab=${currentTab}&version=${paramsversion}`
  //       );
  //     }
  //   } else {
  //     if (currentTab === "0") {
  //       navigate(
  //         `/${pathName}/create_course?tab=${currentTab}&step=${step}&version=1`
  //       );
  //     } else {
  //       navigate(
  //         `/${pathName}/create_course?tab=${currentTab}&id=${paramsId}&version=1`
  //       );
  //     }
  //   }
  // }, [currentTab, pathName, step, paramsId]);

  console.log("currentTab", currentTab);

  return (
    <div className="bg-white p-0">
      <Tabs
        defaultValue={currentTab}
        value={currentTab}
        className=""
        onValueChange={(e) => {
          setCurrentTab(e);
          if (courseId) {
            navigate(
              `/${pathName}/create_course/${courseId}?tab=${e}&step=${step}&version=${paramsversion}`
            );
          } else {
            navigate(
              `/${pathName}/create_course?tab=${e}&step=${step}&version=${paramsversion}`
            );
          }
        }}
      >
        <div className="border-b flex md:flex-row flex-col justify-between md:items-center items-start">
          <TabsList className="w-full h-auto p-0 md:order-1 order-2 flex justify-start">
            <TabsTrigger
              value="0"
              className="data-[state=active]:text-[#00778B] data-[state=active]:border-[#00778B] border-b rounded-none border-transparent sm:text-base text-xs font-bold sm:py-5 py-2 sm:px-5 px-2 font-calibri"
            >
              Basic Details
            </TabsTrigger>
            <TabsTrigger
              value="1"
              className="data-[state=active]:text-[#00778B] data-[state=active]:border-[#00778B] border-b rounded-none border-transparent sm:text-base text-xs font-bold font-calibri text-[#000] sm:py-5 py-2 sm:px-5 px-2"
            >
              Course Pathway
            </TabsTrigger>
            <TabsTrigger
              value="2"
              className="data-[state=active]:text-[#00778B] data-[state=active]:border-[#00778B] border-b rounded-none border-transparent sm:text-base text-xs font-bold font-calibri text-[#000] sm:py-5 py-2 sm:px-5 px-2"
            >
              Module Creation
            </TabsTrigger>
            <TabsTrigger
              value="3"
              className="data-[state=active]:text-[#00778B] data-[state=active]:border-[#00778B] border-b rounded-none border-transparent sm:text-base text-xs font-bold font-calibri text-[#000] sm:py-5 py-2 sm:px-5 px-2"
            >
              Forum
            </TabsTrigger>
          </TabsList>
          <Button
            className="flex cursor-pointer md:order-2 order-1 bg-transparent text-black"
            onClick={() => navigate(`/${pathName}/allcourse`)}
          >
            <MoveLeft />
            <span className="text-base font-semibold pl-4">Back</span>
          </Button>
        </div>
        <TabsContent value="0" className="xl:p-[30px] sm:p-5 p-4 mt-0">
          <BasicDetails />
        </TabsContent>
        <TabsContent value="1" className="xl:p-[30px] sm:p-5 p-4 mt-0">
          <CoursePathway />
        </TabsContent>
        <TabsContent value="2" className="xl:p-[30px] sm:p-5 p-4 mt-0">
          <ModuleCreation />
        </TabsContent>
        <TabsContent value="3" className="xl:p-[30px] sm:p-5 p-4 mt-0">
          <Forum />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CourseManagement;

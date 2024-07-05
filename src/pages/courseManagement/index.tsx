import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import CoursePathway from "./CoursePathway";
import Forum from "./Forum/Forum";
import ModuleCreation from "./ModuleCreation";
import { MoveLeft } from "lucide-react";
import BasicDetails from "./basicDetails";

const CourseManagement = () => {
  const [currentTab, setCurrentTab] = useState<number>(0);
  const navigate = useNavigate();
  const location = useLocation();
  const search = window.location.search;
  // const paramsTab = new URLSearchParams(search).get("tab") || "";
  const step = new URLSearchParams(search).get("step") || "";
  // const paramsId = new URLSearchParams(search).get("id");
  const paramsversion = new URLSearchParams(search).get("version");
  const courseId = location?.pathname?.split("/")[3];

  // useEffect(() => {
  //   setCurrentTab("0");
  // }, [paramsTab, tab]);

  useEffect(() => {
    if (courseId) {
      navigate(
        `/${
          location?.pathname?.split("/")[1]
        }/create_course/${courseId}?tab=${currentTab}&step=${step}&version=${paramsversion}`
      );
      if (courseId && currentTab === 0) {
        navigate(
          `/${
            location?.pathname?.split("/")[1]
          }/create_course/${courseId}?tab=${currentTab}&step=${step}&version=${paramsversion}`
        );
      } else {
        navigate(
          `/${
            location?.pathname?.split("/")[1]
          }/create_course/${courseId}?tab=${currentTab}&version=${paramsversion}`
        );
      }
    } else {
      if (currentTab === 0) {
        navigate(
          `/${
            location?.pathname?.split("/")[1]
          }/create_course?tab=${currentTab}&step=${step}`
        );
      } else {
        navigate(
          `/${
            location?.pathname?.split("/")[1]
          }/create_course?tab=${currentTab}`
        );
      }
    }
  }, [currentTab]);

  return (
    <div className="bg-white p-0">
      <Tabs
        defaultValue={String(currentTab)}
        className=""
        onValueChange={(e) => setCurrentTab(+e)}
      >
        <div className="border-b flex justify-between items-center">
          <TabsList className="grid w-full h-auto p-0 grid-cols-4 max-w-[600px]">
            <TabsTrigger
              value="0"
              className=" data-[state=active]:text-[#00778B] data-[state=active]:border-[#00778B] border-b rounded-none border-transparent text-base font-bold py-5 font-calibri"
            >
              Basic Details
            </TabsTrigger>
            <TabsTrigger
              value="1"
              className="data-[state=active]:text-[#00778B] data-[state=active]:border-[#00778B] border-b rounded-none border-transparent text-base font-bold font-calibri text-[#000] py-5"
            >
              Course Pathway
            </TabsTrigger>
            <TabsTrigger
              value="2"
              className="data-[state=active]:text-[#00778B] data-[state=active]:border-[#00778B] border-b rounded-none border-transparent text-base font-bold font-calibri text-[#000] py-5"
            >
              Module Creation
            </TabsTrigger>
            <TabsTrigger
              value="3"
              className="data-[state=active]:text-[#00778B] data-[state=active]:border-[#00778B] border-b rounded-none border-transparent text-base font-bold font-calibri text-[#000] py-5"
            >
              Forum
            </TabsTrigger>
          </TabsList>
          <div
            className="flex pr-5 cursor-pointer"
            onClick={() => navigate("/trainer/allcourse")}
          >
            <MoveLeft />
            <span className="text-base font-semibold pl-4">Back</span>
          </div>
        </div>
        <TabsContent value="0" className="xl:p-[30px] p-5 mt-0">
          <BasicDetails />
        </TabsContent>
        <TabsContent value="1" className="xl:p-[30px] p-5 mt-0">
          <CoursePathway />
        </TabsContent>
        <TabsContent value="2" className="xl:p-[30px] p-5 mt-0">
          <ModuleCreation />
        </TabsContent>
        <TabsContent value="3" className="xl:p-[30px] p-5 mt-0">
          <Forum />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CourseManagement;

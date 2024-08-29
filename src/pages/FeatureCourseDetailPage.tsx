import Loading from "@/components/comman/Error/Loading";
import Information from "@/components/featureCourseDetail/Information";
import Module from "@/components/featureCourseDetail/Module";
import HomeHeader from "@/components/homePage/HomeHeader";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { QUERY_KEYS } from "@/lib/constants";
import { fetchFeatureCourseById } from "@/services/apiServices/courseManagement";
import { useQuery } from "@tanstack/react-query";
import { MoveLeft } from "lucide-react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const FeatureCourseDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [currentTab, setCurrentTab] = useState("information");

  const { data: getSingleCourse, isPending: getSingleCoursePending } =
    useQuery<any>({
      queryKey: [QUERY_KEYS.getSingleCourse],
      queryFn: () => fetchFeatureCourseById(String(id)),
    });

  return (
    <div className="">
      <HomeHeader />
      <div className="bg-[#F5F7FF] p-5">
        <div className="bg-white p-5 h-[calc(100vh-210px)] overflow-y-auto rounded-b-xl">
          <div className="flex justify-between items-center bg-white p-5">
            <h4 className="xl:text-[28px] md:text-[22px] text-[18px] leading-[normal] font-bold font-nunito text-black sm:pb-0 pb-3">
              {getSingleCourse?.data?.title}
            </h4>
            <div
              className="flex pr-5 cursor-pointer text-black md:hidden"
              onClick={() => navigate("/")}
            >
              <MoveLeft />
              <span className="text-base font-semibold pl-4">Back</span>
            </div>
          </div>
          <div className="bg-white">
            <Tabs
              defaultValue="information"
              onValueChange={(e) => setCurrentTab(e)}
              className="w-full"
              value={currentTab}
            >
              <TabsList className="p-0 flex justify-between sm:items-center items-start sm:flex-row flex-col h-auto border-b">
                <div className="flex sm:order-1 order-2">
                  <TabsTrigger
                    value="information"
                    className="text-base font-nunito text-black data-[state=active]:text-[#00778B] data-[state=active]:border-[#00778B] border-b rounded-none border-transparent"
                  >
                    Information
                  </TabsTrigger>
                  <TabsTrigger
                    value="module"
                    className="text-base font-nunito text-black data-[state=active]:text-[#00778B] data-[state=active]:border-[#00778B] border-b rounded-none border-transparent"
                  >
                    Module
                  </TabsTrigger>
                </div>
                <div className="w-full sm:order-2 order-1 px-5 sm:mb-0 mb-3 sm:flex block justify-end">
                  <div
                    className="md:flex hidden pr-5 cursor-pointer text-black"
                    onClick={() => navigate("/")}
                  >
                    <MoveLeft />
                    <span className="text-base font-semibold pl-4">Back</span>
                  </div>
                </div>
              </TabsList>
              <TabsContent value="information" className="p-5">
                <Information data={getSingleCourse?.data} />
              </TabsContent>
              <TabsContent value="module" className="p-5">
                <Module data={getSingleCourse?.data} />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
      <Loading isLoading={getSingleCoursePending} />
    </div>
  );
};

export default FeatureCourseDetailPage;

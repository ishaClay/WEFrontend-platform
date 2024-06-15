import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React from "react";
import BasicDetails from "./basicDetails";

const CourseManagement = () => {
  return (
    <div>
      <Tabs defaultValue="basic-details" className="">
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
              className="text-base font-calibri font-bold text-[#000] py-5"
            >
              Course Pathway
            </TabsTrigger>
            <TabsTrigger
              value="module-creation"
              className="text-base font-calibri font-bold text-[#000] py-5"
            >
              Module Creation
            </TabsTrigger>
            <TabsTrigger
              value="forum"
              className="text-base font-calibri font-bold text-[#000] py-5"
            >
              Forum
            </TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value="basic-details">
          <BasicDetails />
        </TabsContent>
        <TabsContent value="course-pathway"></TabsContent>
        <TabsContent value="module-creation"></TabsContent>
        <TabsContent value="forum"></TabsContent>
      </Tabs>
    </div>
  );
};

export default CourseManagement;

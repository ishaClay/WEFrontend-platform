import { useState } from "react";
import EmployeeListSidebar from "@/components/EmployeeListSidebar";
import HeaderCourse from "@/components/HeaderCourse";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  BsFillHandThumbsDownFill,
  BsFillHandThumbsUpFill,
} from "react-icons/bs";
import { FaRegComment } from "react-icons/fa";

function AllCourses() {
  // State to track which comment is in reply mode
  const [replyMode, setReplyMode] = useState(null);

  // Handler to toggle reply mode for a comment
  const handleReplyClick = (commentId: any) => {
    setReplyMode(replyMode === commentId ? null : commentId);
  };

  return (
    <div className="flex bg-[#f5f3ff] w-[1510px] h-[1608px] gap-1">
      <div className=" w-[235px] h-[1608px]">
        <EmployeeListSidebar />
      </div>
      <div className="flex flex-col">
        <div className="w-[1204px] h-[120px] ">
          <HeaderCourse />
        </div>

        <div className="bg-[#FFFFFF] w-[1250px] h-[1469px] m-[12px] rounded-t-[10px]">
          <Tabs defaultValue="account" className="w-[400px]">
            <TabsList>
              <TabsTrigger value="Information">Information</TabsTrigger>
              <TabsTrigger value="Module">Module</TabsTrigger>
              <TabsTrigger value="Feedback">Feedback</TabsTrigger>
              <TabsTrigger value="Forum">Forum</TabsTrigger>
            </TabsList>
            <TabsContent value="Information">
              Make changes to your account here.
            </TabsContent>
            <TabsContent value="Module">Change your password here.</TabsContent>
            <TabsContent value="Feedback">
              Make changes to your account here.
            </TabsContent>
            <TabsContent value="Forum">
              <div className="m-[50px] border h-[310px] border-[#D9D9D9] rounded-[5px] p-[23px]">
                <div className=" flex gap-[10px]">
                  <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>

                  <div>
                    <h3 className="font-calibri ">User Name Here</h3>
                    <p className="font-inter text-[12px] text-[#5B5B5B]">
                      Trainer Admin
                    </p>
                  </div>
                </div>

                <div className=" mt-[18px] text-[#A3A3A3]  h-[150px] ">
                  <textarea className="p-[20px] w-full border gray " />
                </div>
                <div className="w-full mt-[20px] flex justify-end">
                  <Button className="bg-[#42A7C3]">Post Question</Button>
                </div>
              </div>

              <div className="m-[50px] border h-[1022px] border-[#D9D9D9] rounded-[5px] p-[23px]">
                <div className=" flex gap-[10px]">
                  <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>

                  <div>
                    <h3 className="font-calibri ">User Name Here</h3>
                    <p className="font-inter text-[12px] text-[#5B5B5B]">
                      Trainer Admin 2 Day's ago
                    </p>
                  </div>
                </div>

                <h3 className="mt-[18px]">
                  {" "}
                  How long does it take for a wind turbine to balance out the
                  carbon emissions caused by its production?
                </h3>

                <div className="h-[48px] w-full mt-[12px] border-t border-b gray flex items-center gap-[29px]">
                  <div className="flex gap-[10px] items-center">
                    <BsFillHandThumbsUpFill className="text-[gray] text-[20px] cursor-pointer" />
                    <p>Like (20)</p>
                  </div>

                  <div className="flex gap-[10px] items-center">
                    <BsFillHandThumbsDownFill className="text-[gray]  text-[20px] cursor-pointer" />
                    <p>Deslike (0)</p>
                  </div>

                  <div className="flex gap-[10px] items-center">
                    <FaRegComment className="text-[gray]  text-[20px] cursor-pointer" />
                    <p>Comments (10)</p>
                  </div>
                </div>

                <div className="flex gap-[16px] mt-[21px]">
                  <Avatar className="w-[30px] h-[30px] mt-[10px]">
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>

                  <div className="w-full h-[auto] bg-[#F5F7FF] p-[15px] rounded-[15px]">
                    <h3 className="font-inter text-[14px] font-[600]">
                      Comment Person Name
                    </h3>
                    <p className="font-inter text-[12px] mt-[6px]">
                      Compared to other energy sources, the installation and
                      running costs of wind power facilities are very low.
                      However, building a wind farm does produce a certain
                      amount of carbon emissions as well as other greenhouse
                      gases. Research has shown that an average wind turbine
                      balances out its carbon footprint within the first 5-7
                      months and generates zero-emission electricity for the
                      rest of its 30 year lifespan. With technological
                      improvements and the electrification of transport, CO2
                      emissions are expected to be reduced even further.
                    </p>
                  </div>
                </div>
                <div className="flex gap-[23px] ml-[60px] mt-[10px]">
                  <p className="text-[#606060] font-inter text-[12px]">
                    Few minutes ago
                  </p>
                  <a
                    className="font-inter text-[12px] cursor-pointer"
                    onClick={() => handleReplyClick(1)}
                  >
                    Reply
                  </a>
                </div>

                {replyMode === 1 && (
                  <div className="flex gap-[16px] mt-[21px] ml-[60px]">
                    <Avatar className="w-[30px] h-[30px] mt-[10px]">
                      <AvatarImage src="https://github.com/shadcn.png" />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <div className="w-full relative">
                      <textarea
                        className="w-full h-[100px] p-[10px] bg-[#F5F7FF] rounded-[15px]"
                        placeholder="Reply to Comment Person Name..."
                      ></textarea>
                      <Button className="absolute bottom-[30px] right-8 w-[70px] h-[38px] bg-[#42A7C3]">
                        Post
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}

export default AllCourses;

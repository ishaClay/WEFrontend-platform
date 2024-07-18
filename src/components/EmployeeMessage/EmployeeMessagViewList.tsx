import profile_image from "@/assets/images/face_2.jfif";
import { Input } from "../ui/input";
import { Search } from "lucide-react";
import { ScrollArea } from "@radix-ui/react-scroll-area";

const EmployeeMessagViewList = () => {
  const messageView = [
    {
      image: profile_image,
      name: "Theresa Webb",
      message: "Lorem ipsum dolor sit amet...",
      date: "Apr 10",
    },
    {
      image: profile_image,
      name: "Theresa Webb",
      message: "Lorem ipsum dolor sit amet...",
      date: "Apr 10",
    },
    {
      image: profile_image,
      name: "Theresa Webb",
      message: "Lorem ipsum dolor sit amet...",
      date: "Apr 10",
    },
    {
      image: profile_image,
      name: "Theresa Webb",
      message: "Lorem ipsum dolor sit amet...",
      date: "Apr 10",
    },
    {
      image: profile_image,
      name: "Theresa Webb",
      message: "Lorem ipsum dolor sit amet...",
      date: "Apr 10",
    },
    {
      image: profile_image,
      name: "Theresa Webb",
      message: "Lorem ipsum dolor sit amet...",
      date: "Apr 10",
    },
    {
      image: profile_image,
      name: "Theresa Webb",
      message: "Lorem ipsum dolor sit amet...",
      date: "Apr 10",
    },
    {
      image: profile_image,
      name: "Theresa Webb",
      message: "Lorem ipsum dolor sit amet...",
      date: "Apr 10",
    },
    {
      image: profile_image,
      name: "Theresa Webb",
      message: "Lorem ipsum dolor sit amet...",
      date: "Apr 10",
    },
  ];
  return (
    <div className="lg:border-t border-t-none border-[#E5E5E5] pt-4 flex flex-col gap-4">
      <div className="relative">
        <Input
          placeholder="Search..."
          className="text-[#A3A3A3] placeholder:text-[#A3A3A3] font-inter text-[15px] h-10 ps-10"
        />
        <Search
          width={16}
          className="absolute top-0 bottom-0 m-auto left-[12px] text-[#A3A3A3]"
        />
      </div>
      <ScrollArea
        className="max-h-[330px] overflow-y-auto overflow-x-hidden"
        id="scroll"
      >
        <div className="flex flex-col gap-3">
          {messageView.map((data: any, index: number) => {
            return (
              <div
                className="flex items-center justify-between pb-3 last:pb-0 border-b last:border-none border-[#E5E5E5]"
                key={index}
              >
                <div className="flex gap-3 items-center">
                  <div className="min-w-10 min-h-10 w-10 h-10 rounded-full overflow-hidden">
                    <img src={profile_image} alt="" className="" />
                  </div>
                  <div className="">
                    <h5 className="text-lg font-abhaya font-semibold text-black">
                      {data.name}
                    </h5>
                    <p className="text-sm font-abhaya font-semibold text-[#606060]">
                      {data.message}
                    </p>
                  </div>
                </div>
                <div className="text-sm font-abhaya font-semibold text-[#606060]">
                  <span>{data.date}</span>
                </div>
              </div>
            );
          })}
        </div>
      </ScrollArea>
    </div>
  );
};

export default EmployeeMessagViewList;

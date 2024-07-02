import { Dot, MessageCircle, ThumbsDown, ThumbsUp } from "lucide-react";
import Profile_img from "@/assets/images/face_1.jfif";
import Profile_img_1 from "@/assets/images/face_2.jfif";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import MessageList from "./MessageList";

const ForumPage = () => {
  const messageDetails = [
    {
      image: Profile_img,
      employeeName: "Comment Person Name",
      message:
        "Compared to other energy sources, the installation and running costs of wind power facilities are very low. However, building a wind farm does produce a certain amount of carbon emissions as well as other greenhouse gases. Research has shown that an average wind turbine balances out its carbon footprint within the first 5-7 months and generates zero-emission electricity for the rest of its 30 year lifespan. With technological improvements and the electrification of transport, CO2 emissions are expected to be reduced even further.",
      reply: "Few minutes ago",
      replyMessage: [
        {
          image: Profile_img_1,
          message: "Reply to Comment Person Name...",
        },
      ],
    },
    {
      image: Profile_img,
      employeeName: "Comment Person Name",
      message:
        "Compared to other energy sources, the installation and running costs of wind power facilities are very low. However, building a wind farm does produce a certain amount of carbon emissions as well as other greenhouse gases. Research has shown that an average wind turbine balances out its carbon footprint within the first 5-7 months and generates zero-emission electricity for the rest of its 30 year lifespan. With technological improvements and the electrification of transport, CO2 emissions are expected to be reduced even further.",
      reply: "1 Day ago",
      replyMessage: [],
    },
    {
      image: Profile_img,
      employeeName: "Comment Person Name",
      message:
        "Compared to other energy sources, the installation and running costs of wind power facilities are very low. However, building a wind farm does produce a certain amount of carbon emissions as well as other greenhouse gases. Research has shown that an average wind turbine balances out its carbon footprint within the first 5-7 months and generates zero-emission electricity for the rest of its 30 year lifespan. With technological improvements and the electrification of transport, CO2 emissions are expected to be reduced even further.",
      reply: "1 Day ago",
      replyMessage: [],
    },
    {
      image: Profile_img,
      employeeName: "Comment Person Name",
      message:
        "Compared to other energy sources, the installation and running costs of wind power facilities are very low. However, building a wind farm does produce a certain amount of carbon emissions as well as other greenhouse gases. Research has shown that an average wind turbine balances out its carbon footprint within the first 5-7 months and generates zero-emission electricity for the rest of its 30 year lifespan. With technological improvements and the electrification of transport, CO2 emissions are expected to be reduced even further.",
      reply: "2 Day ago",
      replyMessage: [],
    },
  ];
  return (
    <div className="">
      <div className="xl:px-6 px-4 py-3 border border-[#D9D9D9] rounded-lg mb-5">
        <h5 className="text-base text-black font-normal pb-2.5">
          Module: Chapter 1 - Intro
        </h5>
        <div className="flex items-center gap-4">
          <h5 className="text-[#5B5B5B]">Section : 3</h5>
          <h5 className="text-[#5B5B5B] flex items-center gap-2">
            <span className="text-black flex items-center font-bold">
              <Dot /> 50m
            </span>{" "}
            Reading
          </h5>
        </div>
      </div>

      <div className="flex flex-col gap-5 shadow xl:px-6 px-4 xl:py-5 py-3 rounded-lg mb-5">
        <div className="flex gap-4 items-center">
          <div className="w-[42px] h-[42px] rounded-full overflow-hidden">
            <img src={Profile_img} alt="" />
          </div>
          <div className="">
            <h5 className="text-black text-base font-abhaya">User Name Here</h5>
            <h6 className="text-[#5B5B5B] text-xs font-inter">Trainer Admin</h6>
          </div>
        </div>
        <Textarea
          placeholder="Post Your Question"
          rows={5}
          className="w-full border-border-[#D9D9D9] text-[#A3A3A3] py-5 px-4 placeholder:text-[#A3A3A3] rounded-lg text-base"
        />
        <div className="text-right">
          <Button className="bg-[#42A7C3] text-xs">Post Question</Button>
        </div>
      </div>

      <div className="border border-[#D9D9D9] rounded-lg mb-5">
        <div className="xl:px-6 px-4 xl:py-4 py-3 border-b border-[#D9D9D9]">
          <h3 className="text-lg text-black pb-2.5 font-bold font-inter">
            How long does it take for a wind turbine to balance out the carbon
            emissions caused by its production?
          </h3>
          <div className="flex gap-4 items-center">
            <div className="w-[42px] h-[42px] rounded-full overflow-hidden">
              <img src={Profile_img} alt="" />
            </div>
            <div className="">
              <h5 className="text-black text-base font-abhaya">
                User Name Here
              </h5>
              <div className="flex gap-2.5">
                <h6 className="text-[#5B5B5B] text-xs font-inter">
                  Trainer Admin
                </h6>
                <h6 className="text-[#5B5B5B] text-xs font-inter">
                  2 Day’s ago
                </h6>
              </div>
            </div>
          </div>
        </div>
        <div className="px-6 py-3 border-b border-[#D9D9D9]">
          <ul className="flex items-center gap-7">
            <li className="text-base text-[#606060] font-inter flex items-center gap-2 cursor-pointer group">
              <ThumbsUp className="group-hover:text-[#00778B] text-[#A3A3A3]" />{" "}
              Like (20){" "}
            </li>
            <li className="text-base text-[#606060] font-inter flex items-center gap-2 cursor-pointer group">
              <ThumbsDown className="group-hover:text-[#00778B] text-[#A3A3A3]" />
              Dislike (0)
            </li>
            <li className="text-base text-[#606060] font-inter flex items-center gap-2 cursor-pointer group">
              <MessageCircle className="group-hover:text-[#00778B] text-[#A3A3A3]" />
              Comments (10)
            </li>
          </ul>
        </div>
        <div className="xl:px-6 px-4 py-3">
          <div className="flex flex-col gap-5">
            {messageDetails.map((data, index) => {
              return <MessageList data={data} key={index} />;
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForumPage;

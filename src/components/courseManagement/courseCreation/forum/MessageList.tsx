import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type MessageDetailsProps = {
  data: {
    image: string;
    employeeName: string;
    message: string;
    reply: string;
    replyMessage: {
      image: string;
      message: string;
    }[];
  };
};

const MessageList = ({ data }: MessageDetailsProps) => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-4">
        <div className="min-w-[30px] w-[30px] min-h-[30px] h-[30px] rounded-full overflow-hidden">
          <img src={data.image} alt="profile img" />
        </div>
        <div className="flex flex-col gap-2">
          <div className="bg-[#F5F7FF] rounded-lg py-2.5 px-4">
            <h5 className="font-inter text-sm tetx-black font-semibold pb-1.5">
              {data.employeeName}
            </h5>
            <p className="text-black text-xs font-inter">{data.message}</p>
          </div>
          <div className="">
            <div className="flex items-center gap-6 text-[#606060] text-xs">
              {data.reply}
              <Button className="cursor-pointer text-xs p-0 bg-transparent text-black font-inter h-4">
                Reply
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className="xl:ms-[35px] ms-[25px]">
        {data.replyMessage.map((item: any, index: number) => {
          return (
            <div className="flex gap-4" key={index}>
              <div className="min-w-[30px] w-[30px] min-h-[30px] h-[30px] rounded-full overflow-hidden">
                <img src={data.image} alt="profile img" />
              </div>
              <div className="bg-[#F5F7FF] rounded-lg py-2.5 px-4 w-full">
                <Input
                  placeholder={item.message}
                  className="border-none bg-transparent text-black text-sm font-inter px-0 placeholder:text-black"
                />
                <div className="text-right">
                  <Button className="bg-[#42A7C3] text-xs px-5 h-[38px]">
                    Post
                  </Button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MessageList;

import { AccordionOption } from "@/types";
import Accordions from "../comman/Accordions";
import EmployeeMessagView from "./EmployeeMessagView";
import EmployeeMessagViewList from "./EmployeeMessagViewList";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import profile_img from "@/assets/images/face_1.jfif";

const EmployeeMessaging = () => {
  const accData: AccordionOption[] = [
    {
      title: <EmployeeMessagView />,
      content: <EmployeeMessagViewList />,
    },
  ];
  return (
    <>
      <div className="shadow w-[335px] lg:block hidden">
        <Accordions
          items={accData}
          rounded={false}
          padding={false}
          className="mt-0"
        />
      </div>
      <div className="lg:hidden block">
        <Popover>
          <PopoverTrigger>
            <div className="w-10 h-10 rounded-full overflow-hidden bg-transparent">
              <img src={profile_img} alt="profile img" />
            </div>
          </PopoverTrigger>
          <PopoverContent align="end" className="px-4 pb-4 w-[335px]">
            <EmployeeMessagViewList />
          </PopoverContent>
        </Popover>
      </div>
    </>
  );
};

export default EmployeeMessaging;

import { useChatBotContext } from "@/context/chatBotContext";
import { AccordionOption } from "@/types";
import Accordions from "../comman/Accordions";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import EmployeeMessagView from "./EmployeeMessagView";
import EmployeeMessagViewList from "./EmployeeMessagViewList";

const EmployeeMessaging = () => {
  const { open } = useChatBotContext();

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
          itemsClass="p-0"
          contentClassName="p-0"
          isChangeIcon={true}
          value={open ? "message__chat" : undefined}
        />
      </div>
      <div className="lg:hidden block">
        <Popover>
          <PopoverTrigger>
            <EmployeeMessagView />
          </PopoverTrigger>
          <PopoverContent
            align="end"
            className="w-[335px] sm:min-h-[350px] min-h-[200px]"
          >
            <EmployeeMessagViewList />
          </PopoverContent>
        </Popover>
      </div>
    </>
  );
};

export default EmployeeMessaging;

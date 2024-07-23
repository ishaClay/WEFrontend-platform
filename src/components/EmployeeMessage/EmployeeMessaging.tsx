import { AccordionOption } from "@/types";
import Accordions from "../comman/Accordions";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import EmployeeMessagView from "./EmployeeMessagView";
import EmployeeMessagViewList from "./EmployeeMessagViewList";

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
          itemsClass="p-0"
          contentClassName="p-0"
        />
      </div>
      <div className="lg:hidden block">
        <Popover>
          <PopoverTrigger>
            <EmployeeMessagView />
          </PopoverTrigger>
          <PopoverContent
            align="end"
            className="px-4 pb-4 w-[335px] min-h-[350px]"
          >
            <EmployeeMessagViewList />
          </PopoverContent>
        </Popover>
      </div>
    </>
  );
};

export default EmployeeMessaging;

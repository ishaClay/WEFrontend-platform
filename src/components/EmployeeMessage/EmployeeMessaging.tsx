import { AccordionOption } from "@/types";
import Accordions from "../comman/Accordions";
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
    <div className="w-[335px] shadow">
      <Accordions items={accData} rounded={false} />
    </div>
  );
};

export default EmployeeMessaging;

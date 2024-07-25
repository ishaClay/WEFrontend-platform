import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ChevronLeft, ChevronRight, CirclePlus } from "lucide-react";
import moment from "moment";
import { useState } from "react";
import {
  Calendar,
  momentLocalizer,
  ToolbarProps,
  View,
} from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useNavigate } from "react-router-dom";

const initialEvents = [
  {
    id: 1,
    title: "Team Meeting",
    start: new Date(2024, 6, 19, 10, 0, 0),
    end: new Date(2024, 6, 19, 12, 0, 0),
  },
  {
    id: 2,
    title: "Project Review",
    start: new Date(2024, 6, 20, 14, 0, 0),
    end: new Date(2024, 6, 20, 16, 0, 0),
  },
];

const LiveSessionsCalendar = () => {
  const navigate = useNavigate();
  const localizer = momentLocalizer(moment);
  const pathName = window.location.pathname;
  const currentUser = pathName.split("/")[1];

  const [currentDate, setCurrentDate] = useState<Date | undefined>(new Date());

  const CustomToolbar: React.FC<ToolbarProps> = ({ onView, view }) => {
    const handleViewChange = (e: string) => {
      const viewEnumValue: View = e as View;
      onView(viewEnumValue);
    };

    const gotoToday = () => {
      setCurrentDate(new Date());
    };

    const gotoNext = () => {
      let nextDate;
      if (view === "day") {
        nextDate = moment(currentDate).add(1, "day").toDate();
      } else if (view === "week") {
        nextDate = moment(currentDate).add(1, "week").toDate();
      } else if (view === "month") {
        nextDate = moment(currentDate).add(1, "month").toDate();
      }
      setCurrentDate(nextDate);
    };

    const gotoPrevious = () => {
      let previousDate;
      if (view === "day") {
        previousDate = moment(currentDate).subtract(1, "day").toDate();
      } else if (view === "week") {
        previousDate = moment(currentDate).subtract(1, "week").toDate();
      } else if (view === "month") {
        previousDate = moment(currentDate).subtract(1, "month").toDate();
      }
      setCurrentDate(previousDate);
    };
    const viewOptions: string[] = Object.keys({
      month: true,
      week: true,
      day: true,
    });

    return (
      <div className="flex sm:flex-row flex-col justify-between mb-5 sm:gap-0 gap-4">
        <div className="flex sm:flex-row flex-col sm:items-center items-start md:gap-10 sm:gap-8 gap-4">
          <Button
            className="bg-[#00778B] text-white"
            onClick={() => navigate(`/${currentUser}/schedule-live-session`)}
          >
            <CirclePlus width={16} />
            Add New
          </Button>
          <div className="flex items-center md:gap-5 gap-3">
            <Button
              type="button"
              className="bg-transparent text-[#002A3A]"
              variant="outline"
              onClick={gotoToday}
            >
              Today
            </Button>
            <div className="">
              <Button
                type="button"
                className="bg-transparent text-[#A3A3A3] p-0 mr-2"
                onClick={gotoPrevious}
              >
                <ChevronLeft />
              </Button>
              <Button
                type="button"
                className="bg-transparent text-[#A3A3A3] p-0 mr-2"
                onClick={gotoNext}
              >
                <ChevronRight />
              </Button>
            </div>
            <span className="text-black font-semibold">
              {moment(currentDate).format("MMMM YYYY")}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-[20px]">
          <Select value={view} onValueChange={handleViewChange}>
            <SelectTrigger className="w-[100px]">
              <SelectValue className="w-[100px]" />
            </SelectTrigger>
            <SelectContent className="w-[100px]">
              <SelectGroup>
                {viewOptions?.map((viewOption: string) => (
                  <SelectItem key={viewOption} value={viewOption}>
                    {viewOption}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
    );
  };

  const CustomEvent = ({ event }: { event: any }) => <div>{event.title}</div>;

  return (
    <div className="p-3 bg-white min-h-full">
      {/* <div className="text-[#606060] text-[15px] mb-2">
        All the Live Sessions across your courses, in one calender view
      </div> */}
      <Calendar
        localizer={localizer}
        events={initialEvents}
        components={{ toolbar: CustomToolbar, event: CustomEvent }}
        date={currentDate}
        style={{ height: 800 }}
      />
    </div>
  );
};

export default LiveSessionsCalendar;

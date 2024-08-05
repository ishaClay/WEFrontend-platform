import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { setPath } from "@/redux/reducer/PathReducer";
import { AllLivesessions } from "@/types/liveSession";
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
import { useAppDispatch } from "@/hooks/use-redux";

interface AllLiveSessionsProps {
  allLiveSession: AllLivesessions[];
}

const LiveSessionsCalendar = ({ allLiveSession }: AllLiveSessionsProps) => {
  const dispatch = useAppDispatch();
  const localizer = momentLocalizer(moment);
  const pathName = window.location.pathname;
  const currentUser = pathName?.split("/")[1];

  const [currentDate, setCurrentDate] = useState<Date | undefined>(new Date());

  const calculateEndTime = (
    startTime: string,
    sessionDuration: { hour: string; minute: string }
  ) => {
    const [hours = 1, minutes = 0] = startTime?.split(":").map(Number) || [
      0, 0,
    ];
    const [durationHours = 0, durationMinutes = 0] = sessionDuration
      ? [sessionDuration.hour, sessionDuration.minute].map(Number) || [0, 0]
      : [0, 0];

    let totalMinutes =
      hours * 60 + minutes + durationHours * 60 + durationMinutes;
    let endHours = Math.floor(totalMinutes / 60);
    let endMinutes = totalMinutes % 60;

    if (endHours > 12) {
      endHours -= 12;
    }

    return `${endHours}:${endMinutes < 10 ? "0" : ""}${endMinutes}`;
  };

  const events = allLiveSession?.map((session) => {
    const eventStart = moment(
      session.date + " " + session.startTime + " " + session.startAmPm,
      "YYYY-MM-DD hh:mm A"
    ).toDate();
    const eventEnd = moment(
      session.date +
        " " +
        calculateEndTime(session.startTime, session.sessionDuration) +
        " " +
        session.startAmPm,
      "YYYY-MM-DD hh:mm A"
    ).toDate();

    return {
      start: eventStart,
      end: eventEnd,
      title: "Live Session",
    };
  });

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
            onClick={() => {
              dispatch(
                setPath([
                  { label: "Course Managment", link: null },
                  {
                    label: "Live Session",
                    link: `/${currentUser}/CourseLiveSession`,
                  },
                  {
                    label: "schedule-live-session",
                    link: `/${currentUser}/schedule-live-session`,
                  },
                ])
              );
            }}
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
        events={events}
        components={{ toolbar: CustomToolbar, event: CustomEvent }}
        date={currentDate}
        style={{ height: 800 }}
      />
    </div>
  );
};

export default LiveSessionsCalendar;

import { Button } from "@/components/ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AllLivesessions } from "@/types/liveSession";
import {
  ChevronLeft,
  ChevronRight,
  CirclePlus,
  List,
  NotepadText,
} from "lucide-react";
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

interface AllLiveSessionsProps {
  allLiveSession: AllLivesessions[];
}

const LiveSessionsCalendar = ({ allLiveSession }: AllLiveSessionsProps) => {
  const navigate = useNavigate();
  const localizer = momentLocalizer(moment);
  const pathName = window.location.pathname;
  const currentUser = pathName?.split("/")[1];
  const search = window.location.search;
  const params = new URLSearchParams(search).get("view");

  const [currentDate, setCurrentDate] = useState<Date | undefined>(new Date());

  const changeView = (id: number) => {
    navigate(`${location?.pathname}?view=${id}`, { replace: true });
  };

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
    const sessionDurationMinutes =
      session?.sessionDuration?.hour * 60 + session?.sessionDuration?.minute;

    const eventStart = moment(
      session.date + " " + session.startTime + " " + session.startAmPm,
      "YYYY-MM-DD hh:mm A"
    ).toDate();

    const eventEnd = moment(
      session.date +
        " " +
        calculateEndTime(session.startTime, sessionDurationMinutes) +
        " " +
        session.startAmPm,
      "YYYY-MM-DD hh:mm A"
    ).toDate();

    return {
      start: eventStart,
      end: eventEnd,
      title: session?.liveSecTitle,
      description: session?.description,
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
          <div className="flex rounded-md bg-white border border-[#D9D9D9] overflow-hidden">
            <Button
              className={`uppercase text-base rounded-none bg-transparent text-[#A3A3A3] border-e border-[#D9D9D9] hover:bg-[#00778B] hover:text-white ${
                params === "0" || !params
                  ? "text-[#fff] bg-[#00778B]"
                  : "text-[#A3A3A3]"
              }`}
              onClick={() => changeView(0)}
            >
              <NotepadText />
            </Button>
            <Button
              className={`uppercase text-base rounded-none bg-transparent text-[#A3A3A3] hover:bg-[#00778B] hover:text-white ${
                params === "1" ? "text-[#fff] bg-[#00778B]" : "text-[#A3A3A3]"
              }`}
              onClick={() => changeView(1)}
            >
              <List />
            </Button>
          </div>
        </div>
      </div>
    );
  };

  const CustomEvent = ({ event }: { event: any }) => (
    <HoverCard>
      <HoverCardTrigger asChild>
        <p>{event.title}</p>
      </HoverCardTrigger>
      <HoverCardContent className="w-80">
        <p>Title: {event?.title}</p>
        <p>
          Meeting time: {moment(event?.start).format("hh:mm a")} -{" "}
          {moment(event?.end).format("hh:mm a")}
        </p>
        <p>Description: {event?.description}</p>
      </HoverCardContent>
    </HoverCard>
  );

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
        tooltipAccessor={null}
      />
    </div>
  );
};

export default LiveSessionsCalendar;

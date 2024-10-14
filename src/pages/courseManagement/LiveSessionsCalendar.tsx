import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAppDispatch } from "@/hooks/use-redux";
import { convertUTCToGMT } from "@/lib/utils";
import { setPath } from "@/redux/reducer/PathReducer";
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
  const dispatch = useAppDispatch();
  const localizer = momentLocalizer(moment);
  const pathName = window.location.pathname;
  const currentUser = pathName?.split("/")[1];
  const search = window.location.search;
  const params = new URLSearchParams(search).get("view");

  const [currentDate, setCurrentDate] = useState<Date | undefined>(new Date());

  const changeView = (id: number) => {
    navigate(`${location?.pathname}?view=${id}`, { replace: true });
  };

  const events = allLiveSession?.map((session) => {
    const sessionDurationMinutes = session?.sessionDuration;

    const eventStart = convertUTCToGMT(session.startTime);

    const eventEnd = convertUTCToGMT(session.startTime).add(
      sessionDurationMinutes,
      "minutes"
    );

    return {
      start: eventStart,
      end: eventEnd,
      title: session?.subtitle,
      description: session?.description,
      zoomlink: session?.zoomApiBaseUrl,
      courseTitle: session?.course?.title,
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
        nextDate = convertUTCToGMT(currentDate || "")
          .add(1, "day")
          .toDate();
      } else if (view === "week") {
        nextDate = convertUTCToGMT(currentDate || "")
          .add(1, "week")
          .toDate();
      } else if (view === "month") {
        nextDate = convertUTCToGMT(currentDate || "")
          .add(1, "month")
          .toDate();
      }
      setCurrentDate(nextDate);
    };

    const gotoPrevious = () => {
      let previousDate;
      if (view === "day") {
        previousDate = convertUTCToGMT(currentDate || "")
          .subtract(1, "day")
          .toDate();
      } else if (view === "week") {
        previousDate = convertUTCToGMT(currentDate || "")
          .subtract(1, "week")
          .toDate();
      } else if (view === "month") {
        previousDate = convertUTCToGMT(currentDate || "")
          .subtract(1, "month")
          .toDate();
      }
      setCurrentDate(previousDate);
    };
    const viewOptions: string[] = Object.keys({
      month: true,
      week: true,
      day: true,
    });

    return (
      <div
        id="toolBar"
        className="flex sm:flex-row flex-col justify-between mb-5 sm:gap-0 gap-4"
      >
        <div className="flex sm:flex-row flex-col sm:items-center items-start md:gap-10 sm:gap-8 gap-4">
          <Button
            className="bg-[#00778B] text-white"
            onClick={() => {
              dispatch(
                setPath([
                  { label: "Course Management", link: null },
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
            ADD NEW
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
              {convertUTCToGMT(currentDate).format(
                view !== "day" ? "MMMM YYYY" : "DD MMMM YYYY"
              )}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-[20px]">
          <Select value={view} onValueChange={handleViewChange}>
            <SelectTrigger className="w-[100px] capitalize">
              <SelectValue className="w-[100px] " />
            </SelectTrigger>
            <SelectContent className="w-[100px]">
              <SelectGroup>
                {viewOptions?.map((viewOption: string) => (
                  <SelectItem
                    key={viewOption}
                    value={viewOption}
                    className="capitalize"
                  >
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

  const CustomEvent = ({ event }: { event: any }) => {
    if (event?.courseTitle === "test081002") {
    }
    return (
      <Dialog>
        <DialogTrigger className="w-full text-left h-full">
          <p className="cursor-pointer max-w-[200px] w-full line-clamp-1">
            {event?.courseTitle + " - " + event.title}
          </p>
        </DialogTrigger>
        <DialogContent showCloseButton={true}>
          <h3 className="mb-2 text-wrap">
            <strong>Title:</strong> {event?.courseTitle + " - " + event.title}
          </h3>
          <p className="mb-2">
            <strong>Meeting time:</strong> {event?.start.format("hh:mm a")} -
            {event?.end.format("hh:mm a")}
          </p>
          <ScrollArea className="max-h-[500px]">
            <p className="mb-2 text-wrap max-w-[450px] break-words">
              <strong>Description:</strong> {event?.description}
            </p>
          </ScrollArea>
          <Button
            disabled={
              !convertUTCToGMT().isBetween(
                convertUTCToGMT(event?.start),
                convertUTCToGMT(event?.end),
                "minute",
                "[)"
              )
            }
            onClick={() => window.open(event?.zoomlink, "_blank")}
          >
            Join Meeting
          </Button>
        </DialogContent>
      </Dialog>
    );
  };

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

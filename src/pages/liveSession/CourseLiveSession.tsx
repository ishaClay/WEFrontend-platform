import TotalLiveSessionsPage from "@/components/courseManagement/TotalLiveSessions/TotalLiveSessionsPage";
import { Button } from "@/components/ui/button";
import { List, NotepadText } from "lucide-react";
import LiveSessionsCalendar from "../courseManagement/LiveSessionsCalendar";
import { useNavigate } from "react-router-dom";

const CourseLiveSession = () => {
  const search = window.location.search;
  const params = new URLSearchParams(search).get("view");
  const navigate = useNavigate();

  const changeView = (id: number) => {
    navigate(`${location?.pathname}?view=${id}`, { replace: true });
  };

  return (
    <div className="rounded-xl bg-white">
      <div className="flex sm:flex-row flex-col justify-between sm:items-center items-start sm:gap-0 gap-3 sm:px-6 p-4 sm:py-5 border-b border-[#D9D9D9]">
        <h5 className="text-base font-abhaya text-black font-bold">
          Schedule Live Session
        </h5>

        <div className="flex items-center gap-7">
          <Button className="bg-[#00778B] uppercase text-base">Add New</Button>
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

      {params === "0" || !params ? (
        <div className="">
          <LiveSessionsCalendar />
        </div>
      ) : (
        <div className="">
          <TotalLiveSessionsPage />
        </div>
      )}
    </div>
  );
};

export default CourseLiveSession;

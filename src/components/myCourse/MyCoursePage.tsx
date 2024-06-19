import { Button } from "../ui/button";
import { AiOutlineAppstore, AiOutlineBars } from "react-icons/ai";
import SelectMenu from "../comman/SelectMenu";
import { useState } from "react";
import { Label } from "../ui/label";
import { useNavigate } from "react-router-dom";

const filterOption = [
  {
    label: "ABC",
    value: "Abc",
  },
  {
    label: "AC",
    value: "Ac",
  },
  {
    label: "DC",
    value: "Dc",
  },
];

const filter1Option = [
  {
    label: "InProgress",
    value: "1",
  },
  {
    label: "Pending",
    value: "2",
  },
  {
    label: "Compalate",
    value: "3",
  },
];

const MyCoursePage = () => {
  const [selectFilterByCategory, setSelectFilterByCategory] = useState("");
  const [selectFilterByStatus, setSelectFilterByStatus] = useState("");
  const search = window.location.search;
  const params = new URLSearchParams(search).get("view");
  const navigate = useNavigate();

  const changeView = (id: number) => {
    navigate(`/trainer/mycourses?view=${id}`, { replace: true });
  };

  const myPagesList = [{}];
  console.log("++++++++", myPagesList);
  return (
    <div className="bg-white">
      <div className="flex items-center justify-between py-[18px] px-[18px] bg-[#F3F3F3]">
        <div className="flex items-center gap-8">
          <div>
            <Label className="text-xs font-normal font-Poppins mt-0">
              Filter By
            </Label>
            <SelectMenu
              option={filterOption}
              setValue={(data: string) => setSelectFilterByCategory(data)}
              value={selectFilterByCategory}
              className="w-[176px] h-[36px] text-sm font-normal font-Poppins text-black border border-[#A3A3A3]"
              placeholder="Select Filter"
            />
          </div>
          <div>
            <Label className="text-xs font-normal font-Poppins mt-0">
              Filter By
            </Label>
            <SelectMenu
              option={filter1Option}
              setValue={(data: string) => setSelectFilterByStatus(data)}
              value={selectFilterByStatus}
              className="w-[176px] h-[36px] text-sm font-normal font-Poppins text-black border border-[#A3A3A3]"
              placeholder="Select Filter"
            />
          </div>
        </div>
        <div className="flex ml-6">
          <Button
            type="button"
            onClick={() => changeView(0)}
            className="bg-transparent p-1 hover:bg-transparent"
          >
            <AiOutlineAppstore
              className={`w-8 h-8 ${
                params === "0" || !params ? "text-[#00778B]" : "text-[#A3A3A3]"
              }`}
            />
          </Button>
          <Button
            type="button"
            onClick={() => changeView(1)}
            className="bg-transparent p-1 hover:bg-transparent"
          >
            <AiOutlineBars
              className={`w-8 h-8 ${
                params === "1" ? "text-[#00778B]" : "text-[#A3A3A3]"
              }`}
            />
          </Button>
        </div>
      </div>
      {params === "0" || !params ? (
        <div className="m-3 w-full md:w-[386px] border border-solid border-[#D9D9D9] rounded">
          <div className="relative overflow-hidden rounded">
            <img
              className="w-full h-[231px] rounded object-cover object-center"
              src="/public/assets/img/nature.png"
              alt="Course"
            />
            <div className="flex items-center absolute bottom-0 left-[220px] w-30 rounded-full py-1 px-2 mb-4 ml-8">
              <button className="bg-[#00778B] text-white font-medium py-2 px-4 rounded-lg shadow h-[50px] w-[105px]">
                Continue
              </button>
            </div>
          </div>
          <div className="w-full mt-[5px] ml-[15px]">
            <p className="text-[16px] font-semibold">
              Certificate in the Sustainable...
            </p>
          </div>
          <div className="flex mt-2">
            <div className="text-[20px] text-[#00778B] font-bold ml-[15px]">
              {30}%
            </div>
            <div className="text-[12px] ml-[175px] mt-2">1 of 5 Completed</div>
          </div>
          <div className="w-[90%] lg:w-[310px] h-[8px] bg-[#E8E8E8] rounded-lg ml-[15px] mt-2">
            <div
              className="h-[8px] bg-[#00778B] text-white rounded-lg text-[10px] text-center"
              style={{ width: "25%" }}
            />
          </div>
          <div className="flex flex-wrap gap-6 p-4">
            <button className="bg-[#FFD56A] text-[#3A3A3A] rounded-full h-[28px] w-[110px]">
              Environmental
            </button>
            <button className="bg-[#FFD56A] text-[#3A3A3A] rounded-full h-[28px] w-[95px]">
              Governance
            </button>
            <button className="bg-[#D6F5AC] text-[#3A3A3A] rounded-full h-[28px] w-[54px]">
              Social
            </button>
          </div>
          <div className="flex flex-wrap gap-2 p-2">
            <div className="flex items-center gap-1">
              <img
                className="h-[16px] w-[18px]"
                src="/public/assets/img/timer.png"
                alt="Course"
              />
              <p className="text-xs">Level- Advanced</p>
            </div>
            <div className="flex items-center gap-1 ml-2">
              <img
                className="h-[16px] w-[18px]"
                src="/public/assets/img/diploma.png"
                alt="Course"
              />
              <p className="text-xs">Post Graduate Diploma</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2 p-2">
            <div className="flex items-center gap-1">
              <img
                className="h-[16px] w-[18px]"
                src="/public/assets/img/fulltime.png"
                alt="Course"
              />
              <p className="text-xs">Full Time</p>
            </div>
            <div className="flex items-center gap-1 ml-2">
              <img
                className="h-[16px] w-[18px]"
                src="/public/assets/img/online.png"
                alt="Course"
              />
              <p className="text-xs">Online</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2 p-2">
            <div className="flex items-center gap-1">
              <img
                className="h-[16px] w-[18px]"
                src="/public/assets/img/time.png"
                alt="Course"
              />
              <p className="text-xs">2 Years</p>
            </div>
            <div className="flex items-center gap-1 ml-2">
              <img
                className="h-[16px] w-[18px]"
                src="/public/assets/img/unversity.png"
                alt="Course"
              />
              <p className="text-xs">Atlantic Technological University</p>
            </div>
          </div>
        </div>
      ) : (
        <>Hello</>
      )}
    </div>
  );
};

export default MyCoursePage;

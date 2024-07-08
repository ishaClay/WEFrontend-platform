import CourseImage from "@/assets/images/Course_image.png";
import { useState } from "react";
import { AiOutlineAppstore, AiOutlineBars } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import SelectMenu from "../comman/SelectMenu";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import MyCourseGrid from "./MyCourseGrid";
import MyCourseList from "./MyCourseList";

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

  console.log("+++++++++++++++++", window.location.pathname?.split("/")[1]);

  const changeView = (id: number) => {
    navigate(
      `/${window.location.pathname?.split("/")[1]}/mycourses?view=${id}`,
      { replace: true }
    );
  };

  const myPagesList = [
    {
      image: CourseImage,
      title:
        "Certificate in the Sustainable Development Goals, Partnership, People, Planet and Prosperity",
    },
    {
      image: CourseImage,
      title:
        "Certificate in the Sustainable Development Goals, Partnership, People, Planet and Prosperity",
    },
    {
      image: CourseImage,
      title:
        "Certificate in the Sustainable Development Goals, Partnership, People, Planet and Prosperity",
    },
    {
      image: CourseImage,
      title:
        "Certificate in the Sustainable Development Goals, Partnership, People, Planet and Prosperity",
    },
    {
      image: CourseImage,
      title:
        "Certificate in the Sustainable Development Goals, Partnership, People, Planet and Prosperity",
    },
    {
      image: CourseImage,
      title:
        "Certificate in the Sustainable Development Goals, Partnership, People, Planet and Prosperity",
    },
  ];

  return (
    <div className="lg:bg-white bg-transparent rounded-b-xl">
      <div className="flex items-center justify-between sm:p-[18px] p-[15px] bg-[#F3F3F3] rounded-lg">
        <div className="flex items-center sm:gap-8 gap-[10px]">
          <div>
            <Label className="text-xs font-normal font-Poppins mt-0">
              Filter By
            </Label>
            <SelectMenu
              option={filterOption}
              setValue={(data: string) => setSelectFilterByCategory(data)}
              value={selectFilterByCategory}
              className="sm:w-[176px] w-[183px] h-[36px] sm:text-sm text-xs font-normal font-Poppins text-black border border-[#A3A3A3]"
              placeholder="Environment"
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
              className="sm:w-[176px] w-[112px] h-[36px] sm:text-sm text-xs font-normal font-Poppins text-black border border-[#A3A3A3] sm:px-3 px-[6px]"
              placeholder="In progress"
            />
          </div>
        </div>
        <div className="sm:flex hidden ml-6">
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
        <div className="grid sm:gap-5 gap-[15px] 2xl:grid-cols-4 xl:grid-cols-3 sm:grid-cols-2 grid-cols-1 sm:p-5 p-[15px] bg-white">
          {myPagesList.map((grid, index) => {
            return <MyCourseGrid key={index} grid={grid} />;
          })}
        </div>
      ) : (
        <>
          <div className="p-5 bg-white">
            {myPagesList.map((list, index) => {
              return <MyCourseList key={index} list={list} />;
            })}
          </div>
        </>
      )}
    </div>
  );
};

export default MyCoursePage;

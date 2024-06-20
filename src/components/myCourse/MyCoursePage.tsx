import { Button } from "../ui/button";
import { AiOutlineAppstore, AiOutlineBars } from "react-icons/ai";
import SelectMenu from "../comman/SelectMenu";
import { useState } from "react";
import { Label } from "../ui/label";
import { useNavigate } from "react-router-dom";
import CourseImage from "@/assets/images/Course_image.png";
import { Badge } from "../ui/badge";
import MyCourseGrid from "./MyCourseGrid";

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

  const myPagesList = [
    {
      image: CourseImage,
      title: "Certificate in the Sustainable Develop...",
    },
    {
      image: CourseImage,
      title: "Certificate in the Sustainable Develop...",
    },
    {
      image: CourseImage,
      title: "Certificate in the Sustainable Develop...",
    },
    {
      image: CourseImage,
      title: "Certificate in the Sustainable Develop...",
    },
    {
      image: CourseImage,
      title: "Certificate in the Sustainable Develop...",
    },
    {
      image: CourseImage,
      title: "Certificate in the Sustainable Develop...",
    },
  ];

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
        <div className="grid gap-5 2xl:grid-cols-4 xl:grid-cols-3 grid-cols-2 p-5">
          {myPagesList.map((list, index) => {
            return <MyCourseGrid key={index} list={list} />;
          })}
        </div>
      ) : (
        <>Hello</>
      )}
    </div>
  );
};

export default MyCoursePage;

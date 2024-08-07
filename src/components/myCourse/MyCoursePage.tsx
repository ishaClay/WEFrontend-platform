import { useAppSelector } from "@/hooks/use-redux";
import { QUERY_KEYS } from "@/lib/constants";
import { getAllEmployeeCourseList } from "@/services/apiServices/courseManagement";
import { fetchClientwisePillarList } from "@/services/apiServices/pillar";
import { MyCourseResponse } from "@/types/courseManagement";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { AiOutlineAppstore, AiOutlineBars } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import Loader from "../comman/Loader";
import SelectMenu from "../comman/SelectMenu";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import MyCourseGrid from "./MyCourseGrid";
import MyCourseList from "./MyCourseList";

const filter1Option = [
  {
    label: "In Progress",
    value: "In Progress",
  },
  {
    label: "Completed",
    value: "Completed",
  },
  {
    label: "Upcoming courses",
    value: "Upcoming",
  },
];

const MyCoursePage = () => {
  const [selectFilterByCategory, setSelectFilterByCategory] = useState("");
  const [selectFilterByStatus, setSelectFilterByStatus] = useState("");
  const search = window.location.search;
  const params = new URLSearchParams(search).get("view");
  const navigate = useNavigate();
  const { CompanyId, clientId } = useAppSelector((state) => state.user);
  const userData = JSON.parse(localStorage.getItem("user") as string);
  const userID = CompanyId
    ? CompanyId
    : userData?.query
    ? userData?.query?.detailsid
    : userData?.detailsid;

  const changeView = (id: number) => {
    navigate(
      `/${window.location.pathname?.split("/")[1]}/mycourses?view=${id}`,
      { replace: true }
    );
  };

  const { data: clientwisePillarList } = useQuery({
    queryKey: [QUERY_KEYS.clientwisePillarList],
    queryFn: () => fetchClientwisePillarList(clientId?.toString()),
  });

  const { data, isLoading } = useQuery<MyCourseResponse>({
    queryKey: [
      QUERY_KEYS?.myCourses,
      {
        id: userID,
        status: selectFilterByStatus,
        categories: selectFilterByCategory,
      },
    ],
    queryFn: () =>
      getAllEmployeeCourseList({
        id: userID,
        status: selectFilterByStatus,
        categories:
          selectFilterByCategory === "all" ? "" : selectFilterByCategory,
      }),
  });

  const pillerFilterOption = [
    { label: "All", value: "all" },
    ...(clientwisePillarList?.data?.data?.map((itm) => {
      return {
        label: itm?.pillarName,
        value: itm?.pillarName,
      };
    }) || []),
  ];

  useEffect(() => {
    if (pillerFilterOption) {
      setSelectFilterByCategory(pillerFilterOption[0]?.value);
    }
  }, []);

  return (
    <div className="lg:bg-white bg-transparent rounded-b-xl">
      <div className="flex items-center justify-between sm:p-[18px] p-[15px] bg-[#F3F3F3] rounded-lg">
        <div className="flex items-center sm:gap-8 gap-[10px]">
          <div>
            <Label className="text-xs font-normal font-Poppins mt-0">
              Filter By
            </Label>
            <SelectMenu
              option={pillerFilterOption || []}
              setValue={(data: string) => setSelectFilterByCategory(data)}
              value={selectFilterByCategory}
              className="sm:w-[176px] w-[183px] h-[36px] sm:text-sm text-xs font-normal font-Poppins text-black border border-[#A3A3A3]"
              placeholder="Filter By Piller"
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
              placeholder="Filter By Status"
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
          {isLoading ? (
            <Loader containerClassName="col-span-full" />
          ) : data?.data?.courseAlloted?.length ? (
            data?.data?.courseAlloted?.map((grid, index) => {
              return (
                <MyCourseGrid
                  key={index}
                  grid={grid}
                  selectFilterByCategory={selectFilterByCategory}
                />
              );
            })
          ) : (
            <p className="col-span-full h-[300px] text-[16px] text-[#A3A3A3] flex items-center justify-center">
              No Course
            </p>
          )}
        </div>
      ) : (
        <>
          <div className="p-5 bg-white">
            {isLoading ? (
              <Loader containerClassName="col-span-full" />
            ) : data?.data?.courseAlloted?.length ? (
              data?.data?.courseAlloted.map((list, index) => {
                return (
                  <MyCourseList
                    key={index}
                    list={list}
                    selectFilterByCategory={selectFilterByCategory}
                  />
                );
              })
            ) : (
              <p className="col-span-full h-[300px] text-[16px] text-[#A3A3A3] flex items-center justify-center">
                No Course
              </p>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default MyCoursePage;

/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Button } from "@/components/ui/button";
import { QUERY_KEYS } from "@/lib/constants";

import advanceGreen from "@/assets/images/advanceGreen.svg";
import apply from "@/assets/images/apply.svg";
import develop from "@/assets/images/develop.svg";
import planAction from "@/assets/images/planAction.svg";
import selfAssess from "@/assets/images/selfAssess.svg";
import Loader from "@/components/comman/Loader";
import HomeFooter from "@/components/homePage/HomeFooter";
import HomeHeader from "@/components/homePage/HomeHeader";
import PillerCard from "@/components/MaturityAssessment/Roadmap/PillerCard";
import { useAppDispatch, useAppSelector } from "@/hooks/use-redux";
import { setPath } from "@/redux/reducer/PathReducer";
import { setMaturitypillar } from "@/redux/reducer/PillarReducer";
import { enumUpadate } from "@/services/apiServices/enum";
import { fetchMaturityPillar } from "@/services/apiServices/pillar";
import {
  AllActionDataPillerWise,
  AllActionDataPillerWiseResult,
} from "@/types/MaturityLavel";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import Correct from "/assets/img/Correct.png";

const paths = [
  {
    name: "Self-assess",
    img: selfAssess,
    status: "indeterminate",
  },
  {
    name: "Plan Action",
    img: planAction,
    status: "pending",
  },
  {
    name: "Develop",
    img: develop,
    status: "pending",
  },
  {
    name: " Apply",
    img: apply,
    status: "pending",
  },
  {
    name: "Advance Your Green",
    img: advanceGreen,
    status: "pending",
  },
];

function SelectLevel() {
  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const pillars = useAppSelector((state) => state.pillar?.maturitypillar);
  const { clientId, UserId } = useAppSelector((state) => state.user);
  const userData = JSON.parse(localStorage.getItem("user") as string);
  const userID = UserId
    ? +UserId
    : userData?.query
    ? userData?.query?.id
    : userData?.id;

  const [checkedStates, setCheckedStates] = useState<
    AllActionDataPillerWiseResult[]
  >([]);
  const [actionItemsList, setActionItemsList] = useState<boolean>(true);

  const { data: maturitypillar, isPending: isPendingPillar } =
    useQuery<AllActionDataPillerWise>({
      queryKey: [QUERY_KEYS.maturitypillar],
      queryFn: () => fetchMaturityPillar(+clientId, userID, "1"),
      enabled: true,
    });
  const path = 5 + 1;
  const { mutate: EnumUpadate, isPending } = useMutation({
    mutationFn: () => enumUpadate({ path: path.toString() }, userID),
    onSuccess: async (data) => {
      await queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.enumUpadateList],
      });
      localStorage.setItem("path", JSON.stringify(data.data.data?.pathStatus));
      navigate("/maturitylevelactionitem");
    },
  });

  const pillarChecked = useMemo(() => {
    return pillars?.filter((item: any) => item.checked === 1);
  }, [pillars]);

  useEffect(() => {
    const fetchMeasuresItems = pillarChecked?.filter(
      (item: any) => item.actionItem?.length === 0
    );
    setActionItemsList(
      fetchMeasuresItems?.length > 0 || pillarChecked?.length === 0
    );
  }, [pillars, pillarChecked]);

  useEffect(() => {
    if (maturitypillar?.data && maturitypillar?.data?.length > 0) {
      dispatch(setMaturitypillar(maturitypillar?.data));
      setCheckedStates(maturitypillar?.data);
    }
  }, [dispatch, maturitypillar?.data]);

  const handleSelect = () => {
    EnumUpadate();
  };

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  return (
    <div>
      <div className="border-b border-[#DED7D7] bg-[#FAFAFA]">
        <HomeHeader />
      </div>
      <div className="xl:max-w-[1124px] max-w-full mx-auto xl:px-0 px-5 pb-3">
        <div
          className={`h-[130px] flex justify-center pb-3 pt-[13px] overflow-x-auto overflow-y-hidden`}
        >
          <div className="relative sm:gap-[80px] gap-[50px] justify-between overflow-auto flex items-center mx-5">
            {paths.map((path, index: number) => {
              return (
                <div
                  className="flex flex-col self-end items-center min-w-[150px] w-[150px]"
                  key={index}
                >
                  {path.status === "checked" ? (
                    <img src={Correct} alt="img" width={59.6} height={59.6} />
                  ) : path.status === "indeterminate" ? (
                    <img src={path.img} alt="img" width={59.6} height={59.6} />
                  ) : (
                    <img src={path.img} alt="img" width={59.6} height={59.6} />
                  )}
                  <p
                    className={`text-[13px] font-medium font-droid px-2 py-[2px] ${
                      path.name === "Engage" ? "bg-[#64A70B] text-[#FFF]" : ""
                    }`}
                  >
                    {path.name}
                  </p>
                </div>
              );
            })}
            <div className="absolute top-1/2 -translate-Y-1/2 left-0 w-[900px] right-0 mx-auto border-2 border-dashed border-[#585858] -z-10"></div>
          </div>
        </div>
        <div className="mb-6 mt-4">
          <h1 className="text-[#3A3A3A] font-extrabold sm:text-2xl text-xl leading-7 font-droid">
            Select the most important sustainability pillars for you now.
            <br /> Then choose an action item(s) for each of them.
          </h1>
          <span className="text-[18px] leading-4 font-droid">
            Not sure what actions to take? Head to ‘
            <Button
              variant={"ghost"}
              className="p-0 h-auto text-[18px] hover:bg-transparent"
              onClick={() => {
                dispatch(
                  setPath([
                    {
                      label: "Course Management",
                      link: null,
                    },
                    {
                      label: "Recommended Courses",
                      link: `/company/coursesrecommended`,
                    },
                  ])
                );
                navigate("/company/coursesrecommended");
              }}
            >
              Recommended Courses
            </Button>{" "}
            ’ on your dashboard to see the available training curated for your
            company.
          </span>
        </div>
        {isPending || isPendingPillar ? (
          <Loader className="w-8 h-8" />
        ) : (
          checkedStates &&
          checkedStates?.map((item) => {
            return (
              <PillerCard
                item={item}
                setCheckedStates={setCheckedStates}
                selectAssessment="1"
              />
            );
          })
        )}
        <div className=" text-center font-font-droid  font-semibold mb-[23px]">
          <p>
            <span className="text-[#F63636]"> An important note:</span> The
            action items you choose here are never fixed.
          </p>

          <p className="mt-[20px]">
            Come back anytime to edit them. But to build your Action Plan,  {" "}
            <br />
            you’ll need to have at least 1 action item defined for each
            sustainability pillar you select.
          </p>
        </div>
        <div className="text-center flex items-center justify-center gap-4">
          <Button
            disabled={actionItemsList}
            onClick={handleSelect}
            isLoading={isPending}
            className="bg-[#64A70B] text-[white] rounded-md lg:text-base text-sm font-extrabold text-center w-[250px] h-[50px]"
          >
            Build My Action Plan
          </Button>
          <Button
            onClick={() => navigate("/company/allcourses")}
            className="bg-[#64A70B] text-[white] rounded-md text-base font-extrabold text-center font-font-droid w-[250px] h-[50px]"
          >
            Go to All Courses
          </Button>
        </div>
      </div>
      <HomeFooter />
    </div>
  );
}

export default SelectLevel;

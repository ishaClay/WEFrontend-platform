/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Button } from "@/components/ui/button";
import { QUERY_KEYS } from "@/lib/constants";

import Loader from "@/components/comman/Loader";
import Header from "@/components/Header";
import HomeFooter from "@/components/homePage/HomeFooter";
import PillerCard from "@/components/MaturityAssessment/Roadmap/PillerCard";
import { useAppSelector } from "@/hooks/use-redux";
import { setMaturitypillar } from "@/redux/reducer/PillarReducer";
import { enumUpadate } from "@/services/apiServices/enum";
import { fetchMaturityPillar } from "@/services/apiServices/pillar";
import {
  AllActionDataPillerWise,
  AllActionDataPillerWiseResult,
} from "@/types/MaturityLavel";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

function SelectLevel() {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
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

  const { data: maturitypillar } = useQuery<AllActionDataPillerWise>({
    queryKey: [QUERY_KEYS.maturitypillar],
    queryFn: () => fetchMaturityPillar(+clientId, userID),
    enabled: true,
  });

  console.log("checkedStates", actionItemsList);

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
    console.log("fetchMeasuresItems", fetchMeasuresItems);

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

  // console.log(actionItems)

  const handleSelect = () => {
    EnumUpadate();
  };

  return (
    <div>
      <div className="border-b border-[#DED7D7] bg-[#FAFAFA]">
        <Header />
      </div>
      <div className="xl:max-w-[1124px] max-w-full mx-auto xl:px-0 px-5 py-3">
        <div className="my-6">
          <h1 className="text-[#3A3A3A] font-extrabold text-2xl leading-7 font-abhaya">
            Which sustainability pillars do you want to advance first? (We'll
            suggest recommended courses after you build first.)
          </h1>
        </div>
        {isPending ? (
          <Loader className="w-8 h-8" />
        ) : (
          checkedStates &&
          checkedStates?.map((item) => {
            return (
              <PillerCard item={item} setCheckedStates={setCheckedStates} />
            );
          })
        )}
        <div className=" text-center font-abhaya  font-semibold mb-[23px]">
          <p>
            <span className="text-[#F63636]"> An important note:</span>{" "}
            nothing’s set in stone here! 
          </p>

          <p className="mt-[20px]">
            Discuss sustainability measures over coffee with your colleagues. 
            <br />
            Come back anytime to edit action items.  <br />
            And tweek-as-needed an action plan that will guide your company. 
          </p>
        </div>
        <div className="text-center flex items-center justify-center gap-4">
          <Button
            disabled={actionItemsList}
            onClick={handleSelect}
            isLoading={isPending}
            className="bg-[#64A70B] text-[white] rounded-md lg:text-base text-sm font-extrabold text-center w-[250px] h-[50px]"
          >
            Got it. Build My Action Plan!
          </Button>
          <Button
            onClick={() => navigate("/company/allcourses")}
            className="bg-[#64A70B] text-[white] rounded-md text-base font-extrabold text-center font-abhaya w-[250px] h-[50px]"
          >
            Go to All Course
          </Button>
        </div>
      </div>
      <HomeFooter />
    </div>
  );
}

export default SelectLevel;

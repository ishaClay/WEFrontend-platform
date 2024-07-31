/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Button } from "@/components/ui/button";
import { QUERY_KEYS } from "@/lib/constants";

import Loader from "@/components/comman/Loader";
import { useAppSelector } from "@/hooks/use-redux";
import { setMaturitypillar } from "@/redux/reducer/PillarReducer";
import { enumUpadate } from "@/services/apiServices/enum";
import { fetchMaturityPillar } from "@/services/apiServices/pillar";
import {
  AllActionDataPillerWise,
  AllActionDataPillerWiseResult,
} from "@/types/MaturityLavel";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Dispatch, useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import PillerCard from "./PillerCard";

const SetTarget = ({
  setStep,
  setIsEdit,
}: {
  setStep: Dispatch<React.SetStateAction<number>>;
  setIsEdit: Dispatch<React.SetStateAction<boolean>>;
}) => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const pillars = useAppSelector((state) => state.pillar?.maturitypillar);
  const { clientId, UserId } = useAppSelector((state) => state.user);
  const userData = JSON.parse(localStorage.getItem("user") as string);
  const userID =
    userData?.query?.role === "4"
      ? userData?.company?.userDetails?.id
      : UserId
      ? +UserId
      : userData?.query
      ? userData?.query?.id
      : userData?.id;

  const [checkedStates, setCheckedStates] = useState<
    AllActionDataPillerWiseResult[]
  >([]);
  const [actionItemsList, setActionItemsList] = useState<boolean>(true);

  const { data: maturitypillar, isPending } = useQuery<AllActionDataPillerWise>(
    {
      queryKey: [QUERY_KEYS.maturitypillar],
      queryFn: () => fetchMaturityPillar(+clientId, userID),
      enabled: true,
    }
  );

  console.log("checkedStates", checkedStates);

  const path = 5 + 1;
  const { mutate: EnumUpadate } = useMutation({
    mutationFn: () => enumUpadate({ path: path.toString() }, userID),
    onSuccess: async (data) => {
      await queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.enumUpadateList],
      });
      localStorage.setItem("path", JSON.stringify(data.data.data?.pathStatus));
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

  // console.log(actionItems)

  const handleSelect = () => {
    EnumUpadate();
    setStep(2);
    setIsEdit(false);
  };

  return (
    <div>
      <div className="h-full w-full max-w-full mx-auto">
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

        <div className="text-center">
          <Button
            disabled={actionItemsList}
            onClick={handleSelect}
            className="bg-[#64A70B] text-[white] rounded-md lg:text-base text-sm font-extrabold text-center w-[200px] h-12"
          >
            Build My Action Plan
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SetTarget;

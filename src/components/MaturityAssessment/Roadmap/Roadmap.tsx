import Stepper from "@/components/comman/Stepper";
import { useAppSelector } from "@/hooks/use-redux";
import { QUERY_KEYS } from "@/lib/constants";
import { fetchMaturityPillar } from "@/services/apiServices/pillar";
import { AllActionDataPillerWise } from "@/types/MaturityLavel";
import { UserRole } from "@/types/UserRole";
import { useQuery } from "@tanstack/react-query";
import React, { Dispatch, SetStateAction, useEffect } from "react";
import Assign from "./Assign";
import SetTarget from "./SetTarget";

const Roadmap = ({
  showButton,
  isEdit,
  setIsEdit,
  selectAssessment,
}: {
  showButton: number;
  isEdit: boolean;
  setIsEdit: Dispatch<SetStateAction<boolean>>;
  selectAssessment: string;
}) => {
  const pathStatus = JSON.parse(localStorage.getItem("path") as string);
  const userData = JSON.parse(localStorage.getItem("user") as string);
  const { clientId, UserId } = useAppSelector((state) => state.user);
  const [step, setStep] = React.useState(3);
  const userID =
    userData?.query?.role === "4"
      ? userData?.company?.userDetails?.id
      : UserId
      ? +UserId
      : userData?.query
      ? userData?.query?.id
      : userData?.id;

  const { data: maturitypillar, isLoading: fetchingMaturitypillar } =
    useQuery<AllActionDataPillerWise>({
      queryKey: [
        QUERY_KEYS.maturitypillar,
        { selectAssessment, clientId, userID },
      ],
      queryFn: () => fetchMaturityPillar(+clientId, userID, selectAssessment),
      enabled: !!selectAssessment,
    });

  useEffect(() => {
    if (
      !isEdit &&
      ((+userData?.query?.role === UserRole?.Company && pathStatus > 5) ||
        showButton !== 0)
    ) {
      setStep(2);
    } else {
      const checkedItem = maturitypillar?.data?.some((item) => item.checked);
      if (checkedItem) {
        setStep(1);
      } else {
        setStep(0);
      }
    }
  }, [maturitypillar?.data, pathStatus]);

  return (
    <div className="">
      <div className="w-full my-[40px]">
        <Stepper
          steps={[
            "Select Pillars (that you want to advance on first)",
            "Define Action Item",
            "Assign",
          ]}
          currentStep={step}
          onChangeStep={setStep}
        />
      </div>
      {step === 0 || step === 1 ? (
        <SetTarget
          setStep={setStep}
          setIsEdit={setIsEdit}
          selectAssessment={selectAssessment}
          maturitypillar={maturitypillar?.data || []}
          isMaturitypillarLoading={fetchingMaturitypillar}
        />
      ) : (
        step === 2 && (
          <div className="w-full">
            <Assign
              setStep={setStep}
              setIsEdit={setIsEdit}
              selectAssessment={selectAssessment}
            />
          </div>
        )
      )}
    </div>
  );
};

export default Roadmap;

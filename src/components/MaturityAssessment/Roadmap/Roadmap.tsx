import Stepper from "@/components/comman/Stepper";
import { UserRole } from "@/types/UserRole";
import React, { Dispatch, SetStateAction, useEffect } from "react";
import Assign from "./Assign";
import SetTarget from "./SetTarget";
import { useQuery } from "@tanstack/react-query";
import { AllActionDataPillerWise } from "@/types/MaturityLavel";
import { QUERY_KEYS } from "@/lib/constants";
import { fetchMaturityPillar } from "@/services/apiServices/pillar";
import { useAppSelector } from "@/hooks/use-redux";

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
      queryKey: [QUERY_KEYS.maturitypillar, { selectAssessment }],
      queryFn: () => fetchMaturityPillar(+clientId, userID, selectAssessment),
      enabled: !!selectAssessment,
    });

  useEffect(() => {
    console.log("+++++++++++++ I Called +++++++++++++++");
    const hasActionItems = maturitypillar?.data?.some(
      (pillar) => pillar?.actionItem?.length > 0
    );
    if (
      !isEdit &&
      ((+userData?.query?.role === UserRole?.Company && pathStatus > 5) ||
        showButton !== 0)
    ) {
      console.log("+++++++++++++ I Called +++++++++++++++ 1");
      setStep(hasActionItems ? 1 : 2);
    } else {
      console.log("+++++++++++++ I Called +++++++++++++++ 2");
      setStep(0);
    }
  }, []);

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
      {step === 0 ? (
        <SetTarget
          setStep={setStep}
          setIsEdit={setIsEdit}
          selectAssessment={selectAssessment}
          maturitypillar={maturitypillar?.data || []}
          isMaturitypillarLoading={fetchingMaturitypillar}
        />
      ) : step === 1 ? (
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

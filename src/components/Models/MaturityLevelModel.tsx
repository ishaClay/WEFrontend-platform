import { useAppSelector } from "@/hooks/use-redux";
import { getGreenImages } from "@/lib/utils";
import { getDataByPillerId } from "@/services/apiServices/pillar";
import { QuestionsByPillerResponse } from "@/types/Pillar";
import { useQuery } from "@tanstack/react-query";
import Loader from "../comman/Loader";
import Modal from "../comman/Modal";
import { Button } from "../ui/button";
import { Progress } from "../ui/progress";

interface MaturityLevelModelProps {
  isOpen: number | null;
  setIsOpen: React.Dispatch<React.SetStateAction<number | null>>;
  pillerName: string;
  setPillerName: React.Dispatch<React.SetStateAction<string>>;
}

const MaturityLevelModel = ({
  isOpen,
  setIsOpen,
  pillerName,
  setPillerName,
}: MaturityLevelModelProps) => {
  console.log(isOpen);
  const userData = JSON.parse(localStorage.getItem("user") as string);
  const { clientId, UserId } = useAppSelector((state) => state.user);
  const userID = UserId
    ? +UserId
    : userData?.query
    ? userData?.query?.id
    : userData?.id;

  const { data, isPending } = useQuery<QuestionsByPillerResponse>({
    queryKey: ["getPillarDatabyID", { pillarId: isOpen }],
    queryFn: () =>
      getDataByPillerId({
        pillerId: isOpen as number,
        userId: userID,
        clientId: +clientId,
      }),
    enabled: !!isOpen && !!userID && !!clientId,
  });

  return (
    <Modal
      open={!!isOpen}
      title="Have you identified actionable items on provided
                            measures?"
      className="max-w-[815px] w-full"
      onClose={() => {
        setIsOpen(null);
        setPillerName("");
      }}
    >
      <div className="flex">
        <div className="h-[105px] w-[270px] flex flex-col">
          <div className="flex ">
            <div className=" ml-4 mt-0 bg-white rounded-full drop-shadow-md w-[42px] h-[42px] p-2 mb-2">
              <img
                src={getGreenImages(pillerName)}
                alt="Leaf Icon"
                className="w-full h-full"
              />
            </div>

            <div className="ml-2 mt-2 h-[25px] w-[203px]">
              <h2 className="text-xm text-[#1D2026] font-calibri text-lg font-semibold">
                {pillerName}
              </h2>
            </div>
          </div>

          <div className="h-[19px] w-[270px]  flex mt-[35px]">
            <div className="h-[19px] w-[86px] flex">
              <div className="h-[12px] w-[12px] rounded  bg-[#F63636] mt-[3px]"></div>
              <div className="h-[19px] w-[62.21px] text-xs ml-[10px]">
                Introductory
              </div>
            </div>

            <div className="h-[19px] w-[86px] flex ml-[12px]">
              <div className="h-[12px] w-[12px] rounded  bg-[#FFD56A] mt-[3px] "></div>
              <div className="h-[19px] w-[65px] text-xs ml-[10px]">
                Intermediate
              </div>
            </div>
            <div className="h-[19px] w-[86px] flex ml-[12px]">
              <div className="h-[12px] w-[12px] rounded  bg-[#64A70B] mt-[3px] "></div>
              <div className="h-[19px] w-[49px] text-xs ml-[10px]">
                Advanced
              </div>
            </div>
          </div>
        </div>
        <div className="h-[105px] w-[270px] ">
          <div className="ml-3 mt-2 h-[25px] w-[230px]">
            <h2 className=" text-xm text-[#1D2026] font-calibri text-lg font-semibold">
              Maturity level of your answers
            </h2>
          </div>
        </div>
      </div>

      {isPending ? (
        <Loader />
      ) : (
        <div className="flex  flex-col mt-6">
          <div className="flex gap-2">
            {data?.data?.[pillerName as string]?.map((item, i) => {
              const color =
                item.questionAnswers?.length === 0
                  ? "#F63636"
                  : item?.questionScores > 50
                  ? "#64A70B"
                  : "#FFD56A";
              return (
                <div className="flex flex-col border p-3 rounded-lg w-[252px] h-[150px]">
                  <div className="text-xs font-bold">
                    Question : {(i + 1).toString().padStart(2, "0")}
                  </div>
                  <div className="mt-[11px] h-[75px] w-[230px]  font-calibri text-sm font-normal leading-[17.4px] text-left">
                    {item.title}
                  </div>

                  <Progress
                    className="w-full rounded-full mt-2"
                    value={item?.questionScores}
                    color={color}
                  />
                </div>
              );
            })}
          </div>
        </div>
      )}
      <div className="mt-8 text-right">
        <Button
          type="button"
          onClick={() => {
            setIsOpen(null);
            setPillerName("");
          }}
          className="bg-[#64A70B] px-[42px] py-[14px] h-auto text-[16px] font-calibri"
        >
          Close
        </Button>
      </div>
    </Modal>
  );
};

export default MaturityLevelModel;

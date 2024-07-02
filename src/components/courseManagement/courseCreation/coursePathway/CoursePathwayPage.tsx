import CloseIcon from "@/assets/images/close_img.png";
import Loader from "@/components/comman/Loader";
import { Button } from "@/components/ui/button";
import { useAppSelector } from "@/hooks/use-redux";
import { QUERY_KEYS } from "@/lib/constants";
import { fetchClientwiseMaturityLevel } from "@/services/apiServices/maturityLevel";
import { fetchClientwisePillarList } from "@/services/apiServices/pillar";
import { useQuery } from "@tanstack/react-query";
import { CircleX } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CoursePathwayPageItems from "./CoursePathwayPageItems";

interface SelectedData {
  pillarId: string;
  maturityId: string;
}

const CoursePathwayPage = () => {
  const { clientId } = useAppSelector((state) => state.user);
  const [selectedData, setSelectedData] = useState<SelectedData[]>([]);
  const [isError, setIsError] = useState(false);
  const navigate = useNavigate();
  const search = window.location.search;
  const params = new URLSearchParams(search).get("id");
  const paramsversion = new URLSearchParams(search).get("version");

  const { data: clientMaturityLevel, isPending: isClientMaturityLevel } =
    useQuery({
      queryKey: [QUERY_KEYS.maturityLevel],
      queryFn: () => fetchClientwiseMaturityLevel(clientId as string),
    });

  const { data, isPending } = useQuery({
    queryKey: [QUERY_KEYS.clientwisePillarList],
    queryFn: () => fetchClientwisePillarList(clientId as string),
  });

  const handleSelected = (pillarId: string, maturityId: string) => {
    setIsError(false);

    const findData = selectedData.find((item) => item.pillarId === pillarId);

    if (findData) {
      setSelectedData((prev) => {
        return prev.map((item) => {
          if (item.pillarId === pillarId) {
            return {
              ...item,
              maturityId,
            };
          }
          return item;
        });
      });
    } else {
      setSelectedData([...selectedData, { pillarId, maturityId }]);
    }
  };

  const handleSubmit = () => {
    if (selectedData.length > 3) {
      setIsError(true);
      navigate(
        `/trainer/create_course?tab=${3}&id=${params}&version=${paramsversion}`
      );
    } else {
      setIsError(false);
    }
  };

  return (
    <div className="p-5">
      <h4 className="text-[16px] text-black pb-4 flex items-center gap-[15px]">
        <span className="font-nunito font-bold">
          Target areas / pillars(Select applicable pillars)
        </span>
        <p className="text-[#606060] text-[15px] font-abhaya leading-[16px]">
          Which sustainability pillars does your course apply to? And for which
          level?
        </p>
      </h4>
      {isClientMaturityLevel || isPending ? (
        <Loader />
      ) : (
        data?.data?.data?.map((item, index) => {
          return (
            <CoursePathwayPageItems
              key={index}
              data={item}
              lavelData={clientMaturityLevel?.data || []}
              handleSelected={(value) =>
                handleSelected(item.id?.toString(), value)
              }
              selectedData={selectedData}
            />
          );
        })
      )}

      {!isError && (
        <div className="w-full bg-[#F8D7DA] p-4 flex rounded-lg items-center justify-between mb-5">
          <div className="flex items-center">
            <img src={CloseIcon} alt="close" className="me-3" />
            <span className="text-[#842029] text-base font-abhaya line-clamp-1 me-3">
              Only a maximum of 3 pillars can be selected. Does your course
              match more? Please contact your admin so they can sort it out
            </span>
          </div>
          <Button
            variant={"ghost"}
            type="button"
            onClick={() => setIsError(false)}
            className="p-0 h-auto hover:bg-transparent"
          >
            <CircleX className="text-right text-[#842029]" width={20} />
          </Button>
        </div>
      )}

      <div className="text-right">
        <Button
          type="button"
          onClick={handleSubmit}
          className="outline-none text-base font-inter text-white bg-[#58BA66] py-6 px-8"
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default CoursePathwayPage;

import CloseIcon from "@/assets/images/close_img.png";
import Loader from "@/components/comman/Loader";
import { Button } from "@/components/ui/button";
import { useAppSelector } from "@/hooks/use-redux";
import { QUERY_KEYS } from "@/lib/constants";
import { fetchClientwiseMaturityLevel } from "@/services/apiServices/maturityLevel";
import { fetchClientwisePillarList, pillarLimit, pillarMaturity } from "@/services/apiServices/pillar";
import { useMutation, useQuery } from "@tanstack/react-query";
import { CircleX } from "lucide-react";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import CoursePathwayPageItems from "./CoursePathwayPageItems";
import { useToast } from "@/components/ui/use-toast";
import { fetchSingleCourseById } from "@/services/apiServices/courseManagement";

interface SelectedData {
  pillarId: string;
  maturityId: string;
}

const CoursePathwayPage = () => {
  const { clientId, CompanyId } = useAppSelector((state) => state.user);
  const [selectedData, setSelectedData] = useState<SelectedData[]>([]);
  const [isError, setIsError] = useState(false);
  const {toast} = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const search = window.location.search;
  const paramsversion = new URLSearchParams(search).get("version");
  const paramsId = new URLSearchParams(search).get("id");
  const pathName = location?.pathname?.split("/")[1];
  const courseId = location?.pathname?.split("/")[3];

  const { data: clientMaturityLevel, isPending: isClientMaturityLevel } =
    useQuery({
      queryKey: [QUERY_KEYS.maturityLevel, clientId],
      queryFn: () => fetchClientwiseMaturityLevel(clientId as string),
      enabled: !!clientId,
    });

  const { data, isPending } = useQuery({
    queryKey: [QUERY_KEYS.clientwisePillarList, clientId],
    queryFn: () => fetchClientwisePillarList(clientId as string),
    enabled: !!clientId,
  });

  const { data:selectTargetPillarLimit } = useQuery({
    queryKey: [QUERY_KEYS.selectTargetPillarLimit, CompanyId],
    queryFn: () => pillarLimit(CompanyId as string),
    enabled: !!CompanyId,
  });

  const { mutate: pillarMaturityFun, isPending: pillarMaturityLoading } = useMutation({
    mutationFn: (e:any) => pillarMaturity(e),
    onSuccess: (data) => {
      setIsError(false);
      navigate(
        `/${pathName}/create_course?tab=${2}&id=${paramsId}&version=${paramsversion}`
      );
      toast({
        title: "Success",
        description: data?.data?.message,
        variant: "success",
      });
    }
  });
  

  const handleSelected = (pillarId: number, levelId: number) => {
    setIsError(false);
    setSelectedData((prevSelected:any) => {
      const index:any = prevSelected.findIndex((item:any) => item.pillarId === pillarId);
      if (index !== -1) {
        if (prevSelected[index].maturityId === levelId) {
          return prevSelected.filter((item:any) => item.pillarId !== pillarId);
        } else {
          const updatedLevels = [...prevSelected];
          updatedLevels[index] = { maturityId: levelId, pillarId };
          return updatedLevels;
        }
      } else {
        if (Object.keys(prevSelected).length >= selectTargetPillarLimit?.data?.pillarLimit) {
          setIsError(true);
          return prevSelected;
        }
        return [...prevSelected, { maturityId: levelId, pillarId }];
      }
    });
  };

  const {data: getSingleCourse} = useQuery({
    queryKey: [QUERY_KEYS.getSingleCourse, {paramsversion}],
    queryFn: () => fetchSingleCourseById(String(paramsversion)),
    enabled: !!paramsversion,
  })
  
  useEffect(() => {
    if (getSingleCourse) {
      const data:any = getSingleCourse?.data?.course?.courseData;
      setSelectedData(data);
    }
  }, [getSingleCourse]);

  const handleSubmit = () => {
    if (selectedData.length >= selectTargetPillarLimit?.data?.pillarLimit) {
      const payload = {
        courseData: selectedData, 
        id: courseId? courseId :paramsId,
        version: courseId ? getSingleCourse?.data?.version : paramsversion
      }
      pillarMaturityFun(payload);
    } else {      
      setIsError(true);
    }
  };
  return (
    <div className="">
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
              handleSelected={(pillarId: number, maturityId: number) =>
                handleSelected(pillarId, maturityId)
              }
              selectedData={selectedData}
            />
          );
        })
      )}

      {isError && (
        <div className="w-full bg-[#F8D7DA] p-4 flex rounded-lg items-center justify-between mb-5">
          <div className="flex items-center">
            <img src={CloseIcon} alt="close" className="me-3" />
            <span className="text-[#842029] text-base font-abhaya line-clamp-1 me-3">
              Only a maximum of {selectTargetPillarLimit?.data?.pillarLimit || 0} pillars can be selected. Does your course
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
          {pillarMaturityLoading ? <Loader containerClassName="max-h-auto" /> : "Next"}
        </Button>
      </div>
    </div>
  );
};

export default CoursePathwayPage;

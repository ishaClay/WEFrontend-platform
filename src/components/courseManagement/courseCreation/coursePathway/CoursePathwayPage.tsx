import CloseIcon from "@/assets/images/close_img.png";
import { Button } from "@/components/ui/button";
import { useAppSelector } from "@/hooks/use-redux";
import { fetchClientwisePillarList } from "@/services/apiServices/pillar";
import { useQuery } from "@tanstack/react-query";
import { CircleX } from "lucide-react";
import CoursePathwayPageItems from "./CoursePathwayPageItems";
import { QUERY_KEYS } from "@/lib/constants";

const CoursePathwayPage = () => {
  const { clientId } = useAppSelector((state) => state.user);

  const { data } = useQuery({
    queryKey: [QUERY_KEYS.clientwisePillarList],
    queryFn: () => fetchClientwisePillarList(clientId as string),
  });

  console.log("data++++", data?.data.data);

  return (
    <div className="p-5">
      <h4 className="font-calibri text-base text-black pb-4">
        <span className="font-bold">Target areas / pillars</span> (Select
        applicable pillars)
      </h4>
      {data?.data?.data?.map((item, index) => {
        return <CoursePathwayPageItems key={index} data={item} />;
      })}

      <div className="w-full bg-[#F8D7DA] p-4 flex rounded-lg items-center justify-between mb-5">
        <div className="flex items-center">
          <img src={CloseIcon} alt="close" className="me-3" />
          <span className="text-[#842029] text-base font-calibri line-clamp-1 me-3">
            <strong>Sorry,</strong> You can’t add more than 3 pillars, if you
            want to add another pillars, please contact to your admin
          </span>
        </div>
        <CircleX className="text-right text-[#842029]" width={20} />
      </div>

      <div className="text-right">
        <Button className="outline-none text-base font-inter text-white bg-[#58BA66] py-6 px-8">
          Next
        </Button>
      </div>
    </div>
  );
};

export default CoursePathwayPage;

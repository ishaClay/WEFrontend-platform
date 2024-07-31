import profile_img from "@/assets/images/face_1.jfif";
import { Checkbox } from "../../ui/checkbox";

type TraineeEmployee = {
  data: {
    image: string;
    name: string;
    companyName: string;
  };
  traineeList: { name: string; id: string }[];
  setTraineeList: React.Dispatch<
    React.SetStateAction<{ name: string; id: string }[]>
  >;
};

const TraineeItems = ({
  data,
  setTraineeList,
  traineeList,
}: TraineeEmployee) => {
  const handleChanges = (e: boolean, data: any): void => {
    if (e) {
      setTraineeList((prev: any) => [
        ...prev,
        {
          name: data.name,
          id: data.id.toString(),
        },
      ]);
    } else {
      setTraineeList((prev: any) =>
        prev.filter((item: { name: string }) => item.name !== data.name)
      );
    }
  };

  return (
    <div className="flex items-center justify-between border-b border-[#D9D9D9] pb-2 mb-2">
      <div className="flex items-center gap-3">
        <div className="w-[38px] h-[38px] overflow-hidden rounded-full border border-[#A3A3A3]">
          <img src={data.image || profile_img} alt="" />
        </div>
        <div className="">
          <h5 className="text-base font-abhaya text-black font-semibold">
            {data.name}
          </h5>
          <h6 className="text-[#606060] text-base">{data.companyName}</h6>
        </div>
      </div>
      <div className="">
        <Checkbox
          className="border-[#D9D9D9] w-6 h-6"
          onCheckedChange={(e) => handleChanges(!!e, data)}
          checked={traineeList?.some(
            (item: { name: string }) => item.name === data.name
          )}
        />
      </div>
    </div>
  );
};

export default TraineeItems;

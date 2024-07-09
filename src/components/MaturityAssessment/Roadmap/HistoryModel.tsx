import personImage from "@/assets/images/person.png";
import { QUERY_KEYS } from "@/lib/constants";
import { getItemHistory } from "@/services/apiServices/pillar";
import { useQuery } from "@tanstack/react-query";

const HistoryModel = ({ id }: { id: number | null }) => {
  const itemHistory = [
    {
      image: personImage,
      title: "Michel Johnsaon",
      duration: "3 Min ago",
      desc: "Marked as completed (Previous state - in progress)",
    },
    {
      image: personImage,
      title: "Michel Johnsaon",
      duration: "3 Min ago",
      desc: "Uploaded evidence",
    },
    {
      image: personImage,
      title: "Mikel Stark",
      duration: "30 Min ago",
      desc: "Assigned to Michel Johnson (Original assignee - None)",
    },
    {
      image: personImage,
      title: "Mikel Stark",
      duration: "30 Min ago",
      desc: "Assigned Start Date: 17/04/2024, End Date: 18/04/2024",
    },
    {
      image: personImage,
      title: "Mikel Stark",
      duration: "30 Min ago",
      desc: "Action Item Created",
    },
  ];

  console.log("id", id);

  const { data } = useQuery({
    queryKey: [QUERY_KEYS.itemHistory],
    queryFn: () => getItemHistory(id as number),
  });

  console.log("data", data);

  return (
    <>
      <div>
        <p className="text-base font-nunito font-bold text-[#000]">
          Action Item History
        </p>
        <h5 className="font-abhaya text-xl font-semibold text-[#000] leading-6 pt-[30px]">
          Lead in energy efficiency through continuous optimization and
          strategic energy management.
        </h5>
        <div className="pt-4">
          {itemHistory.map((items, index: number) => {
            return (
              <div key={index}>
                <div className="flex gap-2 pb-5">
                  <div>
                    <img src={items.image} alt="" />
                  </div>
                  <div>
                    <div className="flex items-center pb-1">
                      <h6 className="text-base font-abhaya font-bold">
                        {items.title}
                      </h6>
                      ,
                      <p className="text-xs font-abhaya text-[#777]">
                        {items.duration}
                      </p>
                    </div>
                    <div className="text-[13px] font-abhaya font-bold text-[#000]">
                      {items.desc}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default HistoryModel;

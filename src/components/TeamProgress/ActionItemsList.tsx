type ActionItems = {
  data: {
    title: string;
    updateBy: string;
    updateDate: string;
    targetDate: string;
    ActualDate: string;
  };
};

const ActionItemsList = ({ data }: ActionItems) => {
  return (
    <div className="border-b border-[#D9D9D9] last:border-none md:py-4 py-3 md:px-5 px-4">
      <div className="flex gap-3">
        <div className="w-[22px] h-[22px] min-w-[22px] min-h-[22px] rounded-sm bg-[#D2EFB6]"></div>
        <div className="flex flex-col gap-2">
          <p className="text-sm text-black font-abhaya font-semibold">
            {data.title}
          </p>
          <div className="grid 2xl:grid-cols-2 grid-cols-1 gap-2">
            <div className="flex flex-col gap-2 col-span-1">
              <h6 className="text-[#606060] text-sm font-abhaya font-semibold">
                Last Updated By :{" "}
                <span className="text-black">{data.updateBy}</span>
              </h6>
              <h6 className="text-[#606060] text-sm font-abhaya font-semibold">
                Last Updated Date :{" "}
                <span className="text-black">{data.updateDate}</span>
              </h6>
            </div>
            <div className="flex flex-col gap-2 col-span-1">
              <h6 className="text-[#606060] text-sm font-abhaya font-semibold">
                Target Completion Date :{" "}
                <span className="text-black">{data.targetDate}</span>
              </h6>
              <h6 className="text-[#606060] text-sm font-abhaya font-semibold">
                Actual Completion Date :{" "}
                <span className="text-black">{data.ActualDate}</span>
              </h6>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActionItemsList;

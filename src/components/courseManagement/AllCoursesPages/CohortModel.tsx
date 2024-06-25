const CohortModel = () => {
  const model = [
    {
      name: "Cohort 1",
      startDate: "22/5/2024",
      endDate: "30/05/2024",
    },
    {
      name: "Cohort 2",
      startDate: "01/06/2024",
      endDate: "15/06/2024",
    },
    {
      name: "Cohort 3",
      startDate: "01/06/2024",
      endDate: "15/06/2024",
    },
  ];
  return (
    <div>
      <h6 className="text-2xl font-bold font-calibri leading-7">All Cohort</h6>
      {model.map((modelList, index: number) => {
        return (
          <div key={index}>
            <div className="rounded-[6px] py-[7px] px-[15px] my-[18px] border border-[#B6D8DF] bg-[#E4FBFF]">
              <div className="pb-[6px]">
                <p className="text-black text-xs">
                  <span className="font-medium text-base font-inter leading-5">
                    {modelList.name}
                  </span>{" "}
                </p>
              </div>
              <div className="font-inter text-sm leading-3 text-[#000000] font-normal">
                <span>Start Date : </span>
                <span>{modelList.startDate}</span>
                <span>End Date : </span>
                <span>{modelList.endDate}</span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CohortModel;

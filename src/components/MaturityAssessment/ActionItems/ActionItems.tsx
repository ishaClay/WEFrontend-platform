import ActionItemsList from "./ActionItemsList";

const ActionItems = () => {
  const actionItems = [
    {
      taskName: "Task 1(Task name)",
      date: "2nd March, 2024 - 24th March",
      status: "ontime",
      action: "edit",
    },
    {
      taskName: "Task 2(Task name)",
      date: "2nd March, 2024 - 24th March",
      status: "delay",
      action: "edit",
    },
    {
      taskName: "Task 3(Task name)",
      date: "2nd March, 2024 - 24th March",
      status: "delay",
      action: "edit",
    },
    {
      taskName: "Task 4(Task name)",
      date: "2nd March, 2024 - 24th March",
      status: "delay",
      action: "view",
    },
  ];
  return (
    <div>
      <div className="xl:flex block items-center gap-6 mb-5">
        <p className="text-[#606060] font-abhaya font-bold xl:mb-0 mb-3">
          All the action items that have been dedicated to you{" "}
        </p>
        <ul className="flex overflow-x-auto overflow-y-hidden items-center sm:gap-4 gap-2.5">
          <li className="text-center sm:min-w-[90px] min-w-[70px] py-2 text-xs font-abhaya bg-[#ddd] rounded-full font-semibold">
            Assigned<span className="block">5</span>
          </li>
          <li className="text-center sm:min-w-[90px] min-w-[70px] py-2 text-xs text-white font-abhaya bg-[#F63636] rounded-full font-semibold">
            Delayed<span className="block">3</span>
          </li>
          <li className="text-center sm:min-w-[90px] min-w-[70px] py-2 text-xs font-abhaya bg-[#FFD56A] rounded-full font-semibold">
            Ontime<span className="block">2</span>
          </li>
          <li className="text-center sm:min-w-[90px] min-w-[70px] py-2 text-xs font-abhaya bg-[#64A70B] rounded-full font-semibold">
            Completed<span className="block">1</span>
          </li>
        </ul>
      </div>
      <div className="border border-[#D9D9D9] rounded-xl">
        {actionItems.map((data, index) => {
          return <ActionItemsList data={data} key={index} />;
        })}
      </div>
    </div>
  );
};

export default ActionItems;

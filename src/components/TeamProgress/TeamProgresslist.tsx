type ProgressList = {
  data: {
    image: string;
    employeeName: string;
    subTitle: string;
  };
};

const TeamProgresslist = ({ data }: ProgressList) => {
  return (
    <div className="sm:flex block items-center 2xl:gap-[60px] gap-[30px]">
      <div className="flex items-center gap-2 sm:mb-0 mb-3">
        <div className="min-w-8 w-8 min-h-8 h-8 rounded-full overflow-hidden">
          <img src={data.image} alt="profile img" />
        </div>
        <div className="">
          <h5 className="text-xs text-[#A3A3A3] font-abhaya text-left">
            {data.subTitle}
          </h5>
          <h6 className="font-inter 2xl:text-[15px] text-sm text-black text-left">
            {data.employeeName}
          </h6>
        </div>
      </div>
      <div className="xl:flex block 2xl:gap-[60px] gap-[30px] items-center">
        <div className="xl:mb-0 mb-3">
          <h6 className="text-left text-base text-black font-abhaya font-semibold">
            Action Items
          </h6>
          <ul className="flex sm:gap-4 gap-2">
            <li className="bg-[#dadada] rounded-full py-2 sm:w-[90px] w-[70px] text-xs font-abhaya font-semibold text-black">
              Assigned<span className="block">1</span>
            </li>
            <li className="bg-[#F63636] text-white rounded-full py-2 sm:w-[90px] w-[70px] text-xs font-abhaya font-semibold">
              Delayed<span className="block">3</span>
            </li>
            <li className="bg-[#FFD56A] rounded-full py-2 sm:w-[90px] w-[70px] text-xs font-abhaya font-semibold text-black">
              Ontime<span className="block">2</span>
            </li>
            <li className="bg-[#64A70B] rounded-full py-2 sm:w-[90px] w-[70px] text-xs font-abhaya font-semibold text-white">
              Completed<span className="block">1</span>
            </li>
          </ul>
        </div>
        <div className="">
          <h6 className="text-left text-base text-black font-abhaya font-semibold">
            Courses
          </h6>
          <ul className="flex sm:gap-4 gap-2">
            <li className="bg-[#dadada] rounded-full py-2 sm:w-[90px] w-[70px] text-xs font-abhaya font-semibold text-black">
              Assigned<span className="block">1</span>
            </li>
            <li className="bg-[#F63636] text-white rounded-full py-2 sm:w-[90px] w-[70px] text-xs font-abhaya font-semibold">
              InProgress<span className="block">3</span>
            </li>
            <li className="bg-[#64A70B] rounded-full py-2 sm:w-[90px] w-[70px] text-xs font-abhaya font-semibold text-white">
              Completed<span className="block">1</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TeamProgresslist;

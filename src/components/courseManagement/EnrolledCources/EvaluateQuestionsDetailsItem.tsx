const EvaluateQuestionsDetailsItem = ({ item }: { item: any }) => {
  return (
    <div className="border border-solid border-[#D9D9D9] rounded-sm sm:p-5 p-3">
      <div className="flex items-center pb-3">
        <h6 className="sm:text-base text-sm font-calibri font-bold pe-5 text-[#606060]">
          Question :<span>{item.questionId}</span>
        </h6>
        <h6 className="sm:text-base text-sm font-calibri font-bold text-[#606060]">
          Points :<span>{item.pointId}</span>
        </h6>
      </div>
      <p className="md:text-base sm:text-sm text-xs font-calibri pb-3">
        {item.desription}
      </p>
      <div className="pb-3">
        <span className="text-[#606060] font-bold sm:text-base text-sm font-calibri">
          Answer
        </span>
        <p className="sm:text-base text-sm font-calibri">{item.answer}</p>
      </div>
      <div className="pb-3">
        <h6 className="text-[#606060] text-xs font-calibri">
          <span className="sm:text-base text-sm font-bold">KeyWords</span>
          {item.keyWords}
        </h6>
      </div>
      <div className="">
        <ul className="flex flex-wrap flex-row md:gap-4 gap-2.5 items-center font-calibri font-base">
          <li className="text-black py-1.5 text-center bg-[#EDF0F4] rounded-full cursor-pointer sm:text-base text-sm md:w-[104px] w-[95px]">
            Keyword one
          </li>
          <li className="text-white py-1.5 text-center bg-[#58BA66] rounded-full cursor-pointer sm:text-base text-sm md:w-[104px] w-[95px]">
            Keyword two
          </li>
          <li className="text-white py-1.5 text-center bg-[#58BA66] rounded-full cursor-pointer sm:text-base text-sm md:w-[104px] w-[95px]">
            Keyword three
          </li>
          <li className="text-white py-1.5 text-center bg-[#58BA66] rounded-full cursor-pointer sm:text-base text-sm md:w-[104px] w-[95px]">
            Keyword five
          </li>
          <li className="text-black py-1.5 text-center bg-[#EDF0F4] rounded-full cursor-pointer sm:text-base text-sm md:w-[104px] w-[95px]">
            Keyword fix
          </li>
          <li className="text-[#4285F4] cursor-pointer sm:text-base text-sm">
            Show all
          </li>
        </ul>
      </div>
    </div>
  );
};

export default EvaluateQuestionsDetailsItem;

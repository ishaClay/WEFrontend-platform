const EvaluateQuestionsDetailsItem = ({ item }: { item: any }) => {
  return (
    <div className="border border-solid border-[#D9D9D9] rounded-sm p-5">
      <div className="flex items-center pb-3">
        <h6 className="text-base font-calibri font-bold pe-5 text-[#606060]">
          Question :<span>{item.questionId}</span>
        </h6>
        <h6 className="text-base font-calibri font-bold text-[#606060]">
          Points :<span>{item.pointId}</span>
        </h6>
      </div>
      <p className="text-base font-calibri pb-3">{item.desription}</p>
      <div className="pb-3">
        <span className="text-[#606060] font-bold text-base font-calibri">
          Answer
        </span>
        <p className="text-base font-calibri">{item.answer}</p>
      </div>
      <div className="pb-3">
        <h6 className="text-[#606060] text-xs font-calibri">
          <span className="text-base font-bold">KeyWords</span>
          {item.keyWords}
        </h6>
      </div>
      <div className="">
        <ul className="flex items-center font-calibri font-base">
          <li className="text-black py-1.5 px-3 bg-[#EDF0F4] rounded-full me-4 cursor-pointer">
            Keyword one
          </li>
          <li className="text-white py-1.5 px-3 bg-[#58BA66] rounded-full me-4 cursor-pointer">
            Keyword two
          </li>
          <li className="text-white py-1.5 px-3 bg-[#58BA66] rounded-full me-4 cursor-pointer">
            Keyword three
          </li>
          <li className="text-white py-1.5 px-3 bg-[#58BA66] rounded-full me-4 cursor-pointer">
            Keyword five
          </li>
          <li className="text-black py-1.5 px-3 bg-[#EDF0F4] rounded-full me-4 cursor-pointer">
            Keyword fix
          </li>
          <li className="text-[#4285F4] cursor-pointer">Show all</li>
        </ul>
      </div>
    </div>
  );
};

export default EvaluateQuestionsDetailsItem;

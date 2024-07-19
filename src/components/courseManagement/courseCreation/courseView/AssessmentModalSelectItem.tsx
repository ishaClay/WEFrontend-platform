type selectQuestionTypeProps = {
  data: {
    selectOption: string;
    optionSubTitle: string;
  };
};

const AssessmentModalSelectItem = ({ data }: selectQuestionTypeProps) => {
  return (
    <div className="w-1/3 flex justify-center">
      <div className="md:w-[200px] sm:w-[150px] w-[95px] sm:h-[150px] h-[95px] cursor-pointer border border-[#D9D9D9] flex justify-center items-center rounded-lg hover:border-[#64A70B] md:mb-5 sm:mb-4 mb-2.5 group">
        <div className="text-center flex flex-col sm:gap-2 gap-1">
          <h4 className="md:text-xl text-sm font-bold font-calibri text-black group-hover:text-[#64A70B]">
            {data.selectOption}
          </h4>
          <h6 className="md:text-base text-xs font-calibri text-black group-hover:text-[#64A70B]">
            {data.optionSubTitle}
          </h6>
        </div>
      </div>
    </div>
  );
};

export default AssessmentModalSelectItem;

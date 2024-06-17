type selectQuestionTypeProps = {
  data: {
    selectOption: string;
    optionSubTitle: string;
  };
};

const AssessmentModalSelectItem = ({ data }: selectQuestionTypeProps) => {
  return (
    <div className="w-1/3">
      <div className="w-[200px] h-[150px] cursor-pointer border border-[#D9D9D9] flex justify-center items-center rounded-lg hover:border-[#64A70B] mb-5 group">
        <div className="text-center">
          <h4 className="text-xl font-bold font-calibri pb-2 text-black group-hover:text-[#64A70B]">
            {data.selectOption}
          </h4>
          <h6 className="text-base font-calibri text-black group-hover:text-[#64A70B]">
            {data.optionSubTitle}
          </h6>
        </div>
      </div>
    </div>
  );
};

export default AssessmentModalSelectItem;

import AssessmentModalSelectItem from "./AssessmentModalSelectItem";

const AssessmentModal = () => {
  const selectQuestionType = [
    {
      selectOption: "MCQ",
      optionSubTitle: "Multi Choice Question",
    },
    {
      selectOption: "Drag & Drop",
      optionSubTitle: "Multi Choice Question",
    },
    {
      selectOption: "True & False",
      optionSubTitle: "Multi Choice Question",
    },
    {
      selectOption: "Drag & Drop",
      optionSubTitle: "Multi Choice Question",
    },
  ];
  return (
    <div>
      <h5 className="font-bold text-black text-xl font-calibri">
        Select Document Type
      </h5>
      <p className="text-[#606060] text-[15px] pb-5">Which  format would best suit this particular assessment question? </p>
      <div className="flex items-center justify-center flex-wrap">
        {selectQuestionType.map((data, index) => {
          return <AssessmentModalSelectItem key={index} data={data} />;
        })}
      </div>
    </div>
  );
};

export default AssessmentModal;

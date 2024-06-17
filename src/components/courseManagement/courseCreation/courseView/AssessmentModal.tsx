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
      <h5 className="font-bold text-black text-xl font-calibri pb-5">
        Select Document Type
      </h5>
      <div className="flex items-center justify-center flex-wrap">
        {selectQuestionType.map((data, index) => {
          return <AssessmentModalSelectItem key={index} data={data} />;
        })}
      </div>
    </div>
  );
};

export default AssessmentModal;

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
      <h5 className="font-bold text-black sm:text-xl text-base font-calibri pb-2.5">
        Select Question Type
      </h5>
      <p className="text-[#606060] sm:text-[15px] text-sm font-abhaya leading-[16px] pb-5">
        Which format would best suit this particular assessment question?
      </p>
      <div className="flex items-center md:justify-evenly justify-center flex-wrap">
        {selectQuestionType.map((data, index) => {
          return <AssessmentModalSelectItem key={index} data={data} />;
        })}
      </div>
    </div>
  );
};

export default AssessmentModal;

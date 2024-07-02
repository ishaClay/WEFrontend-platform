type QuestionListProps = {
  data: {
    question: string;
  };
};

const AccordionQuestion = ({ data }: QuestionListProps) => {
  return (
    <div className="text-left">
      <h4 className="xl:text-2xl text-xl font-extrabold font-abhaya">
        {data.question}
      </h4>
    </div>
  );
};

export default AccordionQuestion;

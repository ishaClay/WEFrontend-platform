type FaqProps = {
  data: {
    question: string;
    answer?: string;
  };
};

const AccordionQuestion = ({ data }: FaqProps) => {
  return (
    <div className="text-left">
      <h4 className="xl:text-2xl text-xl font-extrabold font-d-din-pro line-clamp-2">
        {data?.question}
      </h4>
    </div>
  );
};

export default AccordionQuestion;

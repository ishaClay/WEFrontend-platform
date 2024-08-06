
type FaqProps = {
  data: {
    question: string;
    answer: string;
  };
};

const AccordionAnswer = ({ data }: FaqProps) => {
  return (
    <div className="px-4 pb-4">
      <p className="text-[#00778B] text-base font-abhaya font-bold pb-5" dangerouslySetInnerHTML={{ __html: data?.answer }} >
      </p>
    </div>
  );
};

export default AccordionAnswer;

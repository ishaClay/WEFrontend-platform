import { FilePenLine, Trash2 } from "lucide-react";

type CourseCardListProps = {
  data: {
    questionImage: string;
    question: string;
    durationType: string;
    duration: string;
  };
};

const CourseViewCardInnerList = ({ data }: CourseCardListProps) => {
  return (
    <div className="border-b border-[#D9D9D9] p-4 flex items-center justify-between">
      <div className="flex items-center">
        <div className="me-3">
          <img src={data.questionImage} alt="" />
        </div>
        <div className="">
          <h5 className="text-sm text-black font-inter pb-2">
            {data.question}
          </h5>
          <div className="">
            <h6 className="text-[#747474] text-xs font-inter">
              {data.durationType}{" "}
              <strong className="text-black">{data.duration}</strong>
            </h6>
          </div>
        </div>
      </div>
      <div className="flex items-center">
        <FilePenLine
          width={18}
          className="me-3 text-[#575757] cursor-pointer"
        />
        <Trash2 width={18} className="me-3 text-[#575757] cursor-pointer" />
      </div>
    </div>
  );
};

export default CourseViewCardInnerList;

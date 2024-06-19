import { Button } from "@/components/ui/button";
import AssecessmentTypeTwoOptions from "./AssecessmentTypeTwoOptions";

const AssecessmentTypeTwo = () => {
  const options = [
    {
      optionTitle: "Opt 1*:",
      option: "A manager who involes employees in decision making.",
    },
    {
      optionTitle: "Opt 2:",
      option: "A manager who involes employees in decision making.",
    },
    {
      optionTitle: "Opt 3:",
      option: "A manager who involes employees in decision making.",
    },
  ];
  return (
    <div className="border border-[#D9D9D9] rounded-lg p-5 mb-5">
      <div className="pb-8">
        <h6 className="text-base text-black font-calibri pb-3">
          Assessment Type
        </h6>
        <input
          placeholder="Single Choice Question"
          className="border border-[#D9D9D9] rounded-md w-full px-4 py-3 outline-none font-base font-calibri text-[#1D2026]"
        />
      </div>
      <div className="pb-8">
        <h6 className="text-base text-black font-calibri pb-3">
          Enter Question
        </h6>
        <div className="flex justify-between items-center border border-[#D9D9D9] rounded-md w-full px-4 py-1">
          <input
            placeholder="How would you describe an authoritarian (or controlling) management style?"
            className="outline-none font-base font-calibri text-[#1D2026] w-full"
          />
          <div className="flex items-center">
            <label className="me-3 text-[#515151] text-base font-calibri">
              Point
            </label>
            <input className="py-2 px-3 w-[100px] border border-[#D9D9D9] outline-none rounded-md" />
          </div>
        </div>
      </div>
      <div className="">
        <div className="text-right">
          <Button className="bg-transparent text-[#4285F4] text-base font-calibri text-right mb-5 hover:bg-transparent">
            + Add Option
          </Button>
        </div>
        {options.map((data, index) => {
          return <AssecessmentTypeTwoOptions data={data} key={index} />;
        })}
      </div>
    </div>
  );
};

export default AssecessmentTypeTwo;

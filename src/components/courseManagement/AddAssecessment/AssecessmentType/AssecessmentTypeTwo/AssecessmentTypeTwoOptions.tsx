/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { AssesmentContext } from "@/context/assesmentContext";
import { Trash2 } from "lucide-react";
import { useContext } from "react";

type optionsProps = {
  data: {
    option: string;
  };
  iIndex: number;
  setErrors: React.Dispatch<React.SetStateAction<any>>;
  id: number;
};

const AssecessmentTypeTwoOptions = ({
  data,
  iIndex,
  setErrors,
  id,
}: optionsProps) => {
  const { assesment, setAssesment } = useContext(AssesmentContext);

  const handleCheck = () => {
    const selectedOptionValue = data.option;
    setAssesment((prev: any) => {
      return prev.map((item: any) => {
        if (item?.ids === id) {
          return {
            ...item,
            answer: item?.answer?.includes(selectedOptionValue)
              ? item?.answer?.filter(
                  (val: string) => val !== selectedOptionValue
                )
              : [...item?.answer, selectedOptionValue],
          };
        }
        return item;
      });
    });
    setErrors((prev: any) => ({
      ...prev,
      answer: "",
    }));
  };

  const handleRemove = () => {
    const optionToRemove = data.option;
    setAssesment((prev: any) => {
      return prev.map((item: any) => {
        if (item?.ids === id) {
          return {
            ...item,
            options: item?.options?.filter(
              // @ts-ignore
              (val: string) => val?.option !== optionToRemove
            ),
            answer: [],
          };
        }
        return item;
      });
    });

    setErrors((prev: any) => ({
      ...prev,
      answer: "",
      options: prev.options.filter((_: any, ind: number) => ind !== iIndex),
      diffOptions: "",
    }));
  };

  const handleChange = (e: any, i: number) => {
    const { value } = e.target;
    setAssesment((prev: any) => {
      return prev.map((item: any) => {
        if (item?.ids === id) {
          return {
            ...item,
            options: item?.options?.map((option: any, index: number) => {
              if (index === i) {
                return { ...option, option: value }; // Update the specific option
              }
              return option; // Return unchanged option
            }),
          };
        }
        return item; // Return unchanged item
      });
    });
  };

  return (
    <div className="mb-3">
      <div className="space-x-2 flex items-center justify-between">
        <label htmlFor={data.option} className="flex items-center w-[98%]">
          <span className="text-sm text-black font-droid w-[80px]">
            Option {iIndex + 1}
          </span>
          <div className="w-full">
            <div className="w-full flex justify-between items-center relative">
              <Input
                placeholder={data.option}
                className="w-full px-4 py-[15px] pr-[80px] text-base font-droid text-black h-auto"
                onChange={(e) => {
                  handleChange(e, iIndex);
                  setErrors((prev: any) => {
                    return {
                      ...prev,
                      diffOptions: "",
                    };
                  });
                }}
                value={
                  assesment?.find((item: any) => item?.ids === id)?.options?.[
                    iIndex
                  ]?.option || ""
                }
              />
              <Button
                type="button"
                className="px-4 py-1 bg-[#FFD2D2] text-[#FF5252] rounded-sm hover:bg-[#FFD2D2] absolute right-4"
                onClick={handleRemove}
              >
                <Trash2 width={18} />
              </Button>
            </div>
          </div>
        </label>
        <div className="w-[2%] text-right">
          <Checkbox
            className="border border-[#D9D9D9] w-[22px] h-[22px]"
            onCheckedChange={handleCheck}
            // @ts-ignore
            checked={
              assesment
                ?.find((item) => item.ids === id)
                // @ts-ignore
                ?.answer?.includes(data?.option) || false
            }
          />
        </div>
      </div>
    </div>
  );
};

export default AssecessmentTypeTwoOptions;

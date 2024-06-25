import courseImage from "@/assets/images/Course_image.png";
import { Minus, Plus } from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";
import SelectMenu from "./comman/SelectMenu";

const filterOption = [
  {
    label: "Cohort 1 : Start 20/05/2024 End 30/05/2024",
    value: "cohort 1 : start 20/05/2024 end 30/05/2024",
  },
  {
    label: "Cohort 2 : Start 20/05/2024 End 30/05/2024",
    value: "cohort 2 : start 20/05/2024 end 30/05/2024",
  },
  {
    label: "Cohort 3 : Start 20/05/2024 End 30/05/2024",
    value: "cohort 3 : start 20/05/2024 end 30/05/2024",
  },
];

const RecommendedCoursesModel = () => {
  const [selectFilterByCategory, setSelectFilterByCategory] = useState("");
  const [itemList, setItemList] = useState(0);
  const handleIncrement = () => {
    setItemList((prevValue) => prevValue + 1);
  };
  const handleDecrement = () => {
    if (itemList > 0) {
      setItemList((prevValue) => prevValue - 1);
    }
  };
  const courseModel = [
    {
      image: courseImage,
      price: "50.00",
      title:
        "Certificate in the Sustainable Development Goals, Partnership, People, Planet and Prosperity",
      totalPrice: 250.0,
    },
    {
      image: courseImage,
      price: "25.00",
      title:
        "Certificate in the Sustainable Development Goals, Partnership, People, Planet and Prosperity",
      totalPrice: 250.0,
    },
  ];
  return (
    <div>
      {courseModel.map((courseList, index: number) => {
        return (
          <div key={index}>
            <div className="border border-[#D9D9D9] p-5 mb-6 rounded-md">
              <div className="flex justify-between pb-[18px]">
                <div className="flex items-center text-base font-normal font-calibri text-[#000]">
                  <input
                    type="radio"
                    value="button"
                    name="course"
                    className="w-6 h-6 mr-2"
                  />
                  Without Discount
                </div>
                <div className="flex items-center gap-1">
                  <p className="text-base font-calibri leading-5">
                    Course Price :{" "}
                  </p>
                  <span className="font-calibri font-bold text-base leading-5 text-[#000]">
                    € {courseList.price}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-7">
                <div>
                  <img
                    src={courseList.image}
                    alt=""
                    className="min-w-[143px] min-h-[143px] w-[143px] h-[143px] rounded-md object-cover"
                  />
                </div>
                <div>
                  <h6 className="font-bold text-2xl font-calibri leading-7">
                    {courseList.title}
                  </h6>
                  <div className="flex items-center gap-6 mt-3">
                    <div>
                      <p className="text-base font-normal font-calibri leading-5 pb-[6px]">
                        Number of Employee
                      </p>
                      <div className="inline-flex items-center border border-[#D9D9D9]">
                        <Button
                          className="w-[50px] h-[42px] rounded-none bg-white hover:bg-white text-black border-r border-[#D9D9D9]"
                          onClick={handleIncrement}
                        >
                          <Plus />
                        </Button>
                        <input
                          type="number"
                          value={itemList}
                          min={0}
                          onChange={(e) =>
                            setItemList(parseInt(e.target.value) || 0)
                          }
                          className="w-[88px] h-[42px] text-center"
                        />
                        <Button
                          className="w-[50px] h-[42px] rounded-none bg-white hover:bg-white text-black border-l border-[#D9D9D9]"
                          onClick={handleDecrement}
                        >
                          <Minus />
                        </Button>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <p className="text-base font-normal font-calibri leading-5">
                        Total Price :{" "}
                      </p>
                      <span className="text-base font-calibri font-bold leading-5">
                        € 250.00
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
      <div className="flex justify-between">
        <div>
          <SelectMenu
            option={filterOption}
            setValue={(data: string) => setSelectFilterByCategory(data)}
            value={selectFilterByCategory}
            className="w-[391px] h-[52px] font-inter text-black border border-[#D9D9D9] text-base font-normal"
            itemClassName="text-base font-medium font-inter"
            placeholder="Select Cohort"
          />
        </div>
        <div>
          <Button className="bg-[#58BA66] text-base font-semibold font-nunito leading-[22px] w-[137px] h-[52px]">
            Select
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RecommendedCoursesModel;

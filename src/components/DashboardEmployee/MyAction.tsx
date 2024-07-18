import action_assigned from "@/assets/images/action_assigned.png";
import Action_Open from "@/assets/images/action_open.png";
import Action_Display from "@/assets/images/action_display.png";
import Action_Completed from "@/assets/images/action_completed.png";
import MyActionItems from "./MyActionItems";
import CustomCarousel from "../comman/CustomCarousel";

const MyAction = () => {
  const actionItems = [
    {
      image: action_assigned,
      title: 9,
      subTitle: "Assigned",
    },
    {
      image: Action_Open,
      title: 4,
      subTitle: "Open",
    },
    {
      image: Action_Display,
      title: 3,
      subTitle: "Delayed",
    },
    {
      image: Action_Completed,
      title: 2,
      subTitle: "Completed",
    },
  ];
  return (
    <div className="mb-8">
      <h5 className="sm:text-base text-lg text-black font-inter pb-4 sm:font-medium font-bold">
        My Action Items
      </h5>
      <div className="lg:block hidden">
        <div className="grid xl:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-6">
          {actionItems.map((data, index) => {
            return <MyActionItems data={data} key={index} />;
          })}
        </div>
      </div>
      <div className="lg:hidden block">
        <CustomCarousel dots={false} className="basis-1/3">
          {actionItems.map((data, index) => {
            return <MyActionItems data={data} key={index} />;
          })}
        </CustomCarousel>
      </div>
    </div>
  );
};

export default MyAction;

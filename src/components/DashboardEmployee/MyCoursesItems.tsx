import Ellipse_one from "@/assets/images/Ellipse1.png";
import Ellipse_two from "@/assets/images/Ellipse2.png";
import Ellipse_three from "@/assets/images/Ellipse3.png";

type myCoursesProps = {
  data: {
    image: string;
    title: number;
    subTitle: string;
  };
};

const MyCoursesItems = ({ data }: myCoursesProps) => {
  return (
    <div className="col-span-1 xl:px-5 p-3 xl:py-6 shadow-md rounded-lg relative">
      <div className="flex items-center">
        <div className="w-20 h-20 rounded-full bg-[#F5F7FF] flex justify-center items-center">
          <img src={data.image} alt="" />
        </div>
        <div className="ps-5">
          <span className="font-bold font-nunito text-[32px] text-black">
            {data.title}
          </span>
          <h5 className="text-base font-nunito text-black">{data.subTitle}</h5>
        </div>
      </div>
      <img
        src={Ellipse_one}
        alt="ellipse"
        className="absolute bottom-0 right-[10%]"
      />
      <img src={Ellipse_two} alt="ellipse" className="absolute top-0 right-0" />
      <img
        src={Ellipse_three}
        alt="ellipse"
        className="absolute top-0 right-0"
      />
    </div>
  );
};

export default MyCoursesItems;

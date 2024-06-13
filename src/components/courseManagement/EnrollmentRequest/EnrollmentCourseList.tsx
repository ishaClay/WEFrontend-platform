import Cards from "@/assets/images/courselist.png";
import EnrollmentCourseListCard from "./EnrollmentCourseListCard";

const EnrollmentCourseList = () => {
  const cards = [
    {
      image: Cards,
      desc: "Certificate in the Sustainable Development Goals, Partnership, People, Planet and Prosperity",
      title: "Prime  Infotech",
      employeenumber: 15,
      rating: 4.5,
      price: 15000,
    },
    {
      image: Cards,
      desc: "Certificate in the Sustainable Development Goals, Partnership, People, Planet and Prosperity",
      title: "Prime  Infotech",
      employeenumber: 15,
      rating: 4.5,
      price: 1500,
    },
    {
      image: Cards,
      desc: "Certificate in the Sustainable Development Goals, Partnership, People, Planet and Prosperity",
      title: "Prime  Infotech",
      employeenumber: 15,
      rating: 4.5,
      price: 1500,
    },
    {
      image: Cards,
      desc: "Certificate in the Sustainable Development Goals, Partnership, People, Planet and Prosperity",
      title: "Prime  Infotech",
      employeenumber: 15,
      rating: 4.5,
      price: 1500,
    },
    {
      image: Cards,
      desc: "Certificate in the Sustainable Development Goals, Partnership, People, Planet and Prosperity",
      title: "Prime  Infotech",
      employeenumber: 15,
      rating: 4.5,
      price: 1500,
    },
  ];
  return (
    <>
      <div>
        <div className="bg-white">
          {cards.map((data, index: number) => {
            return <EnrollmentCourseListCard key={index} data={data} />;
          })}
        </div>
      </div>
    </>
  );
};

export default EnrollmentCourseList;

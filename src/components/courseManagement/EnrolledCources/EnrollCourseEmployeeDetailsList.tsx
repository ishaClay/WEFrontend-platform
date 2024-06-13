import empoyee_1 from "@/assets/images/face_1.jfif";
import EnrollCourseEmployeeDetailsListItem from "./EnrollCourseEmployeeDetailsListItem";

const EnrollCourseEmployeeDetailsList = () => {
  const employeeCourseDetails = [
    {
      image: empoyee_1,
      name: "Ankites Risher",
      subtitle: "SME Company",
      complete: "Complete",
      score: "10/15",
      certificate: "Certificate",
      evauate: "Evauate",
    },
    {
      image: empoyee_1,
      name: "Ankites Risher",
      subtitle: "SME Company",
      complete: "Complete",
      score: "10/15",
      certificate: "Certificate",
      evauate: "Evauate",
    },
    {
      image: empoyee_1,
      name: "Ankites Risher",
      subtitle: "SME Company",
      complete: "Complete",
      score: "10/15",
      certificate: "Certificate",
      evauate: "Evauate",
    },
  ];
  return (
    <div>
      <div className="">
        {employeeCourseDetails.map((data, index) => {
          return (
            <EnrollCourseEmployeeDetailsListItem data={data} key={index} />
          );
        })}
      </div>
    </div>
  );
};

export default EnrollCourseEmployeeDetailsList;

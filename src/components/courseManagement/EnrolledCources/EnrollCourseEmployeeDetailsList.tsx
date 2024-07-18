import empoyee_1 from "@/assets/images/face_1.jfif";
import EnrollCourseEmployeeDetailsListItem from "./EnrollCourseEmployeeDetailsListItem";
import { Button } from "@/components/ui/button";
import { Video } from "lucide-react";
import Modal from "@/components/comman/Modal";
import { useState } from "react";
import SessionModalDetails from "./SessionModalDetails";

const EnrollCourseEmployeeDetailsList = () => {
  const [isOpen, setIsOpen] = useState(false);
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
      <div className="flex sm:flex-row flex-col sm:items-start items-center gap-3 mt-5">
        <Button
          variant={"outlinePrimary"}
          className="text-base font-calibri w-[142px] px-2.5"
          onClick={() => setIsOpen(true)}
        >
          <Video />
          Live Session 1
        </Button>
        <Button
          variant={"outlinePrimary"}
          className="text-base font-calibri w-[142px] px-2.5"
          onClick={() => setIsOpen(true)}
        >
          <Video /> Live Session 2
        </Button>
        <Button
          variant={"outlinePrimary"}
          className="text-base font-calibri w-[142px] px-2.5"
          onClick={() => setIsOpen(true)}
        >
          <Video /> Live Session 3
        </Button>
      </div>

      <Modal
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="max-w-3xl"
      >
        <SessionModalDetails />
      </Modal>
    </div>
  );
};

export default EnrollCourseEmployeeDetailsList;

import {
  AssesmentContext,
  intialSectionCreation,
} from "@/context/assesmentContext";
import { useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";

interface ModalItemProps {
  setIsOpenAssessmentModal: React.Dispatch<React.SetStateAction<boolean>>;
  moduleId?: string;
  data: any[];
  sectionID?: number;
}

const AssessmentModalSelectItem = ({
  data,
  moduleId,
  setIsOpenAssessmentModal,
  sectionID,
}: ModalItemProps) => {
  const navigate = useNavigate();
  const pathName = window.location.pathname;
  const currentUser = pathName.split("/")[1];
  const { courseId, assId } = useParams();
  const { assesment, setAssesment } = useContext(AssesmentContext);

  console.log("sectionIDsectionIDsectionID", sectionID);

  // const { mutate, isPending } = useMutation({
  //   mutationFn: createAssessment,
  //   onSuccess: (res) => {
  //     if (!location.pathname.includes("add_assessment")) {
  //       const searchParams = new URLSearchParams(window.location.search);
  //       const queryParams: { [key: string]: string | null } = {};
  //       for (const param of searchParams.keys()) {
  //         queryParams[param] = searchParams.get(param);
  //       }

  //       if (courseId) {
  //         queryParams["courseId"] = courseId;
  //       }

  //       if (moduleId) {
  //         queryParams["moduleId"] = moduleId;
  //       }
  //       navigate(
  //         `/${currentUser}/add_assessment/${res?.data?.data?.id}?` +
  //           new URLSearchParams(queryParams as any).toString()
  //       );
  //     }

  //     dispatch(setQuestionType(data[0]));
  //     setIsOpenAssessmentModal(false);
  //   },
  // });

  const handleAdd = () => {
    setAssesment([
      ...assesment,
      {
        ...intialSectionCreation,
        ids: assesment.length + 1,
        assessmentType: data[0],
      },
    ]);
    setIsOpenAssessmentModal(false);
    const searchParams = new URLSearchParams(window.location.search);
    const queryParams: { [key: string]: string | null } = {};
    for (const param of searchParams.keys()) {
      queryParams[param] = searchParams.get(param);
    }

    if (courseId) {
      queryParams["courseId"] = courseId;
    }

    if (moduleId) {
      queryParams["moduleId"] = moduleId;
    }
    if (assId) {
      navigate(
        `/${currentUser}/add_assessment/${assId}?` +
          new URLSearchParams(queryParams as any).toString()
      );
    } else {
      navigate(
        `/${currentUser}/add_assessment?` +
          new URLSearchParams(queryParams as any).toString()
      );
    }
  };

  return (
    <div
      onClick={handleAdd}
      className="md:w-[200px] sm:w-[150px] w-full sm:h-[150px] h-[95px] cursor-pointer border border-[#D9D9D9] flex justify-center items-center rounded-lg hover:border-[#64A70B] group px-1"
    >
      <div className="text-center flex flex-col sm:gap-2 gap-1">
        <h4 className="md:text-xl text-sm font-bold font-droid text-black group-hover:text-[#64A70B] max-w-[180px] break-all">
          {data[0]}
        </h4>
        <h6 className="md:text-base text-xs font-droid text-black group-hover:text-[#64A70B]">
          {data[1]}
        </h6>
      </div>
    </div>
  );
};

export default AssessmentModalSelectItem;

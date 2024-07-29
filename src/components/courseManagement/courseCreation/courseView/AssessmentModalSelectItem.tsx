import Loading from "@/components/comman/Error/Loading";
import { useAppDispatch } from "@/hooks/use-redux";
import { setQuestionType } from "@/redux/reducer/AssessmentReducer";
import { createAssessment } from "@/services/apiServices/assessment";
import { useMutation } from "@tanstack/react-query";
import { useLocation, useNavigate, useParams } from "react-router-dom";

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
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const pathName = window.location.pathname;
  const currentUser = pathName.split("/")[1];
  const { courseId } = useParams();

  console.log("sectionIDsectionIDsectionID", sectionID);

  const { mutate, isPending } = useMutation({
    mutationFn: createAssessment,
    onSuccess: (res) => {
      if (!location.pathname.includes("add_assessment")) {
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
        navigate(
          `/${currentUser}/add_assessment/${res?.data?.data?.id}?` +
            new URLSearchParams(queryParams as any).toString()
        );
      }

      dispatch(setQuestionType(data[0]));
      setIsOpenAssessmentModal(false);
    },
  });

  const handleButtonClick = () => {
    if (!location.pathname.includes("add_assessment")) {
      const payload = {
        moduleSection: sectionID as number,
      };
      mutate(payload);
    } else {
      dispatch(setQuestionType(data[0]));
      setIsOpenAssessmentModal(false);
    }
  };

  return (
    <div className="">
      <div
        onClick={handleButtonClick}
        className="md:w-[190px] sm:w-[150px] w-[95px] sm:h-[150px] h-[95px] cursor-pointer border border-[#D9D9D9] flex justify-center items-center rounded-lg hover:border-[#64A70B] group"
      >
        <div className="text-center flex flex-col sm:gap-2 gap-1">
          <h4 className="md:text-xl text-sm font-bold font-calibri text-black group-hover:text-[#64A70B] max-w-[160px] break-all">
            {data[0]}
          </h4>
          <h6 className="md:text-base text-xs font-calibri text-black group-hover:text-[#64A70B]">
            {data[1]}
          </h6>
        </div>
      </div>
      <Loading isLoading={isPending} />
    </div>
  );
};

export default AssessmentModalSelectItem;

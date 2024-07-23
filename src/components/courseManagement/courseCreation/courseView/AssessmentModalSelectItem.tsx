import { useNavigate, useParams } from "react-router-dom";

const AssessmentModalSelectItem = ({ data, moduleId }: any) => {
  const navigate = useNavigate();
  const pathName = window.location.pathname;
  const currentUser = pathName.split("/")[1];
  const { courseId } = useParams()
  

  const handleButtonClick = () => {
    const searchParams = new URLSearchParams(window.location.search);
    const queryParams: { [key: string]: string | null } = {};
    for (const param of searchParams.keys()) {
      queryParams[param] = searchParams.get(param);
    }

    if (courseId) {
      queryParams['courseId'] = courseId;
    }
    
    if (moduleId) {
      queryParams['moduleId'] = moduleId;
    }

    navigate(
      `/${currentUser}/add_assessment/${data[0]?.toLowerCase()}?` +
        new URLSearchParams(queryParams as any).toString()
    );
  };

  return (
    <div className="w-1/3 flex justify-center">
      <div
        onClick={handleButtonClick}
        className="md:w-[200px] sm:w-[150px] w-[95px] sm:h-[150px] h-[95px] cursor-pointer border border-[#D9D9D9] flex justify-center items-center rounded-lg hover:border-[#64A70B] md:mb-5 sm:mb-4 mb-2.5 group"
      >
        <div className="text-center flex flex-col sm:gap-2 gap-1">
          <h4 className="md:text-xl text-sm font-bold font-calibri text-black group-hover:text-[#64A70B]">
            {data[0]}
          </h4>
          <h6 className="md:text-base text-xs font-calibri text-black group-hover:text-[#64A70B]">
            {data[1]}
          </h6>
        </div>
      </div>
    </div>
  );
};

export default AssessmentModalSelectItem;

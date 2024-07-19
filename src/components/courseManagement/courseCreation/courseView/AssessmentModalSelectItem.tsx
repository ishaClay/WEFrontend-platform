import { useNavigate, useParams } from "react-router-dom";

const AssessmentModalSelectItem = ({ data }: any) => {
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

    navigate(
      `/${currentUser}/add_assessment/${data[0]?.toLowerCase()}?` +
        new URLSearchParams(queryParams as any).toString()
    );
  };

  return (
    <div className="w-1/3">
      <div
        onClick={handleButtonClick}
        className="w-[200px] h-[150px] cursor-pointer border border-[#D9D9D9] flex justify-center items-center rounded-lg hover:border-[#64A70B] mb-5 group"
      >
        <div className="text-center">
          <h4 className="text-xl font-bold font-calibri pb-2 text-black group-hover:text-[#64A70B]">
            {data[0]}
          </h4>
          <h6 className="text-base font-calibri text-black group-hover:text-[#64A70B]">
            {data[1]}
          </h6>
        </div>
      </div>
    </div>
  );
};

export default AssessmentModalSelectItem;

const EnrolledCourseListItem = ({ data }: { data: any }) => {
  return (
    <div className="">
      <div className="flex items-center">
        <div className="w-[250px] rounded-md overflow-hidden">
          <img src={data.image} alt=""></img>
        </div>
        <div className="text-left ps-6">
          <h5 className="text-[#1D2026] font-bold mb-3 text-base">
            {data.title}
          </h5>
          <h6 className="pb-2 flex font-calibri text-base text-[#1D2026]">
            <span>Trainer :</span>
            {data.trainer}
          </h6>
          <div className="flex items-center">
            <div className="pe-5 flex">
              <span className="text-base text-[#1D2026] font-calibri">
                Enrolled Companies :
              </span>
              <span className="text-base text-[#1D2026] font-calibri font-bold">
                {data.enrolledComany}
              </span>
            </div>
            <div className="flex">
              <span className="text-base text-[#1D2026] font-calibri">
                Enrolled Employees :
              </span>
              <span className="text-base text-[#1D2026] font-calibri font-bold">
                {data.enrolledEmployees}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnrolledCourseListItem;

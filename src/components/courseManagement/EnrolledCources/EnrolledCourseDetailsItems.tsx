type detailsListProps = {
  data: {
    cohortGroup: number;
    enrolledCompanies: number;
    enrolledEmployees: number;
    buttonAction: string;
    startDate: string;
    endDate: string;
  };
};

const EnrolledCourseDetailsItems = ({ data }: detailsListProps) => {
  return (
    <div className="grid lg:grid-cols-5 sm:grid-cols-3 grid-cols-2 gap-2 w-full">
      <div className="col-span-1 text-left font-bold text-base font-calibri">
        <h5>Cohort Group:</h5>
        <h6>{data.cohortGroup}</h6>
      </div>
      <div className="col-span-1 text-left font-bold text-base font-calibri">
        <h5>Enrolled Companies:</h5>
        <h6>{data.enrolledCompanies}</h6>
      </div>
      <div className="col-span-1 text-left font-bold text-base font-calibri">
        <h5>Enrolled Companies:</h5>
        <h6>{data.enrolledEmployees}</h6>
      </div>
      <div className="col-span-1 text-left font-bold text-base font-calibri">
        <button className="bg-[#D6F5AC] text-xs text-black rounded-full leading-4 py-2 px-4">
          {data.buttonAction}
        </button>
      </div>
      <div className="sm:col-span-1 col-span-2 text-left font-bold text-base font-calibri">
        <span className="block">Start Date: {data.startDate}</span>
        <span className="block">End Date: {data.endDate}</span>
      </div>
    </div>
  );
};

export default EnrolledCourseDetailsItems;

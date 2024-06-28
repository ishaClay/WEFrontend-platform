import UserManualList from "./UserManualList";

const UserManual = () => {
  const supportList = [
    {
      id: "#01",
      title: "User manual for SME admin",
      type: "User Manual",
    },
    {
      id: "#02",
      title: "User manual for SME admin",
      type: "User Manual",
    },
    {
      id: "#03",
      title: "User manual for SME admin",
      type: "User Manual",
    },
    {
      id: "#04",
      title: "User manual for SME admin",
      type: "User Manual",
    },
    {
      id: "#05",
      title: "User manual for SME admin",
      type: "User Manual",
    },
    {
      id: "#06",
      title: "User manual for SME admin",
      type: "User Manual",
    },
    {
      id: "#07",
      title: "User manual for SME admin",
      type: "User Manual",
    },
    {
      id: "#08",
      title: "User manual for SME admin",
      type: "User Manual",
    },
    {
      id: "#09",
      title: "User manual for SME admin",
      type: "User Manual",
    },
  ];
  return (
    <div className="bg-white rounded-md">
      <h6 className="text-base font-calibri font-bold leading-5 py-5 px-7 border-b border-[#D9D9D9]">
        User Manual
      </h6>
      <div className="sm:p-5 p-4 grid xl:grid-cols-3 md:grid-cols-2 grid-cols-1 xl:gap-5 gap-4">
        {supportList.map((user, index: number) => {
          return <UserManualList key={index} list={user} />;
        })}
      </div>
    </div>
  );
};

export default UserManual;

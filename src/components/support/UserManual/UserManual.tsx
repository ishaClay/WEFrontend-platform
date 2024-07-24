import { useQuery } from "@tanstack/react-query";
import UserManualList from "./UserManualList";
import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { QUERY_KEYS } from "@/lib/constants";
import Loader from "@/components/comman/Loader";
import { fetchDocument } from "@/services/apiServices/Document";
import { UserRole } from "@/types/UserRole";
import { getUserManual } from "@/types/userManual";
import Paginations from "@/components/comman/Pagination";
const UserManual = () => {
  const [page, setPage] = useState(1);
  const { UserId } = useSelector((state: RootState) => state.user);
  const userData = JSON.parse(localStorage.getItem("user") as string);
  const userRole = userData ? userData?.query?.role : null;
  const Role =
    UserRole.Trainer === +userRole
      ? 1
      : UserRole?.Trainee === +userRole
      ? 2
      : UserRole?.Company === +userRole
      ? 3
      : 4;

  const { data: userManual_List, isPending } = useQuery<getUserManual>({
    queryKey: [QUERY_KEYS.getUserManual, { page }],
    queryFn: () =>
      fetchDocument({ page: page, userId: UserId.toString(), role: +Role }),
  });
  return (
    <div className="bg-white rounded-md">
      <h6 className="text-base font-calibri font-bold leading-5 py-5 px-7 border-b border-[#D9D9D9]">
        User Manual
      </h6>
      <div
        className={`sm:p-5 p-4 grid xl:gap-5 gap-4 ${
          isPending
            ? "grid-cols-1"
            : "xl:grid-cols-3 md:grid-cols-2 grid-cols-1"
        }`}
      >
        {isPending ? (
          <Loader />
        ) : userManual_List?.data && userManual_List?.data?.length > 0 ? (
          userManual_List?.data?.map((user, index: number) => {
            return <UserManualList data={user} key={index} />;
          })
        ) : (
          <span className="py-10 flex justify-center">No data</span>
        )}
      </div>
      <div className="pb-4">
        <Paginations
          currentPage={userManual_List?.metadata?.currentPage || 1}
          totalPages={userManual_List?.metadata?.totalPages || 1}
          itemsPerPage={10}
          setCurrentPage={setPage}
        />
      </div>
    </div>
  );
};

export default UserManual;

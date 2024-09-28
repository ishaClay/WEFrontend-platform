import { useAppSelector } from "@/hooks/use-redux";
import { QUERY_KEYS } from "@/lib/constants";
import { RootState } from "@/redux/store";
import { fetchCoursePublishAdminClient } from "@/services/apiServices/courseManagement";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Loader from "../comman/Loader";
import HomeFooter from "../homePage/HomeFooter";
import HomeHeader from "../homePage/HomeHeader";
import OurCourseList from "./OurCourseList";
import SearchBox from "../comman/SearchBox";
import { useEffect, useState } from "react";
import Paginations from "../comman/Pagination";

const OurCourses = () => {
  const queryClient = useQueryClient();
  const { clientId } = useAppSelector((state: RootState) => state.user);
  const [query, searchQuery] = useState("");
  const [page, setPage] = useState(1);

  const { data: course, isLoading, isFetching } = useQuery({
    queryKey: [QUERY_KEYS.coursePublishAdminClient],
    queryFn: () => fetchCoursePublishAdminClient(+clientId, query, page),
  });

  useEffect(() => {
    queryClient.invalidateQueries({ 
      queryKey: [QUERY_KEYS.coursePublishAdminClient] 
    });
  }, [query, page]);


  return (
    <>
      <HomeHeader />
      <div className="xl:max-w-[1160px] max-w-full w-full mx-auto">
        <SearchBox
          containerClassName="mt-8"
          placeholder="Search by course name..."
          value={query}
          onChange={(e) => searchQuery(e.target.value)}
        />
        <div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1  xl:px-0 md:px-3 px-4 py-7">
          {isLoading || isFetching ? (
            <Loader containerClassName="col-span-full" />
          ) : (
            course?.data?.map((data: any, index: number) => {
              return <OurCourseList key={index} data={data} />;
            })
          )}
        </div>
        {course?.data && !isFetching && <Paginations 
          className="mb-10"
          itemsPerPage={course?.metadata?.itemsPerPage}
          totalPages={course?.metadata?.totalPages}
          currentPage={course?.metadata?.currentPage}
          setCurrentPage={(page: number) => setPage(page)}
        />}
      </div>
      <HomeFooter />
    </>
  );
};

export default OurCourses;

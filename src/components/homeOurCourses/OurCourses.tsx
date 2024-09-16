import { useAppSelector } from "@/hooks/use-redux";
import { QUERY_KEYS } from "@/lib/constants";
import { RootState } from "@/redux/store";
import { fetchCoursePublishAdminClient } from "@/services/apiServices/courseManagement";
import { useQuery } from "@tanstack/react-query";
import Loader from "../comman/Loader";
import HomeFooter from "../homePage/HomeFooter";
import HomeHeader from "../homePage/HomeHeader";
import OurCourseList from "./OurCourseList";
import SearchBox from "../comman/SearchBox";
import { useState } from "react";

const OurCourses = () => {
  const { clientId } = useAppSelector((state: RootState) => state.user);
  const [query, searchQuery] = useState("");

  const { data: course, isLoading } = useQuery({
    queryKey: [QUERY_KEYS.coursePublishAdminClient],
    queryFn: () => fetchCoursePublishAdminClient(+clientId),
  });

  const filteredData = course?.data
    ? course?.data?.filter((item: any) =>
        item.title?.toLowerCase()?.includes(query.toLowerCase())
      )
    : [];

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
          {isLoading ? (
            <Loader containerClassName="col-span-full" />
          ) : (
            filteredData?.map((data: any, index: number) => {
              return <OurCourseList key={index} data={data} />;
            })
          )}
        </div>
      </div>
      <HomeFooter />
    </>
  );
};

export default OurCourses;

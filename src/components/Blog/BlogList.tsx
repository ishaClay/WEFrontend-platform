import HomeFooter from "../homePage/HomeFooter";
import BlogListItems from "./BlogListItems";
import HomeHeader from "../homePage/HomeHeader";
import { blogList } from "@/blogs";

const BlogList = () => {
  const blogLists = blogList;
  
  return (
    <>
      <HomeHeader />
      <div className="xl:max-w-[1160px] max-w-full w-full mx-auto xl:px-0 px-4 lg:py-20 sm:py-14 py-10">
        <div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6">
          {blogLists?.map((data, index) => {
            return <BlogListItems key={index} data={data} />;
          })}
        </div>
      </div>
      <HomeFooter />
    </>
  );
};

export default BlogList;

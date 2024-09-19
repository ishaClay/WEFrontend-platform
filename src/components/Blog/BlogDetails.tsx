import { MoveLeft } from "lucide-react";
import HomeFooter from "../homePage/HomeFooter";
import HomeHeader from "../homePage/HomeHeader";
import { useNavigate, useParams } from "react-router-dom";
import { blogList } from "@/blogs";

const BlogDetails = () => {
  const navigate = useNavigate();
  const {id} = useParams();
  const singleBlog = blogList?.find((blog) => blog?.id === (id && +id));

  return (
    <>
      <HomeHeader />
      <div className="xl:max-w-[1160px] max-w-full w-full mx-auto xl:px-0 px-4 md:py-14 sm:py-10 py-8">
        <div className="bg-white p-4 rounded-md shadow-md flex flex-col gap-5">
          <div className="">
            <div className="flex items-center justify-between">
              <h3 className="font-droid text-2xl font-black mb-4">
                {singleBlog?.title}
              </h3>
              <div
                className="flex pr-5 cursor-pointer text-black"
                onClick={() => {
                  navigate('/blog');
                }}
              >
                <MoveLeft />
                <span className="text-base font-semibold pl-4">Back</span>
              </div>
            </div>
            <div className="h-[500px]">
              <img src={singleBlog?.image} alt="blog img" className="w-full h-full object-cover" />
            </div>
          </div>
          <div className="">
            <p className="text-[#4E5566] text-base mb-4">
              {singleBlog?.description}
            </p>
          </div>
        </div>
      </div>
      <HomeFooter />
    </>
  );
};

export default BlogDetails;

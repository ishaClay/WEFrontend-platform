import { blogList } from "@/blogs";
import { MoveLeft } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import HomeFooter from "../homePage/HomeFooter";
import HomeHeader from "../homePage/HomeHeader";

const BlogDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
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
                  navigate("/blog");
                }}
              >
                <MoveLeft />
                <span className="text-base font-semibold pl-4">Back</span>
              </div>
            </div>
            <div className="h-[500px]">
              <img
                src={singleBlog?.image}
                alt="blog img"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <div className="">
            <h3 className="font-droid text-lg font-black mb-2">
              Environmental Sustainability
            </h3>
            <p className="text-[#4E5566] font-droid text-base mb-4">
              This area of sustainability focuses on reducing negative impacts
              on the environment, such as carbon emissions, waste generation,
              and biodiversity. Companies can improve their environmental
              sustainability by adopting sustainable practices in areas such as
              energy efficiency, renewable energy, resource conservation, and
              pollution prevention.
            </p>
            <h3 className="font-droid text-lg font-black mb-2">
              Social Sustainability
            </h3>
            <p className="text-[#4E5566] font-droid text-base mb-4">
              This area of sustainability focuses on improving the well-being of
              communities and stakeholders impacted by a company's operations,
              including employees, customers, suppliers, and local communities.
              Companies can improve their social sustainability by addressing
              issues such as labour standards, human rights, diversity and
              inclusion, and community engagement.
            </p>
            <h3 className="font-droid text-lg font-black mb-2">
              Economic Sustainability
            </h3>
            <p className="text-[#4E5566] font-droid text-base mb-4">
              This area of sustainability focuses on the financial
              sustainability of a company's operations, including profitability,
              resilience, and long-term viability. Companies can improve their
              economic sustainability by adopting sustainable business practices
              that balance short-term and long-term financial goals, including
              supply chain management, risk management, and financial reporting.
            </p>
            <h3 className="font-droid text-lg font-black mb-2">
              Governance and Ethics
            </h3>
            <p className="text-[#4E5566] font-droid text-base mb-4">
              This area of sustainability focuses on the governance structure of
              a company and the ethical standards it upholds. Companies can
              improve their governance and ethics by ensuring transparency,
              accountability, and ethical behaviour in all aspects of their
              operations, including corporate governance, risk management, and
              stakeholder engagement.
            </p>
            <h3 className="font-droid text-lg font-black mb-2">
              Innovation and Technology
            </h3>
            <p className="text-[#4E5566] font-droid text-base mb-4">
              This area of sustainability focuses on the role of innovation and
              technology in advancing sustainability, including the development
              of new products, services, and business models that create value
              for society and the environment.
            </p>
          </div>
        </div>
      </div>
      <HomeFooter />
    </>
  );
};

export default BlogDetails;

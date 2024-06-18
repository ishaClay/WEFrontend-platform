import { CourseEntity } from "@/types/courseManagement";
import starImage from "@/assets/images/Vector.png";

const ListView = ({ list }: { list: CourseEntity[] }) => {
  return (
    <div>
      <div>
        {list.map((data: any, index: number) => {
          console.log("++++++++++++++", data);
          // data?.data?.module?.length
          return (
            <div key={index} className="border rounded overflow-hidden">
              <div className="max-w-[267px] w-full h-[170px]">
                <img
                  src={data.course?.bannerImage}
                  alt=""
                  className="w-full h-full"
                />
              </div>
              <div>
                <h6>{data.course?.title}</h6>
                <div className="flex">
                  <p>Created By : Prime Infotech</p>
                  <div className="flex">
                    <img src={starImage} alt="" />
                    <p>4.5</p>
                  </div>
                </div>
                <div>
                  <div>Module : {data?.data?.module?.length || "-"}</div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ListView;

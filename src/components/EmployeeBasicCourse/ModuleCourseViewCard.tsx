import ModuleCourseViewCardItems from "./ModuleCourseViewCardItems";

const ModuleCourseViewCard = ({ data }: any) => {
  console.log("data+++data", data?.moduleSections);

  return (
    <div>
      {data?.moduleSections
        .sort((a: any, b: any) => a.position - b.position)
        ?.map((data: any, index: number) => {
          return <ModuleCourseViewCardItems key={index} list={data} />;
        })}
    </div>
  );
};

export default ModuleCourseViewCard;

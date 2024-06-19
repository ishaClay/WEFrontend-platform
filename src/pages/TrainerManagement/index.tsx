import TrainerManagement from "@/components/TrainerManagement";
import { BreadcrumbWithCustomSeparator } from "@/components/comman/Breadcrumb";

const TrainerManagementPage = () => {
  const breadcrumbData = [
    {
      label: "Trainer Management",
      link: "/trainer-management",
    },
    {
      label: "Trainer Management",
    },
  ];
  return (
    <div className="">
      <div className="pb-[18px]">
        <BreadcrumbWithCustomSeparator breadcrumbData={breadcrumbData} />
      </div>
      <div className="bg-white rounded-[10px]">
        <TrainerManagement />
      </div>
    </div>
  );
};

export default TrainerManagementPage;

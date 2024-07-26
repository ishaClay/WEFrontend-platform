import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Link } from "react-router-dom";

interface BreadcrumbData {
  label: string;
  link?: string;
}

export function BreadcrumbWithCustomSeparator({
  breadcrumbData,
}: {
  breadcrumbData: BreadcrumbData[];
}) {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        {breadcrumbData.map((item, index) => (
          <BreadcrumbItem key={index}>
            {item.link ? (
              <>
                <BreadcrumbItem>
                  <Link
                    className="font-calibri text-[16px] capitalize"
                    to={item.link}
                  >
                    {item.label}
                  </Link>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="font-calibri text-[16px]">
                  /
                </BreadcrumbSeparator>
              </>
            ) : (
              <BreadcrumbPage className="font-calibri text-[16px] capitalize">
                {item.label}
              </BreadcrumbPage>
            )}
          </BreadcrumbItem>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}

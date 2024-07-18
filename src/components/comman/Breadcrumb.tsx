import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

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
                  <BreadcrumbLink
                    className="font-calibri text-[16px] capitalize"
                    href={item.link}
                  >
                    {item.label}
                  </BreadcrumbLink>
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

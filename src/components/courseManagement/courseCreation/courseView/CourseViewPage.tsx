/* eslint-disable @typescript-eslint/ban-ts-comment */
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { AccordionContent } from "@radix-ui/react-accordion";
import CourseViewCardInner from "./CourseViewCardInner";
import CourseViewCardList from "./CourseViewCardList";

const CourseViewPage = ({
  data,
  currIndex,
}: {
  data: any;
  currIndex: number;
}) => {
  // @ts-ignore
  const CourseCardList = [...data.section, ...(data?.assessment as any)];  

  return (
    <div className="pb-5">
      <Accordion type={"single"} collapsible>
        <div className="space-y-[24px]">
          <AccordionItem
            className={`overflow-hidden rounded-lg p-0`}
            value={`item-${data.id}`}
          >
            <AccordionTrigger
              className={`sm:px-5 px-4 py-2.5 bg-[#F8F8F8] border-b border-[#D9D9D9]`}
            >
              <CourseViewCardList data={data} currIndex={currIndex} />
            </AccordionTrigger>
            <AccordionContent>
              <CourseViewCardInner
                CourseCardList={CourseCardList}
                moduleId={data.id}
                assessments={data?.assessment}
              />
            </AccordionContent>
          </AccordionItem>
        </div>
      </Accordion>
    </div>
  );
};

export default CourseViewPage;

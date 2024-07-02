import CourseViewCardList from "./CourseViewCardList";
import CourseViewCardInner from "./CourseViewCardInner";
import { Accordion, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { AccordionContent } from "@radix-ui/react-accordion";

const CourseViewPage = ({ data }: { data: any }) => {

  return (
    <div
      className="pb-5">
      <Accordion type={'single'} collapsible>
        <div className="space-y-[24px]">
          <AccordionItem
            className={`overflow-hidden rounded-lg p-0`}
            value={`item-${data.id}`}
          >
            <AccordionTrigger
              className={`p-5 bg-[#F8F8F8] border-b border-[#D9D9D9]`}
            >
              <CourseViewCardList data={data} />
            </AccordionTrigger>
            <AccordionContent><CourseViewCardInner CourseCardList={data.section} moduleId={data.id} /></AccordionContent>
          </AccordionItem>
        </div>
      </Accordion>
    </div>
  );
};

export default CourseViewPage;

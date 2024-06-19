import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { AccordionOption } from "@/types";
import { Separator } from "../ui/separator";

type AccordionsProps = {
  type?: "single" | "multiple";
  items: AccordionOption[];
  rounded?: boolean;
  separator?: boolean;
};

const Accordions = ({
  items,
  type = "single",
  rounded = true,
  separator = false,
}: AccordionsProps) => {
  return (
    <Accordion type={type} collapsible>
      <div className="space-y-[24px]">
        {items.map((item, index) => {
          return (
            <AccordionItem
              className={`overflow-hidden ${
                rounded ? "rounded-lg" : "rounded-none"
              }`}
              key={index}
              value={`item-${index + 1}`}
            >
              <AccordionTrigger className="">{item.title}</AccordionTrigger>
              {separator && (
                <Separator
                  className="bg-[#D9D9D9] mt-5"
                  orientation="horizontal"
                />
              )}
              <AccordionContent>{item.content}</AccordionContent>
            </AccordionItem>
          );
        })}
      </div>
    </Accordion>
  );
};

export default Accordions;

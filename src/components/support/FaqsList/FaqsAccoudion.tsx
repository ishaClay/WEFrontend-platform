import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion";
  import { Separator } from "../../ui/separator";
  import { AccordionOption } from "@/types/accoudion";
  
  type AccordionsProps = {
    type?: "single" | "multiple";
    items: AccordionOption[];
    rounded?: boolean;
    separator?: boolean;
    padding?: boolean;
    background?: boolean;
    border?: boolean;
  };
  
  const Accordions = ({
    items,
    type = "single",
    rounded = true,
    separator = false,
    padding = true,
    background = false,
    border = true,
  }: AccordionsProps) => {
    return (
      <Accordion type={type} collapsible>
        <div className="space-y-[24px]">
          {items?.map((item, index) => {
            return (
              <AccordionItem
                className={`overflow-hidden  ${
                  rounded ? "rounded-lg" : "rounded-none"
                } ${padding ? "p-5" : "p-0"} ${
                  border ? "border" : "border-none p-0"
                }`}
                key={index}
                value={`item-${index + 1}`}
              >
                <AccordionTrigger
                  className={`${background ? "p-5 bg-[#F8F8F8]" : "p-0"}`}
                >
                  {item.question}
                </AccordionTrigger>
                {separator && (
                  <Separator
                    className="bg-[#D9D9D9] mt-5"
                    orientation="horizontal"
                  />
                )}
                <AccordionContent>
                  {item.answer}
                  {item?.hyperlink !== "" && (
                    <a
                      className="ml-2 text-[#2F80ED]"
                      href={item?.hyperlink}
                      target="_blank"
                    >
                      See More
                    </a>
                  )}
                  </AccordionContent>
              </AccordionItem>
            );
          })}
        </div>
      </Accordion>
    );
  };
  
  export default Accordions;
  
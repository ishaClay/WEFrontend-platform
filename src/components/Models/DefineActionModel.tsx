import Tree_Planting from "@/assets/images/Tree_Planting.png";
import { addMeasuresItems } from "@/services/apiServices/pillar";
import { ErrorType } from "@/types/Errors";
import { SinglePillar } from "@/types/Pillar";
import { useMutation } from "@tanstack/react-query";
import { Dispatch, SetStateAction, useState } from "react";
import Modal from "../comman/Modal";
import { Button } from "../ui/button";
import { ScrollArea } from "../ui/scroll-area";
import { toast } from "../ui/use-toast";

interface PillerItem {
  [key: string]: string[];
}

const DefineActionModel = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const [actionItems, setActionItems] = useState<SinglePillar | null>(null);
  const [pillerItems, setPillerItems] = useState<PillerItem>({});
  const { mutate: createmeasuresitem, isPending: createPending } = useMutation({
    mutationFn: addMeasuresItems,
    onError: (error: ErrorType) => {
      toast({
        variant: "destructive",
        title: error.data.message,
      });
    },
  });

  // const handleSubmit = async (
  //   e: React.FormEvent<HTMLFormElement>,
  //   currentPiller: string
  // ) => {
  //   setOpen(!open);
  //   e.preventDefault();
  //   const measures = pillerItems[currentPiller].map((item) => ({
  //     measure: item,
  //   }));

  //   createmeasuresitem({ clientId, userId: userID, pillerId: pid, measures });
  // };
  return (
    <Modal
      open={open}
      onClose={() => setOpen(false)}
      className="lg:max-w-[815px] sm:max-w-xl max-w-[335px] xl:px-10 px-5 xl:py-8 py-4 rounded-xl"
    >
      <div className="">
        <div className="flex items-center mb-4 gap-5">
          <div className="bg-white rounded-full drop-shadow-md min-w-[42px] w-[42px] min-h-[42px] h-[42px] flex justify-center items-center">
            <img src={Tree_Planting} alt="plant" />
          </div>
          <div>
            <h2 className="text-base font-calibri font-bold text-[#1D2026]">
              Have you identified actionable items on provided measures?
            </h2>
          </div>
        </div>
        <div className="flex flex-col">
          <div className="md:mb-5 mb-3">
            <h5 className="text-[#1D2026] font-Calibri text-base font-bold">
              {actionItems?.pillarname}
            </h5>
          </div>
          <form
          // onSubmit={(e) => handleSubmit(e, currentPiller)}
          >
            <ScrollArea className="h-[300px]">
              <div className="grid sm:grid-cols-2 grid-cols-1 xl:gap-8 md:gap-5 gap-3">
                <div className="col-span-1 sm:h-[297px] h-[250px] border border-solid border-[#EBEAEA] rounded-xl overflow-auto">
                  <div className="w-full">
                    <div className="px-5 py-2 border-b border-solid">
                      <h5 className="text-[#1D2026] font-calibri font-bold">
                        Measures
                      </h5>
                    </div>
                    <div className="p-4 ">
                      {/* <ul className="list-disc list-inside text-[12px]  font-calibri">
                        {filteredOptions?.map((m: any) => {
                          if (m.measures) {
                            return <li>{m.measures}</li>;
                          }
                        })}
                      </ul> */}
                    </div>
                  </div>
                </div>

                <div className="col-span-1 sm:h-[297px] h-[250px] border border-solid border-[#EBEAEA] rounded-xl ">
                  <div className="w-full">
                    <div className="px-5 py-2 border-b border-solid">
                      <h5 className="text-[#1D2026] font-calibri font-bold">
                        Enter initiatives or action items
                      </h5>
                    </div>

                    {/* <div className="flex flex-col gap-5 px-3.5 py-2.5">
                      {pillerItems[currentPiller]?.map(
                        (item: any, index: number) => (
                          <div
                            key={index}
                            className="flex items-center justify-between"
                          >
                            <div className="border border-[#EBEAEA] rounded lg:w-[270px] md:[250px] w-[210px] overflow-hidden">
                              <input
                                type="text"
                                placeholder="Action item"
                                value={item}
                                // onChange={(e) =>
                                //   handleActionItemChange(
                                //     index,
                                //     e.target.value,
                                //     currentPiller
                                //   )
                                // }
                                className="border-none outline-none px-3 py-2 w-full text-base font-calibri"
                              />
                            </div>
                            <div className="flex items-center gap-1">
                              <button
                                type="button"
                                className="border-none bg-transparent text-lg cursor-pointer"
                                // onClick={() => setEditId(index)}
                              >
                                <BsPencil className="text-[#B9B9B9]" />
                              </button>
                              <button
                                type="button"
                                className="border-none bg-transparent text-lg cursor-pointer"
                                onClick={() =>
                                  // removeActionItem(index, currentPiller)
                                }
                              >
                                <RiDeleteBin6Line className="text-[#B9B9B9]" />
                              </button>
                            </div>
                          </div>
                        )
                      )}

                      <div className="text-right">
                        <Button
                          type="button"
                          // onClick={() => addActionItem(currentPiller)}
                          className="w-3 bg-black p-0 h-3 rounded-[2px]"
                        >
                          <Plus className="text-white" />
                        </Button>
                      </div>
                    </div> */}
                  </div>
                </div>
              </div>
            </ScrollArea>
            <div className="text-right mt-6">
              <Button
                type="submit"
                className="bg-[#64A70B] md:text-base text-sm font-bold md:h-12 h-10 lg:w-[120px] md:w-[100px] w-[80px] md:me-5 me-3 font-Poppins"
              >
                Save
              </Button>
              <Button
                type="button"
                className="bg-[#E41B1B] md:text-base text-sm font-bold md:h-12 h-10 lg:w-[120px] md:w-[100px] w-[80px] font-Poppins"
              >
                Close
              </Button>
            </div>
          </form>
        </div>
      </div>
    </Modal>
  );
};

export default DefineActionModel;

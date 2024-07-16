/* eslint-disable @typescript-eslint/ban-ts-comment */
import Tree_Planting from "@/assets/images/Tree_Planting.png";
import Loading from "@/components/comman/Error/Loading";
import Loader from "@/components/comman/Loader";
import Modal from "@/components/comman/Modal";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "@/components/ui/use-toast";
import { useAppSelector } from "@/hooks/use-redux";
import { QUERY_KEYS } from "@/lib/constants";
import {
  addMeasuresItems,
  deleteMeasuresItems,
  filterMaturityMeasures,
  getActionItembyPiller,
} from "@/services/apiServices/pillar";
import { ErrorType } from "@/types/Errors";
import { MaturityLevelOneResponse } from "@/types/message";
import { MeasuresItemsResponse } from "@/types/Pillar";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Plus } from "lucide-react";
import React, { Dispatch, useEffect, useState } from "react";
import { BsPencil } from "react-icons/bs";
import { RiDeleteBin6Line } from "react-icons/ri";

interface PillerItem {
  [key: string]: string[];
}

interface ActionItemModelProps {
  open: boolean;
  setOpen: Dispatch<React.SetStateAction<boolean>>;
  currentPiller: string;
  setPId: Dispatch<React.SetStateAction<string | null>>;
  pid: string | null;
  selectmaturity: string;
}

const ActionItemModel = ({
  open,
  setOpen,
  currentPiller,
  setPId,
  pid,
  selectmaturity,
}: ActionItemModelProps) => {
  const [pillerItems, setPillerItems] = useState<PillerItem>({});
  const queryClient = useQueryClient();
  const { clientId, UserId } = useAppSelector((state) => state.user);
  const userData = JSON.parse(localStorage.getItem("user") as string);
  const userID = UserId
    ? +UserId
    : userData?.query
    ? userData?.query?.id
    : userData?.id;

  const handleClose = async () => {
    setPillerItems({});
    setOpen(false);
    setPId(null);
  };

  const { mutate: createmeasuresitem, isPending: createPending } = useMutation({
    mutationFn: addMeasuresItems,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.maturitypillar],
      });

      handleClose();
    },
    onError: (error: ErrorType) => {
      toast({
        variant: "destructive",
        title: error.data.message,
      });
    },
  });

  const { mutate: deleteMeasuresItemsFun, isPending: deletePending } =
    useMutation({
      mutationFn: (id: number) => deleteMeasuresItems(id),
      onSuccess: async () => {
        await queryClient.invalidateQueries({
          queryKey: [QUERY_KEYS.maturitypillar],
        });

        handleClose();
      },
      onError: (error: ErrorType) => {
        toast({
          variant: "destructive",
          title: error.data.message,
        });
      },
    });

  const { data: getActionItems, isLoading } = useQuery<MeasuresItemsResponse>({
    queryKey: [QUERY_KEYS.getActionItems, { pid, userID }],
    queryFn: () => getActionItembyPiller(pid ? +pid : 0, userID),
    enabled: !!pid && !!userID,
    // enabled: open && !!pid && !!userID,
  });

  const { data: filtermesuresdata, isLoading: measuresPending } =
    useQuery<MaturityLevelOneResponse>({
      queryKey: [
        QUERY_KEYS.filterMaturityMeasures,
        { selectmaturity, userID, clientId },
      ],
      queryFn: () =>
        filterMaturityMeasures(
          clientId as string,
          userID as string,
          selectmaturity as string,
          pid as string
        ),
      enabled: !!selectmaturity,
    });

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
    currentPiller: string
  ) => {
    e.preventDefault();
    const measures = pillerItems[currentPiller].map((item) => {
      // @ts-ignore
      if (!!item?.id && !!item?.name) {
        // @ts-ignore
        return { name: item?.name, id: item?.id };
      } else {
        return { name: item };
      }
    });

    createmeasuresitem({ clientId, userId: userID, pillerId: pid, measures });
  };

  const handleActionItemChange = (
    index: number,
    value: string,
    currentPiller: string
  ) => {
    setPillerItems((prev) => ({
      ...prev,
      [currentPiller]: prev[currentPiller].map((item: string, i: number) => {
        if (i === index) {
          return value;
        }
        return item;
      }),
    }));
  };

  const removeActionItem = (
    index: number,
    currentPiller: string,
    measuresItemsId: number
  ) => {
    setPillerItems(
      (prev) =>
        ({
          [currentPiller]: prev[currentPiller].filter((item, i) => {
            console.log(item);
            return i !== index;
          }),
        } as PillerItem)
    );
    deleteMeasuresItemsFun(measuresItemsId);
  };

  const addActionItem = (currentPiller: string) => {
    setPillerItems({
      [currentPiller]: [...pillerItems[currentPiller], ""],
    } as PillerItem);
  };

  useEffect(() => {
    if (getActionItems && currentPiller) {
      setPillerItems({
        [currentPiller]: (getActionItems?.data &&
          getActionItems?.data?.length > 0 &&
          getActionItems?.data?.map((item) => ({
            id: item?.id,
            name: item?.measure,
          }))) || [""],
      } as PillerItem);
    }
  }, [getActionItems, currentPiller]);

  console.log("getActionItems", filtermesuresdata);

  return (
    <Modal
      open={open}
      onClose={() => {
        setOpen(false);
        setPId(null);
      }}
      className="lg:max-w-[815px] sm:max-w-xl max-w-[335px] p-5 rounded-xl"
    >
      <div className="">
        <div className="flex items-center mb-6 gap-5">
          <div className="bg-white rounded-full drop-shadow-md min-w-[42px] w-[42px] min-h-[42px] h-[42px] flex justify-center items-center">
            <img src={Tree_Planting} alt="plant" />
          </div>
          <div>
            <h2 className="text-base font-calibri font-bold text-[#1D2026]">
              Have you identified actionable items on provided measures?
            </h2>
          </div>
        </div>
        <div className="sm:flex block items-center py-2.5 px-3.5 bg-[#EDF0F4] rounded-xl mb-4">
          <div className="min-w-6 min-h-6 w-6 h-6 rounded-full bg-[#FFD56A] text-white text-center text-base me-4">
            i
          </div>
          <div className="sm:mt-0 mt-3">
            <h6 className="text-[#606060] font-extrabold text-base pb-1">
              Nothing’s set in stone here!
            </h6>
            <p className="text-[#606060] text-base lg:w-[65%] md:w-[80%] w-full font-abhaya font-semibold">
              Discuss sustainability initiatives or action items with your
              colleagues. And come back to edit them anytime.
            </p>
          </div>
        </div>
        <div className="flex flex-col">
          <h5 className="text-[#1D2026] font-Calibri text-base font-bold md:pb-4 pb-3">
            {currentPiller}
          </h5>
          <ScrollArea className="sm:h-auto h-[300px]">
            <div className="grid sm:grid-cols-2 grid-cols-1 xl:gap-8 md:gap-5 gap-3">
              <div className="col-span-1 sm:h-[333px] h-[250px] border border-solid border-[#EBEAEA] rounded-xl overflow-auto">
                <div className="w-full">
                  <div className="px-5 py-2 border-b border-solid h-[42px]">
                    <h5 className="text-[#1D2026] font-calibri font-bold">
                      Measures
                    </h5>
                  </div>
                  <ScrollArea className="h-[250px]">
                    <div className="md::p-4 p-3">
                      <ul className="pl-5 list-disc">
                        {measuresPending ? (
                          <Loader />
                        ) : (
                          filtermesuresdata?.data?.map((item) => {
                            console.log("item?.pillarid", item?.pillarid, pid);
                            return (
                              pid &&
                              item?.pillarid === +pid &&
                              item?.filteredOptions?.map((it, i: number) => {
                                return <li key={i}>{it?.measures}</li>;
                              })
                            );
                          })
                        )}
                      </ul>
                    </div>
                  </ScrollArea>
                </div>
              </div>

              <div className="col-span-1">
                <form
                  onSubmit={(e) => handleSubmit(e, currentPiller)}
                  className=""
                >
                  <div className="sm:h-[297px] h-[250px] border border-solid border-[#EBEAEA] rounded-xl overflow-auto">
                    <div className="px-5 py-2 border-b border-solid h-[42px] relative">
                      <h5 className="text-[#1D2026] font-calibri font-bold">
                        Enter initiatives or action items
                      </h5>
                    </div>
                    <div className="w-full">
                      <ScrollArea className="h-[225px]">
                        <div className="flex flex-col gap-5 px-3.5 py-2.5">
                          {isLoading ? (
                            <Loader />
                          ) : (
                            pillerItems[currentPiller]?.map(
                              (item, index: number) => (
                                <div
                                  key={index}
                                  className="flex items-center justify-between"
                                >
                                  <div className="border border-[#EBEAEA] rounded lg:w-[270px] md:[250px] w-[190px] overflow-hidden">
                                    <input
                                      type="text"
                                      placeholder="Action item"
                                      value={
                                        typeof item === "string"
                                          ? item
                                          : // @ts-ignore
                                            item?.name
                                      }
                                      onChange={(e) =>
                                        handleActionItemChange(
                                          index,
                                          e.target.value,
                                          currentPiller
                                        )
                                      }
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
                                        removeActionItem(
                                          index,
                                          currentPiller,
                                          // @ts-ignore
                                          +item?.id
                                        )
                                      }
                                    >
                                      <RiDeleteBin6Line className="text-[#B9B9B9]" />
                                    </button>
                                  </div>
                                </div>
                              )
                            )
                          )}
                        </div>
                        <div className="text-right py-2.5 px-3.5">
                          <Button
                            type="button"
                            onClick={() => addActionItem(currentPiller)}
                            className="w-3 bg-black p-0 h-3 rounded-[2px]"
                          >
                            <Plus className="text-white" />
                          </Button>
                        </div>
                      </ScrollArea>
                    </div>
                  </div>
                  <div className="text-right mt-6">
                    <Button
                      type="submit"
                      isLoading={createPending}
                      className="bg-[#64A70B] md:text-base text-sm font-bold md:h-12 h-10 lg:w-[120px] md:w-[100px] w-[80px] md:me-5 me-3 font-Poppins"
                    >
                      Save
                    </Button>
                    <Button
                      type="button"
                      onClick={handleClose}
                      className="bg-[#E41B1B] md:text-base text-sm font-bold md:h-12 h-10 lg:w-[120px] md:w-[100px] w-[80px] font-Poppins"
                    >
                      Close
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          </ScrollArea>
        </div>
      </div>
      <Loading isLoading={deletePending} />
    </Modal>
  );
};

export default ActionItemModel;

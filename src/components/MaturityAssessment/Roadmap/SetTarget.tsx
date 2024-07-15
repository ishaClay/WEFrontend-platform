/* eslint-disable @typescript-eslint/ban-ts-comment */
import Tree_Planting from "@/assets/images/Tree_Planting.png";
import Menu_Icon from "@/assets/images/menu_icon.png";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { QUERY_KEYS } from "@/lib/constants";

import Loading from "@/components/comman/Error/Loading";
import Loader from "@/components/comman/Loader";
import Modal from "@/components/comman/Modal";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useAppSelector } from "@/hooks/use-redux";
import { getImages } from "@/lib/utils";
import { setMaturitypillar, setPillars } from "@/redux/reducer/PillarReducer";
import { enumUpadate } from "@/services/apiServices/enum";
import {
  addMeasuresItems,
  deleteMeasuresItems,
  fetchMaturityPillar,
  filterMaturityMeasures,
  getActionItembyPiller,
  updatePillarCheckbox,
} from "@/services/apiServices/pillar";
import { ErrorType } from "@/types/Errors";
import {
  FilteredOptionsEntity,
  MeasuresItemsResponse,
  SinglePillar,
} from "@/types/Pillar";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Plus } from "lucide-react";
import { Dispatch, useEffect, useMemo, useState } from "react";
import { BsPencil } from "react-icons/bs";
import { FaStar } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useDispatch } from "react-redux";

interface PillerItem {
  [key: string]: string[];
}

const SetTarget = ({
  setStep,
}: {
  setStep: Dispatch<React.SetStateAction<number>>;
}) => {
  const [open, setOpen] = useState(false);
  const [actionItems, setActionItems] = useState<SinglePillar | null>(null);
  const [pillerItems, setPillerItems] = useState<PillerItem>({});
  const [view, setView] = useState<{ id: number; view: number }[] | null>(null);
  const [measuresList, setMeasuresList] = useState<FilteredOptionsEntity[]>([]);
  console.log("actionItems", pillerItems, measuresList);

  const [pid, setPId] = useState<string | null>("");
  const [currentPiller, setCurrentPiller] = useState<string>("");

  // const [checkedStates, setCheckedStates] = useState([]);

  const [selectmaturity, setselectMaturity] = useState("");
  const [editId, setEditId] = useState<number | null>(null);
  console.log(editId);
  const dispatch = useDispatch();
  const pillars = useAppSelector((state: any) => state.pillar?.maturitypillar);
  // console.log("pillarspillars", pillars);
  const [actionItemsList, setActionItemsList] = useState<boolean>(false);
  const { clientId, UserId } = useAppSelector((state: any) => state.user);
  const userData = JSON.parse(localStorage.getItem("user") as string);
  const userID = UserId
    ? +UserId
    : userData?.query
    ? userData?.query?.id
    : userData?.id;
  // console.log("clientIdclientId", clientId);

  useEffect(() => {
    if (pillars) {
      const viewData = pillars.map((item: any) => {
        return {
          id: item?.pillarid,
          view: 2,
        };
      });
      setView(viewData);
    }
  }, [pillars]);

  const handleChangesView = (piller: number) => {
    setView((prev: any) => {
      return prev.map((item: any) => {
        if (item.id === piller) {
          return {
            ...item,
            view: item.view === 2 ? 0 : 2,
          };
        }
        return item;
      });
    });
  };

  const { toast } = useToast();
  const queryClient = useQueryClient();

  // console.log(actionItems)
  const addActionItem = (currentPiller: string) => {
    setPillerItems({
      [currentPiller]: [...pillerItems[currentPiller], ""],
    } as PillerItem);
  };

  // const addActionItem1 = () => {
  //   setActionItems1([...actionItems1, ""]);
  // };

  const { data: maturitypillar, isPending } = useQuery({
    queryKey: [QUERY_KEYS.maturitypillar],
    queryFn: () => fetchMaturityPillar(clientId, userID),
    enabled: true,
  });

  const { data: getActionItems, isLoading } = useQuery<MeasuresItemsResponse>({
    queryKey: [QUERY_KEYS.getActionItems, { pid, userID }],
    queryFn: () => getActionItembyPiller(pid ? +pid : 0, userID),
    enabled: !!pid && !!userID,
    // enabled: open && !!pid && !!userID,
  });

  console.log("maturitypillar", maturitypillar);
  useEffect(() => {
    if (getActionItems && currentPiller) {
      setPillerItems({
        [currentPiller]: (getActionItems?.data &&
          getActionItems?.data?.length > 0 &&
          getActionItems?.data?.map((item) => ({
            id: item?.id,
            name: item?.measure,
          }))) || [""],
      } as any);
    }
  }, [getActionItems, currentPiller]);

  console.log("getActionItemsgetActionItemsgetActionItems", view);

  const { data: filtermesuresdata, isLoading: measuresPending } = useQuery({
    queryKey: [
      QUERY_KEYS.filterMaturityMeasures,
      { selectmaturity, pid, userID, clientId },
    ],
    queryFn: () =>
      filterMaturityMeasures(
        clientId as string,
        userID as string,
        selectmaturity as any,
        pid as string
      ),
    enabled: !!selectmaturity || !!pid,
  });

  console.log("isPending", measuresPending);

  // const { data: getCheckedmeasures } = useQuery({
  //   queryKey: [QUERY_KEYS.checkedMeasures],
  //   queryFn: () => getCheckedMeasures(UserId, clientId),
  //   enabled: true,
  // });

  // console.log(getCheckedmeasures)

  const path = 5 + 1;
  const { mutate: EnumUpadate }: any = useMutation({
    mutationFn: () => enumUpadate({ path: path.toString() }, userID),
    onSuccess: async (data) => {
      await queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.enumUpadateList],
      });
      localStorage.setItem("path", JSON.stringify(data.data.data?.pathStatus));
    },
  });

  const handleSelect = () => {
    EnumUpadate(path);
    setStep(2);
  };

  useEffect(() => {
    maturitypillar?.data?.data?.length > 0 &&
      dispatch(setMaturitypillar(maturitypillar?.data?.data));
  }, [
    dispatch,
    maturitypillar?.data?.data,
    maturitypillar?.data?.data?.length,
  ]);

  const { mutate: updatepillarcheckbox } = useMutation({
    mutationFn: (data: any) =>
      updatePillarCheckbox(data.checked, data.id as string, userID as string),
    onError: (error: ErrorType) => {
      toast({
        variant: "destructive",
        title: error.data.message,
      });
    },
  });

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

  const handleChange = (e: any, p_id: string) => {
    // console.log("p_idp_id", p_id);

    setselectMaturity(e);
    if (p_id !== null) {
      setPId(p_id);
    }
  };

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

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
    currentPiller: string
  ) => {
    setOpen(!open);
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

  console.log("pillerItemsBackup", pillars);

  const pillarChecked = useMemo(() => {
    return pillars?.filter((item: any) => item.checked === 1);
  }, [pillars]);

  console.log("pillarChecked", pillarChecked);
  useEffect(() => {
    const fetchMeasuresItems = pillarChecked?.filter(
      (item: any) => item.actionItem?.length === 0
    );
    setActionItemsList(fetchMeasuresItems?.length > 0);
  }, [pillars, pillarChecked]);

  return (
    <div>
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
              {actionItems?.pillarname}
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
                          {pillars?.map((item: any) => {
                            console.log("item?.pillarid", item?.pillarid, pid);
                            return (
                              item?.pillarid === pid &&
                              item?.filteredOptions?.map(
                                (it: any, i: number) => {
                                  return (
                                    <li key={i}>
                                      {/* <Dot className=" block me-2 col-span-1" /> */}
                                      {it?.measures}
                                    </li>
                                  );
                                }
                              )
                            );
                          })}
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
                                (item: any, index: number) => (
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
                                            : item.name
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
                                        onClick={() => setEditId(index)}
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
                                            item?.id
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
      </Modal>

      <div className="h-full w-full max-w-full mx-auto">
        {isPending ? (
          <Loader className="w-8 h-8" />
        ) : (
          pillars?.map((item: any) => {
            return (
              <div className="pb-0 flex w-full">
                <div className="border border-solid border-[#D9D9D9] h-max-content rounded-xl flex flex-col w-full mb-6 bg-white">
                  <div className="flex justify-between h-8">
                    <div
                      className={`${
                        item?.checked
                          ? "bg-[#414648]"
                          : "bg-[#838383] text-white"
                      } bg-[#414648] rounded-tl-lg rounded-br-lg pl-1 pt-0 h-[28px] w-[176px] flex items-center justify-center`}
                    >
                      <h2 className="text-sm font-inter">
                        <span
                          className={`${
                            item?.checked ? "text-white" : "text-[#FFD56A]"
                          } text-white`}
                        >
                          Your level -
                        </span>
                        <span className="text-[#FFD56A] ms-1">
                          {item.maturityLevelName}
                        </span>
                      </h2>
                    </div>

                    <div className="mt-2.5 me-3">
                      <input
                        className={`w-6 h-6 cursor-pointer border border-[#B9B9B9] ${
                          item?.checkbox
                            ? "accent-[white]"
                            : "accent-[#64A70B] text-[#FFF]"
                        }`}
                        type="checkbox"
                        checked={item?.checked ? true : false}
                        onChange={() => {
                          setPId(item?.pillarid);
                          dispatch(
                            setPillars({
                              id: item?.pillarid,
                              checked: item?.checked ? 0 : 1,
                            })
                          );
                          updatepillarcheckbox({
                            id: item?.pillarid,
                            checked: item?.checked ? 0 : 1,
                          });
                        }}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-12 p-4">
                    <div className="text-center md:col-span-2 col-span-4">
                      <div className="bg-white rounded-full drop-shadow-md md:w-[90px] w-[40px] md:h-[90px] h-[40px] sm:m-auto m-0 flex items-center sm:justify-center justify-start overflow-hidden">
                        <img src={getImages(item?.pillarname, true)} alt="" />
                      </div>
                      <div className="mt-2 text-[#1D2026] font-Calibri sm:text-base text-sm sm:text-center text-left font-bold">
                        {item.pillarname}
                      </div>
                    </div>
                    <div className="md:col-span-2 col-span-8">
                      <h5 className="text-sm font-calibri text-[#8C94A3] flex items-center gap-2 mb-2">
                        <FaStar className="text-[#FD8E1F]" /> RECOMMENDED
                      </h5>

                      <Select
                        onValueChange={(e) => {
                          handleChange(e, item?.pillarid);
                          setMeasuresList(filtermesuresdata?.data?.data || []);
                        }}
                      >
                        <SelectGroup>
                          <SelectTrigger className="max-w-[176px] rounded-none">
                            <SelectValue
                              placeholder={item.maturityNameRecommended}
                              className="w-[176px]"
                            />
                          </SelectTrigger>
                        </SelectGroup>
                        <SelectContent>
                          <SelectItem value="Introductory">
                            Introductory
                          </SelectItem>
                          <SelectItem value="Intermediate">
                            Intermediate
                          </SelectItem>
                          <SelectItem value="Advanced">Advanced</SelectItem>
                        </SelectContent>
                      </Select>
                      {/* <SelectMenu
                  option={LevelOption}
                  setValue={(e: string) =>
                    handleChange(e, item?.pillarid)
                  }
                  value={item.maturityNameRecommended}
                  className="max-w-[176px]"
                /> */}
                    </div>
                    <div className="md:col-span-5 sm:col-span-8 col-span-12 md:my-0 my-3">
                      <div className="bg-white rounded-full flex items-center mb-2">
                        <div className="w-5 h-5 rounded-full overflow-hidden drop-shadow-md">
                          <img src={Menu_Icon} alt="menu" />
                        </div>
                        <div className="text-[#8C94A3] ml-2 font-bold text-sm">
                          MEASURES
                        </div>
                      </div>
                      <div>
                        <ul className="list-disc ml-6 sm:text-base text-sm text-[#8C94A3] font-calibri">
                          {pid === item?.pillarid ? (
                            measuresPending ? (
                              <Loader containerClassName="h-auto" />
                            ) : (
                              filtermesuresdata?.data?.data &&
                              filtermesuresdata?.data?.data.map(
                                (m: any, index: number) =>
                                  m?.filteredOptions
                                    ?.slice(
                                      0,
                                      view &&
                                        view.find((it) => it.id === m.pillarid)
                                          ?.view !== 0
                                        ? 2
                                        : m?.filteredOptions?.length
                                    )
                                    ?.map(
                                      (measures: any, subIndex: number) =>
                                        measures?.measures && (
                                          <li
                                            key={`item-${index}-${subIndex}`}
                                            className=""
                                          >
                                            12{measures?.measures}
                                          </li>
                                        )
                                    )
                              )
                            )
                          ) : (
                            item?.filteredOptions
                              ?.slice(
                                0,
                                view &&
                                  view.find((it) => it.id === item.pillarid)
                                    ?.view !== 0
                                  ? 2
                                  : item?.filteredOptions?.length
                              )
                              .map((m: any) => {
                                if (m.measures) {
                                  return <li>{m.measures}</li>;
                                }
                              })
                          )}
                          {item?.filteredOptions?.length > 1 && (
                            <Button
                              variant={"link"}
                              type="button"
                              onClick={() => handleChangesView(item.pillarid)}
                              className="text-[#64A70B] font-calibri text-sm font-bold"
                            >
                              {view?.length &&
                              view?.find((it) => it.id === item.pillarid)
                                ?.view === 0
                                ? "View less"
                                : "View more"}
                            </Button>
                          )}
                        </ul>
                      </div>
                    </div>

                    <div className="md:col-span-3 sm:col-span-4 col-span-12 flex items-center sm:justify-end justify-center">
                      <Button
                        disabled={item.checked === 0}
                        onClick={() => {
                          setPId(item.pillarid);
                          setCurrentPiller(item.pillarname);
                          setActionItems(item);
                          setOpen(true);
                        }}
                        className="bg-[#64A70B] text-sm font-calibri text-white py-2 px-4 rounded-md h-[40px] w-[150px] font-bold"
                      >
                        Define Action Items
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}

        <div className="text-center">
          <Button
            disabled={actionItemsList}
            onClick={handleSelect}
            className="bg-[#64A70B] text-[white] rounded-md lg:text-base text-sm font-extrabold text-center w-[200px] h-12"
          >
            Build My Action Plan
          </Button>
        </div>
      </div>
      <Loading isLoading={createPending || deletePending} />
    </div>
  );
};

export default SetTarget;

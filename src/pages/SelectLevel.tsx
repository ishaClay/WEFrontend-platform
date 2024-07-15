/* eslint-disable @typescript-eslint/ban-ts-comment */
import Tree_Planting from "@/assets/images/Tree_Planting.png";
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

import advanceGreen from "@/assets/images/advanceGreen.svg";
import apply from "@/assets/images/apply.svg";
import develop from "@/assets/images/develop.svg";
import planAction from "@/assets/images/planAction.svg";
import selfAssess from "@/assets/images/selfAssess.svg";
import Header from "@/components/Header";
import Loading from "@/components/comman/Error/Loading";
import Loader from "@/components/comman/Loader";
import Modal from "@/components/comman/Modal";
import HomeFooter from "@/components/homePage/HomeFooter";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useAppSelector } from "@/hooks/use-redux";
import { getImages } from "@/lib/utils";
import { setMaturitypillar, setPillars } from "@/redux/reducer/PillarReducer";
import { enumUpadate } from "@/services/apiServices/enum";
import {
  addMeasuresItems,
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
import { useEffect, useState } from "react";
import { BsPencil } from "react-icons/bs";
import { FaStar } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import MasurIcon from "../assets/images/menu_icon.png";
import Correct from "/assets/img/Correct.png";

interface PillerItem {
  [key: string]:
    | string[]
    | {
        name: string;
        id: number;
      }[];
}

function SelectLevel() {
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [actionItems, setActionItems] = useState<SinglePillar | null>(null);
  const [pillerItems, setPillerItems] = useState<PillerItem>({});
  const [view, setView] = useState<{ id: number; view: number }[] | null>(null);
  console.log("actionItems", pillerItems);

  const [pid, setPId] = useState<string | null>("");
  const [currentPiller, setCurrentPiller] = useState<string>("");
  const [actionItemsList, setActionItemsList] = useState<boolean>(true);

  // const [checkedStates, setCheckedStates] = useState([]);

  const [selectmaturity, setselectMaturity] = useState("");
  const [editId, setEditId] = useState<number | null>(null);
  console.log(editId);
  const dispatch = useDispatch();
  const pillars = useAppSelector((state: any) => state.pillar?.maturitypillar);
  // console.log("pillarspillars", pillars);

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

  const handleChangesView = (piller: any) => {
    setView((prev: any) => {
      return (
        prev?.length &&
        prev.map((item: any) => {
          if (item.id === piller) {
            return {
              ...item,
              view: item.view === 2 ? 0 : 2,
            };
          }
          return item;
        })
      );
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

  const { data: getActionItems, isPending: actionPending } =
    useQuery<MeasuresItemsResponse>({
      queryKey: [QUERY_KEYS.getActionItems, { pid, userID }],
      queryFn: () => getActionItembyPiller(pid ? +pid : 0, userID),
      enabled: open && !!pid && !!userID,
    });

  useEffect(() => {
    if (getActionItems && currentPiller) {
      console.log("getActionItems", getActionItems, currentPiller);

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

  console.log("getActionItemsgetActionItemsgetActionItems", pillerItems);

  const { data: filtermesuresdata, isLoading: measuresPending } = useQuery({
    queryKey: [QUERY_KEYS.filterMaturityMeasures, { selectmaturity, pid }],
    queryFn: () =>
      filterMaturityMeasures(
        clientId as string,
        userID as string,
        selectmaturity as any,
        pid as string
      ),
    enabled: !!selectmaturity && !!pid,
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
    navigate("/maturitylevelactionitem");
  };

  useEffect(() => {
    maturitypillar?.data?.data?.length > 0 &&
      dispatch(setMaturitypillar(maturitypillar?.data?.data));
  }, [maturitypillar?.data?.data?.length]);

  const { mutate: updatepillarcheckbox } = useMutation({
    mutationFn: (data: any) =>
      updatePillarCheckbox(data.checked, data.id as string, userID),
    onError: (error: ErrorType) => {
      toast({
        variant: "destructive",
        title: error.data.message,
      });
    },
  });

  const paths = [
    {
      name: "Self-assess",
      img: selfAssess,
      status: "indeterminate",
    },
    {
      name: "Plan Action",
      img: planAction,
      status: "pending",
    },
    {
      name: "Develop",
      img: develop,
      status: "pending",
    },
    {
      name: " Apply",
      img: apply,
      status: "pending",
    },
    {
      name: "Advance Your Green",
      img: advanceGreen,
      status: "pending",
    },
  ];

  const handleActionItemChange = (
    index: number,
    value: string,
    currentPiller: string
  ) => {
    setPillerItems((prev) => ({
      ...prev,
      [currentPiller]: prev[currentPiller].map((item: any, i: number) => {
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
        queryKey: [QUERY_KEYS.measuresItems],
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

  const removeActionItem = (index: number, currentPiller: string) => {
    setPillerItems(
      (prev) =>
        ({
          [currentPiller]: prev[currentPiller].filter((item, i) => {
            console.log(item);
            return i !== index;
          }),
        } as PillerItem)
    );
  };

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

    console.log("measures", measures);

    createmeasuresitem({ clientId, userId: userID, pillerId: pid, measures });
  };

  const filteredOptions: FilteredOptionsEntity[] | any =
    actionItems?.filteredOptions;

  const pillarChecked = maturitypillar?.data?.data?.filter(
    (item: any) => item.checked === 1
  );

  useEffect(() => {
    const fetchMeasuresItems = pillarChecked?.filter(
      (item: any) => item.actionItem?.length === 0
    );
    console.log("pillarChecked", fetchMeasuresItems?.length > 0);
    setActionItemsList(fetchMeasuresItems?.length > 0);
  }, [maturitypillar?.data?.data, getActionItems, pillarChecked]);

  return (
    <div>
      <div className="border-b border-[#DED7D7] bg-[#FAFAFA]">
        <Header />
      </div>

      <div>
        <div className="border-b border-[#DED7D7]">
          <div className="xl:max-w-[1124px] max-w-full mx-auto xl:px-0 px-5">
            <div className="h-[120px] font-Poppins font-medium text-[12.85px] leading-[16.64px] text-[#3A3A3A] flex justify-center pb-3 pt-[13px]">
              <div className="relative lg:gap-[79.4px] justify-between flex min-w-[640px] md:w-auto items-center mx-5">
                {paths.map((path) => (
                  <div
                    key={path.name}
                    className={`flex flex-col self-end items-center ${
                      path.name === "Engage" || path.name === "Assess"
                        ? " "
                        : " "
                    }`}
                  >
                    {path.status === "checked" ? (
                      <img
                        src={Correct}
                        alt="img"
                        width={59.6}
                        height={59.6}
                        className="mt-[13.4]"
                      />
                    ) : path.status === "indeterminate" ? (
                      <img
                        src={path.img}
                        alt="img"
                        width={59.6}
                        height={59.6}
                        className="mt-[7px]"
                      />
                    ) : (
                      <img
                        src={path.img}
                        alt="img"
                        width={59.6}
                        height={59.6}
                        className="mt-[15.4px]"
                      />
                    )}
                    <p
                      className={`px-2 mt-2 ${
                        path.name === "Engage" || path.name === "Assess"
                          ? "bg-[#64A70B] text-white"
                          : ""
                      }`}
                    >
                      {path.name}
                    </p>
                  </div>
                ))}
                <div className="absolute top-[38.5px] left-[30px] right-12 border-2 border-dashed border-[#585858] -z-10"></div>
              </div>
            </div>
          </div>
        </div>

        <div className="h-full w-full xl:max-w-[1124px] max-w-full mx-auto xl:px-0 px-5">
          <div className="my-6">
            <h1 className="text-[#3A3A3A] font-extrabold text-2xl leading-7 font-abhaya">
              Which sustainability pillars do you want to advance first? <br />{" "}
              (We'll suggest recommended courses after you build first.)
            </h1>
          </div>
          {isPending ? (
            <Loader className="w-8 h-8" />
          ) : (
            pillars?.map((item: any) => {
              console.log("currentPiller", filtermesuresdata);

              return (
                <div className="pb-0 flex w-full">
                  <div className="border border-solid border-[#D9D9D9] h-max-content rounded-[10.06px] flex flex-col w-full mb-6">
                    <div className="flex justify-between h-8">
                      <div
                        className={`${
                          item?.checked ? "bg-[#414648]" : "bg-[#edf0f4]"
                        } bg-[#414648] rounded-tl-lg rounded-br-lg pl-1 pt-0 h-[28px] w-[176px] flex items-center justify-center`}
                      >
                        <h2 className="text-sm font-inter">
                          <span
                            className={`${
                              item?.checked ? "text-white" : "text-[#FFD56A]"
                            } text-[black]`}
                          >
                            Your level -
                          </span>
                          <span className="text-[#FFD56A]">
                            {item.maturityLevelName}
                          </span>
                        </h2>
                      </div>

                      <div className="mt-3 mr-[17px]">
                        <input
                          className={`w-6 h-6 cursor-pointer border border-[#B9B9B9] ${
                            item?.checkbox
                              ? "accent-[white]"
                              : "accent-[#64A70B] text-[#FFF]"
                          }`}
                          type="checkbox"
                          checked={item?.checked ? true : false}
                          onChange={() => {
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

                    <div className="grid grid-cols-12">
                      <div className="text-center col-span-2 pt-3 pb-2">
                        <div className="bg-white rounded-full drop-shadow-md w-[90px] h-[90px] flex items-center justify-center p-4 m-auto">
                          <img
                            src={getImages(item?.pillarname, true)}
                            alt="Leaf Icon"
                          />
                        </div>
                        <div className="mt-2 text-[#1D2026] font-Calibri text-base text-center font-bold leading-5">
                          {item.pillarname}
                        </div>
                      </div>
                      <div className="col-span-2">
                        <div className="bg-white rounded-lg py-4 px-1">
                          <div className="flex items-center gap-2 mb-2">
                            <div>
                              <FaStar className="text-[#FD8E1F]" />
                            </div>

                            <p className="text-sm font-normal font-calibri text-[#8C94A3]">
                              RECOMMENDED
                            </p>
                          </div>

                          <Select
                            onValueChange={(e) =>
                              handleChange(e, item?.pillarid)
                            }
                          >
                            <SelectGroup>
                              <SelectTrigger className="max-w-[176px]">
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
                              <SelectItem value="Advance">Advance</SelectItem>
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
                      </div>
                      <div className="col-span-6 px-4">
                        <div className="flex items-center  mb-2">
                          <div className="bg-white rounded-full flex items-center justify-center drop-shadow-md w-6 h-6">
                            <img src={MasurIcon} alt="Leaf Icon" />
                          </div>
                          <div className="text-[#8C94A3] ml-2 font-bold text-sm leading-[22px]">
                            MEASURES
                          </div>
                        </div>
                        <div>
                          <ul className="list-disc ml-6 text-sm text-[#000000]">
                            {pid === item?.pillarid ? (
                              measuresPending ? (
                                <Loader containerClassName="h-[80px]" />
                              ) : (
                                filtermesuresdata?.data?.data &&
                                filtermesuresdata?.data?.data
                                  ?.slice(
                                    0,
                                    view &&
                                      view.find((it) => it.id === item.pillarid)
                                        ?.view !== 0
                                      ? 2
                                      : filtermesuresdata?.data?.data?.length
                                  )
                                  .map((m: any, index: number) =>
                                    m?.filteredOptions?.map(
                                      (measures: any, subIndex: number) =>
                                        measures?.measures && (
                                          <li key={`item-${index}-${subIndex}`}>
                                            {measures?.measures}
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

                      <div className="col-span-2 mr-0 ml-auto pr-[17px] flex items-center">
                        <Button
                          disabled={item.checked === 0}
                          onClick={() => {
                            setPId(item.pillarid);
                            setCurrentPiller(item.pillarname);
                            setActionItems(item);
                            setOpen(true);
                          }}
                          className="bg-[#64A70B] text-white py-2 px-4 rounded-md flex justify-center h-[40px] w-[150px] items-center font-bold"
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

          <div className=" text-center font-abhaya  font-semibold">
            <p>
              <span className="text-[#F63636]"> An important note:</span>{" "}
              nothing’s set in stone here! 
            </p>

            <p className="mt-[20px]">
              Discuss sustainability measures over coffee with your colleagues. 
              <br />
              Come back anytime to edit action items.  <br />
              And tweek-as-needed an action plan that will guide your company. 
            </p>
          </div>
          <div className="flex justify-center gap-4 mt-[20px]  mb-[20px]">
            <Button
              type="button"
              disabled={actionItemsList}
              onClick={handleSelect}
              className="bg-[#64A70B] text-[white] rounded-md text-base font-extrabold text-center font-abhaya w-[250px] h-[50px]"
            >
              Got it. Build My Action Plan!
            </Button>
            <Button
              onClick={() => navigate("/company/allcourses")}
              className="bg-[#64A70B] text-[white] rounded-md text-base font-extrabold text-center font-abhaya w-[250px] h-[50px]"
            >
              Go to All Course
            </Button>
          </div>
        </div>
        <HomeFooter />

        <Modal
          open={open}
          onClose={handleClose}
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
              <form onSubmit={(e) => handleSubmit(e, currentPiller)}>
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
                          <ul className="list-disc list-inside text-[12px]  font-calibri">
                            {filteredOptions?.map((m: any) => {
                              if (m.measures) {
                                return <li>{m.measures}</li>;
                              }
                            })}
                          </ul>
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

                        <div className="flex flex-col gap-5 px-3.5 py-2.5">
                          {actionPending ? (
                            <Loader />
                          ) : (
                            pillerItems &&
                            pillerItems[currentPiller]?.map(
                              (item: any, index: number) => (
                                <div
                                  key={index}
                                  className="flex items-center justify-between"
                                >
                                  <div className="border border-[#EBEAEA] rounded lg:w-[270px] md:[250px] w-[210px] overflow-hidden">
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
                                        removeActionItem(index, currentPiller)
                                      }
                                    >
                                      <RiDeleteBin6Line className="text-[#B9B9B9]" />
                                    </button>
                                  </div>
                                </div>
                              )
                            )
                          )}

                          <div className="text-right">
                            <Button
                              type="button"
                              onClick={() => addActionItem(currentPiller)}
                              className="w-3 bg-black p-0 h-3 rounded-[2px]"
                            >
                              <Plus className="text-white" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </ScrollArea>
                <div className="text-right mt-6">
                  <Button
                    type="submit"
                    className="bg-[#64A70B] md:text-base text-sm font-bold md:h-12 h-10 lg:w-[120px] md:w-[100px] w-[80px] md:me-5 me-3 font-Poppins"
                  >
                    {createPending ? (
                      <Loader containerClassName="h-auto" />
                    ) : (
                      "Save"
                    )}
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
        </Modal>
        <Loading isLoading={createPending} />
      </div>
    </div>
  );
}

export default SelectLevel;

import Tree_Planting from "@/assets/images/Tree_Planting.png";
import Footer from "@/components/Footer";
import Loading from "@/components/comman/Error/Loading";
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

import Header from "@/components/Header";
import Loader from "@/components/comman/Loader";
import Modal from "@/components/comman/Modal";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useAppSelector } from "@/hooks/use-redux";
import { getImages } from "@/lib/utils";
import { setMaturitypillar, setPillars } from "@/redux/reducer/PillarReducer";
import { enumUpadate } from "@/services/apiServices/enum";
import {
  addMeasuresItems,
  fetchMaturityPillar,
  filterMaturityMeasures,
  updatePillarCheckbox,
} from "@/services/apiServices/pillar";
import { ErrorType } from "@/types/Errors";
import { FilteredOptionsEntity, SinglePillar } from "@/types/Pillar";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Plus } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { BsPencil } from "react-icons/bs";
import { FaStar } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Apply from "/assets/img/Apply.png";
import Assess from "/assets/img/Assess.png";
import Attainproficiency from "/assets/img/Attainproficiency.png";
import Correct from "/assets/img/Correct.png";
import Learn from "/assets/img/Learn.png";

interface PillerItem {
  [key: string]: string[];
}

function SelectLevel() {
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [actionItems, setActionItems] = useState<SinglePillar | null>(null);
  const [pillerItems, setPillerItems] = useState<PillerItem>({});
  console.log("actionItems", actionItems);

  const [pid, setPId] = useState<string | null>("");
  const [currentPiller, setCurrentPiller] = useState<string>("");

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

  const { toast } = useToast();
  const queryClient = useQueryClient();

  // console.log(actionItems)
  const addActionItem = (currentPiller: string) => {
    // setActionItems([...actionItems, ""]);
    setPillerItems((prev) => ({
      ...prev,
      [currentPiller]: [...pillerItems[currentPiller], ""],
    }));
  };

  // const addActionItem1 = () => {
  //   setActionItems1([...actionItems1, ""]);
  // };

  const { data: maturitypillar, isPending } = useQuery({
    queryKey: [QUERY_KEYS.maturitypillar],
    queryFn: () => fetchMaturityPillar(clientId, userID),
    enabled: true,
  });

  const {
    data: filtermesuresdata,
    refetch: refetchfiltermesuresdata,
    isPending: measuresPending,
  } = useQuery({
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

  console.log("isPending", isPending);

  useEffect(() => {
    if (maturitypillar?.data?.data?.length > 0) {
      maturitypillar?.data?.data?.map((item: any) => {
        const oldData = Object.keys(pillerItems);
        if (!oldData.includes(item?.pillarname)) {
          return setPillerItems((prev) => ({
            ...prev,
            [item.pillarname]: [""],
          }));
        }
        return;
      });
    }
  }, [maturitypillar]);

  useEffect(() => {
    refetchfiltermesuresdata();
  }, [selectmaturity]);

  const { mutate: createmeasuresitem, isPending: createPending } = useMutation({
    mutationFn: addMeasuresItems,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.measuresItems],
      });
    },
    onError: (error: ErrorType) => {
      toast({
        variant: "destructive",
        title: error.data.message,
      });
    },
  });

  // const { data: getCheckedmeasures } = useQuery({
  //   queryKey: [QUERY_KEYS.checkedMeasures],
  //   queryFn: () => getCheckedMeasures(UserId, clientId),
  //   enabled: true,
  // });

  // console.log(getCheckedmeasures)

  const path = 5 + 1;
  const { mutate: EnumUpadate }: any = useMutation({
    mutationFn: () => enumUpadate({ path: path.toString() }, userID),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.enumUpadateList],
      });
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
      updatePillarCheckbox(data.checked, data.id as string),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.maturitypillar],
      });
    },
    onError: (error: ErrorType) => {
      toast({
        variant: "destructive",
        title: error.data.message,
      });
    },
  });

  const paths = [
    {
      name: "Start",
      img: Correct,
      status: "checked",
    },
    {
      name: "Self-assess",
      img: Correct,
      status: "checked",
    },
    {
      name: "Plan Action",
      img: Correct,
      status: "indeterminate",
    },
    {
      name: "Develop",
      img: Learn,
      status: "pending",
    },
    {
      name: "Apply",
      img: Apply,
      status: "pending",
    },
    {
      name: "Advance Your Green",
      img: Attainproficiency,
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

  const removeActionItem = (index: number, currentPiller: string) => {
    setPillerItems((prev) => ({
      ...prev,
      [currentPiller]: prev[currentPiller].filter((item: string, i: number) => {
        console.log(item);
        return i !== index;
      }),
    }));
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
    currentPiller: string
  ) => {
    setOpen(!open);
    e.preventDefault();
    const measures = pillerItems[currentPiller].map((item) => ({ name: item }));

    createmeasuresitem({ clientId, userId: userID, pillerId: pid, measures });
  };

  console.log("pillerItemspillerItemspillerItems", pillerItems);
  const filteredOptions: FilteredOptionsEntity[] | any =
    actionItems?.filteredOptions;

  const handleDisabledButton = useMemo(() => {
    if (pillerItems && pillars) {
      const fetchData = pillars?.map((item: any) => {
        if (item?.checked === 1) {
          return pillerItems[item?.pillarname]?.filter(
            (item: string) => item !== ""
          )?.length > 0
            ? false
            : true;
        }
        return false;
      });

      const checkPiller = pillars?.every((item: any) => item?.checked === 0);
      return !checkPiller
        ? fetchData?.filter((item: boolean) => item === true).length === 0
        : !checkPiller;
    }
  }, [pillars, pillerItems]);

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
                        src={Assess}
                        alt="img"
                        width={70}
                        height={70}
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
                <div className="absolute top-[47.5px] left-3 right-12 border-2 border-dashed border-[#585858] -z-10"></div>
              </div>
            </div>
          </div>
        </div>

        <div className="h-full w-full xl:max-w-[1124px] max-w-full mx-auto xl:px-0 px-5">
          <div className="my-6">
            <h1 className="text-[#3A3A3A] font-extrabold text-2xl leading-7 font-abhaya">
              Which sustainability pillars do you want to advance first?
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
                        <div className="bg-white rounded-full flex items-center drop-shadow-md w-6 h-6 mb-2">
                          <img
                            src="public/assets/img/manu.png"
                            alt="Leaf Icon"
                          />
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
                                filtermesuresdata?.data?.data.map(
                                  (m: any, index: number) =>
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
                              item?.filteredOptions.map((m: any) => {
                                if (m.measures) {
                                  return <li>{m.measures}</li>;
                                }
                              })
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
          <div className="flex justify-center  mt-[20px]  mb-[20px]">
            <Button
              disabled={!handleDisabledButton}
              onClick={handleSelect}
              className="bg-[#64A70B] text-[white] rounded-md text-base font-extrabold text-center font-abhaya w-[250px] h-[50px]"
            >
              Got it. Build My Action Plan!
            </Button>
          </div>
        </div>
        <Footer />

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
                    <form onSubmit={(e) => handleSubmit(e, currentPiller)}>
                      <div className="w-full">
                        <div className="px-5 py-2 border-b border-solid">
                          <h5 className="text-[#1D2026] font-calibri font-bold">
                            Enter initiatives or action items
                          </h5>
                        </div>

                        <div className="flex flex-col gap-5 px-3.5 py-2.5">
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
                          )}

                          <div className="text-right">
                            <Button
                              onClick={() => addActionItem(currentPiller)}
                              className="w-3 bg-black p-0 h-3 rounded-[2px]"
                            >
                              <Plus className="text-white" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </form>
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
                  type="submit"
                  className="bg-[#E41B1B] md:text-base text-sm font-bold md:h-12 h-10 lg:w-[120px] md:w-[100px] w-[80px] font-Poppins"
                >
                  Close
                </Button>
              </div>
            </div>
          </div>
        </Modal>
        <Loading isLoading={createPending} />
      </div>
    </div>
  );
}

export default SelectLevel;

import Loading from "@/components/comman/Error/Loading";
import Footer from "@/components/Footer";
import TeaserScoreHeader from "@/components/TeaserScoreHeader";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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

import {
  addMeasuresItems,
  fetchMaturityPillar,
  filterMaturityMeasures,
  updatePillarCheckbox,
} from "@/services/apiServices/pillar";
import { ErrorType } from "@/types/Errors";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { BsFillPlusSquareFill, BsPencil } from "react-icons/bs";
import { FaStar } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Apply from "/assets/img/Apply.png";
import Assess from "/assets/img/Assess.png";
import Attainproficiency from "/assets/img/Attainproficiency.png";
import Correct from "/assets/img/Correct.png";
import Learn from "/assets/img/Learn.png";
import { setMaturitypillar, setPillars } from "@/redux/reducer/PillarReducer";
import { enumUpadate } from "@/services/apiServices/enum";

interface PillerItem  {
  [key: string]: string[]
}

function SelectLevel() {
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);

  const [pillerItems, setPillerItems] = useState<PillerItem>({});

  const [pid, setPId] = useState<string | null>("");
  const [currentPiller, setCurrentPiller] = useState<string>('')

  // const [checkedStates, setCheckedStates] = useState([]);

  const [selectmaturity, setselectMaturity] = useState("");
  const [editId, setEditId] = useState<number | null>(null);
  console.log(editId)
  const dispatch = useDispatch();
  const pillars = useSelector((state: any) => state.pillar?.maturitypillar);
  // console.log("pillarspillars", pillars);

  const { clientId, UserId } = useSelector((state: any) => state.user);
  // console.log("clientIdclientId", clientId);

  const { toast } = useToast();
  const queryClient = useQueryClient();

  // console.log(actionItems)
  const addActionItem = (currentPiller: string) => {
    // setActionItems([...actionItems, ""]);
    setPillerItems(prev => ({...prev, [currentPiller]: [...pillerItems[currentPiller], '']}))
  };

  // const addActionItem1 = () => {
  //   setActionItems1([...actionItems1, ""]);
  // };

  const { data: maturitypillar } = useQuery({
    queryKey: [QUERY_KEYS.maturitypillar],
    queryFn: () => fetchMaturityPillar(clientId, UserId),
    enabled: true,
  });

  const { data: filtermesuresdata, refetch: refetchfiltermesuresdata } =
    useQuery({
      queryKey: [QUERY_KEYS.filterMaturityMeasures],
      queryFn: () =>
        filterMaturityMeasures(
          clientId as string,
          UserId as string,
          selectmaturity as any,
          pid as string
        ),
      enabled: !!selectmaturity && !!pid,
    });
  
  useEffect(() => {
    if (maturitypillar?.data?.data?.length > 0) {
      maturitypillar?.data?.data?.map((item:any) => {
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

  // const { data: allassessmant } = useQuery({
  //   queryKey: [QUERY_KEYS.totalAssessment],
  //   queryFn: () => getAllassessment(UserId),
  // });

  // const score = +((+allassessmant?.data?.data?.avTotalpoints / +allassessmant?.data?.data?.avTotalmaxpoint) * 100).toFixed(2);

  // let proficiencyLevel;
  // if (score < 30) {
  //   proficiencyLevel = "Introductory";
  // } else if (score >= 30 && score < 60) {
  //   proficiencyLevel = "Intermediate";
  // } else {
  //   proficiencyLevel = "Advanced";
  // }

  const { mutate: createmeasuresitem, isPending: createPending } = useMutation({
    mutationFn: (actionitems: any) => addMeasuresItems(actionitems),
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
  



const path = 6+1
  const { mutate: EnumUpadate }:any = useMutation({
    mutationFn: () => enumUpadate({path: path.toString()} ,UserId),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.enumUpadateList],
      });
    },
    
  });


  const handleSelect = () =>{	
	EnumUpadate(path)
	navigate("/maturitylevelactionitem")
  }



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
      name: "Engage",
      img: Correct,
      status: "checked",
    },
    {
      name: "Assess",
      img: Correct,
      status: "checked",
    },
    {
      name: "Set Targets",
      img: Correct,
      status: "indeterminate",
    },
    {
      name: "Learn",
      img: Learn,
      status: "pending",
    },
    {
      name: "Apply",
      img: Apply,
      status: "pending",
    },
    {
      name: "Attain proficiency",
      img: Attainproficiency,
      status: "pending",
    },
  ];

  const handleActionItemChange = (index: number, value: string, currentPiller: string) => {
    setPillerItems((prev) => ({
         ...prev, [currentPiller]: prev[currentPiller].map((item: string, i: number) => {
          if (i === index) {
              return value
          }
          return item
        })
    }))
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
      ...prev, [currentPiller]: prev[currentPiller].filter((item: string, i: number) => {
        console.log(item)
        return i !== index
      })
 }))
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>, currentPiller: string) => {
    setOpen(!open);
    e.preventDefault();
    const measures = pillerItems[currentPiller].map((item) => ({ name: item }));

    createmeasuresitem({ clientId, userId: UserId, pillerId: pid, measures });
  };

  return (
    <div>
      <TeaserScoreHeader />
      <div className="border-t border-b border-#DED7D7">
        <div className="h-[120px] font-Poppins font-medium text-[12.85px] leading-[16.64px] text-[#3A3A3A] flex justify-center pb-3 pt-[13px]">
          <div className="relative lg:gap-[79.4px] justify-between flex min-w-[640px] md:w-auto items-center mx-5">
            {paths.map((path) => (
              <div
                key={path.name}
                className={`flex flex-col self-end items-center ${
                  path.name === "Engage" || path.name === "Assess" ? " " : " "
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
                  className={`${
                    path.name === "Engage" || path.name === "Assess"
                      ? "bg-[#64A70B] text-white"
                      : ""
                  }`}
                >
                  {path.name}
                </p>
              </div>
            ))}
            <div className="absolute top-[47.5px] left-3 right-10 border-2 border-dashed border-[#585858] -z-10"></div>
          </div>
        </div>
      </div>
      <div className="ml-[290px] mt-8 text-[#3A3A3A] font-se text-2xl ">
        <h1 className="text-[#00778B] font-semibold text-[16px]">
          {" "}
          Set Target{" "}
          <span className="text-[#606060] font-normal text-[12px]">
            (select the required pillars)
          </span>
        </h1>
      </div>

      <div className="flex flex-col items-center h-full w-full ">
        {pillars?.map((item: any) => {
          console.log("currentPiller",pillerItems[currentPiller]);
          
          return (
            <div className="2xl:ml-[180px] xl:ml-[100px] pt-8 pl-[10px] pb-0 flex gap-5">
              <div className="border border-solid border-[#D9D9D9] xl:w-[1124px] w-[900px]  h-max-content rounded-[10.06px] flex flex-col">
                <div className="flex h-8">
                  <div
                    className={`${
                      item?.checked ? "bg-[#414648]" : "bg-[#edf0f4]"
                    } bg-[#414648] rounded-tl-lg rounded-br-lg pl-1 pt-0 h-[30px] w-[209px] items-start`}
                  >
                    <h2 className="text-lg font-inter ">
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

                  <div className="ml-auto mr-3 mt-2 ">
                    <input
                      className={`w-5 h-5 cursor-pointer ${
                        item?.checked
                          ? "accent-[white]"
                          : "accent-[white] border border-[#B9B9B9]"
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

                <div className="flex h-max-content pb-6">
                  <div className="w-[176px] text-center">
                    <div className="bg-white rounded-full  drop-shadow-md w-16 h-16 p-4 mt-4 ml-[50px]">
                      <img
                        src="public/assets/img/Tree Planting.png"
                        alt="Leaf Icon"
                      />
                    </div>
                    <div className="mt-4 text-[#1D2026] font-Calibri text-[16px] text-center">
                      {item.pillarname}
                    </div>
                  </div>
                  <div className="">
                    <div className="bg-white rounded-lg  p-4 flex flex-col ">
                      <div className="flex justify-center items-center">
                        <div>
                          <FaStar className="text-[#FD8E1F]" />
                        </div>

                        <p className="mb-1 ml-1 mr-2 text-[14px] text-[#8C94A3]">
                          RECOMMENDED
                        </p>
                      </div>

                      <Select
                        onValueChange={(e) => handleChange(e, item?.pillarid)}
                      >
                        <SelectGroup>
                          <SelectTrigger className="max-w-[176px]">
                            <SelectValue
                              placeholder={item.maturityNameRecommended}
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
                    </div>
                  </div>
                  <div className="w-[543px]  h-max-content">
                    <div className="bg-white rounded-full   flex drop-shadow-md w-6 h-6 mb-2">
                      <img src="public/assets/img/manu.png" alt="Leaf Icon" />
                      <div className="text-[#8C94A3] ml-2 font-semibold ">
                        MEASURES
                      </div>
                    </div>
                    <div>
                      <ul className="list-disc ml-6 text-xs text-[#8C94A3] ">
                        {pid
                          ? filtermesuresdata?.data?.data &&
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
                          : item?.filteredOptions.map((m: any) => {
                              if (m.measures) {
                                return <li>{m.measures}</li>;
                              }
                            })}
                      </ul>
                    </div>
                  </div>

                  <div className="w-[162px] mt-8">
                    <Dialog open={open} onOpenChange={setOpen}>
                      <DialogTrigger asChild>
                        <Button
                          disabled={item.checked === 0}
                          onClick={() => {
                            setPId(item.pillarid);
                            setCurrentPiller(item.pillarname)
                          }}
                          className="bg-[#64A70B] text-white py-2 px-4 rounded-md flex justify-center h-[40px] w-[150px] items-center mr-3 "
                        >
                          Define Action Items
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[50rem] z-[999]">
                        <DialogHeader>
                          <DialogTitle>
                            Have you identified actionable items on provided
                            measures?
                          </DialogTitle>
                        </DialogHeader>

                        <div className="sm:max-w-[45rem]">
                          <div className="flex  mb-4">
                            <div className=" ml-4 mt-0 bg-white rounded-full drop-shadow-md w-17 h-17 p-2 mb-2">
                              <img
                                src="/public/assets/img/Tree Planting.png"
                                alt="Leaf Icon"
                              />
                            </div>
                            <div className="ml-6 mt-6 h-[22px] w-[800px]">
                              <h2 className=" text-xm font-semibold text-[#1D2026]">
                                Have you identified actionable items on provided
                                measures?
                              </h2>
                            </div>
                          </div>
                          <div className="flex flex-col space-y-4 ">
                            <div className="text-[#1D2026] font-Calibri font-bold ml-4">
                              {item.pillarname}
                            </div>
                            <div className="flex h-full w-full mt-2">
                              <div className="ml-4 h-[297px] w-[350px] border border-solid border-[#D9D9D9] rounded">
                                <div className="w-full h-74 border-b border-[#D9D9D9] rounded-tl-lg rounded-tr-lg">
                                  <div className="pb-2 pt-2 h-[42px] w-[350px]">
                                    <div className="ml-6  text-[#1D2026] font-calibri font-bold">
                                      Measures
                                    </div>
                                    <div className="p-4 ">
                                      <ul className="list-disc list-inside text-[12px]  font-calibri">
                                        {item?.filteredOptions.map((m: any) => {
                                          if (m.measures) {
                                            return <li>{m.measures}</li>;
                                          }
                                        })}
                                      </ul>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              <form onSubmit={(e) => handleSubmit(e, currentPiller)}>
                                <div className="ml-6 h-[297px] w-[350px] border border-solid border-[#D9D9D9] rounded">
                                  <div className="w-full h-74 border-b border-solid border-[#D9D9D9] rounded-tl-lg rounded-tr-lg">
                                    <div className="pb-2 pt-2 h-[42px] w-[350px]">
                                      <div className="ml-6  text-[#1D2026] font-calibri font-bold">
                                        Enter initiatives or action items
                                      </div>

                                      <div className="h-[265px] overflow-auto">
                                        {/* {console.log(getCheckedmeasures?.data.data)} */}
                                        {/* {getCheckedmeasures?.data?.data &&
                                          getCheckedmeasures?.data?.data.map(
                                            (m: any) => {
                                              if (
                                                
                                                m.pillarId === item.pillarid

                                              ) 
                                              {
                                                return m?.measures?.map(
                                                  (measure: any) => {
                                                    return actionItems.map( 
                                                      (
                                                        item: any,
                                                        index: number
                                                      ) => (
                                  
                                                        <div
                                                          key={index}
                                                          className="pl-4"
                                                          >
                                          
                                                          <div className="flex p-2 w-[322px] h-[42px] mt-2">
                                                            <div className="flex-1 border border-[#EBEAEA] rounded w-[280px] h-[42px] mb-2">
                                                              <input
                                                                type="text"
                                                                placeholder="Action item"
                                                                value={
                                                                  measure.name
                                                                }
                                                                onChange={(e) =>
                                                                  handleActionItemChange(
                                                                    index,
                                                                    e.target
                                                                      .value
                                                                  )
                                                                }
                                                                className="flex-1 border-none outline-none pl-2 pt-2"
                                                              />
                                                            </div>
                                                            <div>
                                                              <button
                                                                type="button"
                                                                className="border-none bg-transparent text-lg cursor-pointer mr-[0px] ml-2 mt-2"
                                                                onClick={() =>
                                                                  setEditId(
                                                                    index
                                                                  )
                                                                }
                                                              >
                                                                <BsPencil className="text-[#B9B9B9]" />
                                                              </button>
                                                              <button
                                                                className="border-none bg-transparent text-lg cursor-pointer mt-2"
                                                                onClick={() =>
                                                                  removeActionItem(index)
                                                                }
                                                              >
                                                                <RiDeleteBin6Line className="text-[#B9B9B9]" />
                                                         
                                                              </button>
                                                            </div>
                                                          </div>
                                                        </div>
                                                      )
                                                    );
                                                  }
                                                );
                                              }
                                            }
                                          )}  */}

                                        {/* {console.log(item.pillarid ,pid)} */}
                                        {/* {console.log(pid)} */}

                                        {pillerItems[currentPiller]?.map(
                                          (item: any, index: number) => (
                                            <div key={index} className="pl-4">
                                              <div className="flex p-2 w-[322px] h-[42px] mt-2">
                                                <div className="flex-1 border border-[#EBEAEA] rounded w-[280px] h-[42px] mb-2">
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
                                                    className="flex-1 border-none outline-none pl-2 pt-2"
                                                  />
                                                </div>
                                                <div>
                                                  <button
                                                    type="button"
                                                    className="border-none bg-transparent text-lg cursor-pointer mr-[0px] ml-2 mt-2"
                                                    onClick={() =>
                                                      setEditId(index)
                                                    }
                                                  >
                                                    <BsPencil className="text-[#B9B9B9]" />
                                                  </button>
                                                  <button
                                                    className="border-none bg-transparent text-lg cursor-pointer mt-2"
                                                    onClick={() =>
                                                      removeActionItem(index,currentPiller)
                                                    }
                                                  >
                                                    <RiDeleteBin6Line className="text-[#B9B9B9]" />
                                                  </button>
                                                </div>
                                              </div>
                                            </div>
                                          )
                                        )}

                                        <div className="flex items-center justify-center w-4 h-4  ml-[315px] mt-8">
                                          <BsFillPlusSquareFill
                                            onClick={() => addActionItem(currentPiller)}
                                          />
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>

                                <Button
                                  type="submit"
                                  className="absolute bottom-6 right-[100px]"
                                >
                                  save
                                </Button>
                              </form>
                            </div>
                          </div>
                        </div>
                        <DialogFooter className="sm:justify-end">
                          <DialogClose asChild>
                            <Button type="button" variant="secondary">
                              Close
                            </Button>
                          </DialogClose>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
              </div>
            </div>
          );
        })}

        <button
          onClick={handleSelect}
          className="bg-[#64A70B] text-[white] w-[160px] h-[30px] rounded mt-7 text-center text-Abhaya Libre ExtraBold "
        >
          BUILD
        </button>

        <div className="border-b  pb-4 w-[940px] border-[#DED7D7] "></div>

        <div className="font-Abhaya Libre ExtraBold text-red-500 pb-2 pt-3">
          <p>
            {" "}
            Congratulations! 🌿 Your chosen maturity levels have been noted.
            You're now on a unique{" "}
          </p>
          <p>
            sustainability journey tailored just for you. Keep moving forward,
            and watch your impact grow! 🌍✨
          </p>
        </div>
      </div>
      <Footer />

      <Loading isLoading={createPending} />
    </div>
  );
}

export default SelectLevel;

import { Button } from "@/components/ui/button";
import Menu_Icon from "@/assets/images/menu_icon.png";
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

import Loader from "@/components/comman/Loader";
import { useAppSelector } from "@/hooks/use-redux";
import { getImages } from "@/lib/utils";
import { setMaturitypillar, setPillars } from "@/redux/reducer/PillarReducer";
import { enumUpadate } from "@/services/apiServices/enum";
import {
  fetchMaturityPillar,
  filterMaturityMeasures,
  updatePillarCheckbox,
} from "@/services/apiServices/pillar";
import { ErrorType } from "@/types/Errors";
import { SinglePillar } from "@/types/Pillar";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

interface PillerItem {
  [key: string]: string[];
}

const SetTarget = () => {
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  console.log("+++++++", open);

  const [actionItems, setActionItems] = useState<SinglePillar | null>(null);
  const [pillerItems, setPillerItems] = useState<PillerItem>({});
  console.log("actionItems", actionItems);

  const [pid, setPId] = useState<string | null>("");
  const [currentPiller, setCurrentPiller] = useState<string>("");
  console.log("+++++", currentPiller);

  // const [checkedStates, setCheckedStates] = useState([]);

  const [selectmaturity, setselectMaturity] = useState("");
  const [editId, setEditId] = useState<number | null>(null);
  console.log(editId);
  const dispatch = useDispatch();
  const pillars = useAppSelector((state: any) => state.pillar?.maturitypillar);
  // console.log("pillarspillars", pillars);

  const { clientId, UserId } = useAppSelector((state) => state.user);
  console.log("clientIdclientId", UserId);

  const { toast } = useToast();
  const queryClient = useQueryClient();

  // const addActionItem1 = () => {
  //   setActionItems1([...actionItems1, ""]);
  // };

  const { data: maturitypillar, isPending } = useQuery({
    queryKey: [QUERY_KEYS.maturitypillar],
    queryFn: () => fetchMaturityPillar(+clientId, +UserId),
    enabled: true,
  });

  console.log("maturitypillarmaturitypillar", maturitypillar);

  const { data: filtermesuresdata, refetch: refetchfiltermesuresdata } =
    useQuery({
      queryKey: [QUERY_KEYS.filterMaturityMeasures, { selectmaturity, pid }],
      queryFn: () =>
        filterMaturityMeasures(
          clientId as string,
          UserId as string,
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

  // const { data: getCheckedmeasures } = useQuery({
  //   queryKey: [QUERY_KEYS.checkedMeasures],
  //   queryFn: () => getCheckedMeasures(UserId, clientId),
  //   enabled: true,
  // });

  // console.log(getCheckedmeasures)

  const path = 5 + 1;
  const {}: any = useMutation({
    mutationFn: () => enumUpadate({ path: path.toString() }, +UserId),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.enumUpadateList],
      });
    },
  });

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

  const handleChange = (e: any, p_id: string) => {
    // console.log("p_idp_id", p_id);

    setselectMaturity(e);
    if (p_id !== null) {
      setPId(p_id);
    }
  };

  console.log("pillerItemspillerItemspillerItems", pillerItems);
  return (
    <>
      <div className="h-full w-full max-w-full mx-auto">
        {isPending ? (
          <Loader className="w-8 h-8" />
        ) : (
          pillars?.map((item: any) => {
            return (
              <div className="pb-0 flex w-full">
                <div className="border border-solid border-[#D9D9D9] h-max-content rounded-xl flex flex-col w-full mb-6">
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
                        onValueChange={(e) => handleChange(e, item?.pillarid)}
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
                    <div className="md:col-span-5 sm:col-span-6 col-span-12 sm:my-0 my-3">
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
                          {pid === item?.pillarid
                            ? filtermesuresdata?.data?.data &&
                              filtermesuresdata?.data?.data.map(
                                (m: any, index: number) =>
                                  m?.filteredOptions?.map(
                                    (measures: any, subIndex: number) =>
                                      measures?.measures && (
                                        <li
                                          key={`item-${index}-${subIndex}`}
                                          className=""
                                        >
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

                    <div className="md:col-span-3 sm:col-span-6 col-span-12 flex items-center sm:justify-end justify-center">
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
      </div>
    </>
  );
};

export default SetTarget;

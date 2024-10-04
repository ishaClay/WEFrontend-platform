/* eslint-disable @typescript-eslint/ban-ts-comment */
import Course_image from "@/assets/images/Course_image.png";
import starImage from "@/assets/images/Vector.png";
import { useAppDispatch } from "@/hooks/use-redux";
import { setPath } from "@/redux/reducer/PathReducer";
import { getTrainerById } from "@/services/apiServices/trainer";
import { TrainerStatus, TrainersByIdResponse } from "@/types/Trainer";
import { useQuery } from "@tanstack/react-query";
import { MoveLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loader from "../comman/Loader";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Switch } from "../ui/switch";

const TrainerDetails = () => {
  const params = useParams();
  const Role = location.pathname.split("/")[1];
  const dispatch = useAppDispatch();
  // const queryClient = useQueryClient();
  const [trainerStatus, setTrainerStatus] = useState<string>("");
  const [trainerPermission, setTrainerPermission] = useState<boolean>(false);
  const [trainerEditPermission, setTrainerEditPermission] =
    useState<boolean>(false);
  const [assignCertificatePermission, setAssignCertificatePermission] =
    useState<boolean>(false);
  const { data: clientDetails, isPending } = useQuery<TrainersByIdResponse>({
    queryKey: ["trainerDetails", params.id],
    queryFn: () => getTrainerById({ id: params.id || "" }),
  });

  useEffect(() => {
    if (clientDetails?.data) {
      setTrainerStatus(clientDetails?.data?.status.toString() || "");
      setTrainerPermission(clientDetails?.data?.approved);
      setTrainerEditPermission(clientDetails?.data?.editCourses);
      setAssignCertificatePermission(clientDetails?.data?.assignCertificate);
    }
  }, [clientDetails]);

  return (
    <div className="bg-white h-full rounded-[6px] overflow-auto">
      <div className="font-droidSans text-[16px] leading-[22px] text-black">
        <div className="p-[15px] md:flex block items-center justify-between border-b mb-[36px]">
          <div>
            <h3 className="text-[16px] font-[700] font-droid mb-1">
              Trainer Details
            </h3>
            <p className="text-[#606060] text-[15px]">
              All the details on your trainer, in one convenient view
            </p>
          </div>
          <div className="flex items-center gap-4 md:mt-0 mt-3">
            <Button
              variant={"ghost"}
              type="button"
              onClick={() =>
                dispatch(
                  setPath([
                    {
                      label: "Trainer Management",
                      link: `/${Role}/trainer-management`,
                    },
                  ])
                )
              }
              className="text-[16px] flex font-semibold items-center gap-[15px] hover:bg-transparent pl-0"
            >
              <MoveLeft /> Back
            </Button>
            <Button
              type="button"
              onClick={() => {
                dispatch(
                  setPath([
                    {
                      label: "Trainer Management",
                      link: `/${Role}/trainer-management`,
                    },

                    {
                      label: "Invitation",
                      link: `/${Role}/trainer-management/invitation`,
                    },
                  ])
                );
              }}
              className="bg-[#00778B] font-droid px-5 text-[16px]"
            >
              INVITE TRAINER
            </Button>
          </div>
        </div>
        {isPending ? (
          <Loader />
        ) : (
          <div className="px-[15px] sm:px-4 md:px-6  py-[17px] flex flex-col gap-5">
            <div className="border relative border-[#D9D9D9] rounded-[10px] min-h-[160px] grid grid-cols-10 px-6 py-[30px] sm:gap-8 gap-4 sm:mb-[36px] mb-[20px]">
              <h2 className="absolute -top-3 left-6 bg-white px-1 text-[16px] font-[400] font-droid">
                Trainer personal information
              </h2>
              <div className="xl:col-span-2 col-span-4 w-full flex justify-start mb-2 md:mb-0">
                <Avatar className="w-28 h-28">
                  <AvatarImage src={clientDetails?.data?.profileImage || ""} />
                  <AvatarFallback className="uppercase shadow-lg text-[40px] font-droid">
                    {clientDetails?.data?.name?.[0] ||
                      clientDetails?.data?.email?.[0]}
                  </AvatarFallback>
                </Avatar>
              </div>
              <div className="xl:col-span-2 col-span-5 flex items-center font-droid w-full">
                <div>
                  <h3 className="text-[#A3A3A3]">Trainer contact firstname</h3>
                  <p className="text-[#000]">
                    {
                      // @ts-ignore
                      clientDetails?.data?.contactFirstName ||
                        clientDetails?.data?.email?.split("@")?.[0] ||
                        "--"
                    }
                  </p>
                </div>
              </div>
              <div className="xl:col-span-2 col-span-5 flex items-center font-droid w-full">
                <div>
                  <h3 className="text-[#A3A3A3]">Trainer contact lastname</h3>
                  <p className="text-[#000]">
                    {
                      // @ts-ignore
                      clientDetails?.data?.contactSurname ||
                        clientDetails?.data?.email?.split("@")?.[0] ||
                        "--"
                    }
                  </p>
                </div>
              </div>
              <div className="xl:col-span-2 sm:col-span-4 col-span-9 flex items-center font-droid w-full">
                <div>
                  <h3 className="text-[#A3A3A3]">Contact number</h3>
                  <p className="text-[#000]">
                    {clientDetails?.data?.phone || "--"}
                  </p>
                </div>
              </div>
              <div className="xl:col-span-2 sm:col-span-5 col-span-9 flex items-center font-droid w-full">
                <div>
                  <h3 className="text-[#A3A3A3] sm:text-base">Email address</h3>
                  <p className="text-[#000]">
                    {clientDetails?.data?.email || "--"}
                  </p>
                </div>
              </div>
            </div>
            <div className="border relative border-[#D9D9D9] rounded-[10px] min-h-[160px] grid grid-cols-4 px-6 py-[30px] gap-8 sm:mb-[36px] mb-[20px]">
              <h2 className="absolute -top-3 left-6 bg-white px-1 text-[16px] font-[400] font-droid">
                Provider information
              </h2>
              <div className="md:col-span-1 col-span-2 font-droid">
                <h3 className="text-[#A3A3A3] ">Provider name</h3>
                <p>{clientDetails?.data?.providerName || "--"}</p>
              </div>
              <div className="md:col-span-1 col-span-2 font-droid">
                <h3 className="text-[#A3A3A3] ">Provider type</h3>
                <p>{clientDetails?.data?.providerType || "--"}</p>
              </div>
              <div className="md:col-span-1 col-span-2 font-droid">
                <h3 className="text-[#A3A3A3] ">County</h3>
                <p>{clientDetails?.data?.providerCounty || "--"}</p>
              </div>
              <div className="md:col-span-1 col-span-2 font-droid">
                <h3 className="text-[#A3A3A3] ">City / Town</h3>
                <p>{clientDetails?.data?.providerCity || "--"}</p>
              </div>
              <div className="md:col-span-1 col-span-2 font-droid">
                <h3 className="text-[#A3A3A3] ">Foreign provider</h3>
                <p>{clientDetails?.data?.foreignProvider || "--"}</p>
              </div>
              <div className="md:col-span-1 col-span-2 font-droid">
                <h3 className="text-[#A3A3A3] ">Provider note</h3>
                <p>{clientDetails?.data?.providerNotes || "--"}</p>
              </div>
            </div>
            <div className="border relative border-[#D9D9D9] gap-8 rounded-[10px] px-6 py-[30px] items-center sm:mb-[36px] mb-[20px]">
              <h2 className="absolute -top-3 left-6 bg-white px-1 text-[16px] font-[400] font-droid">
                Trainer Status
              </h2>
              <RadioGroup
                defaultValue={trainerStatus}
                value={trainerStatus}
                disabled
                onValueChange={(data) => setTrainerStatus(data)}
                className="flex items-center gap-[34px]"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem
                    value={"1"}
                    id="r1"
                    className={`${
                      TrainerStatus[+trainerStatus] !== "Active"
                        ? "border-[#A3A3A3]"
                        : "border-[#05668A]"
                    } w-[22px] h-[22px]`}
                    indicatorClassName="w-[12px] fill-[#05668A] h-[12px]"
                  />
                  <Label
                    htmlFor="r1"
                    className={`text-[16px] font-normal ${
                      TrainerStatus[+trainerStatus] !== "Active" &&
                      "text-[#A3A3A3]"
                    }`}
                  >
                    Active
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem
                    value={"0"}
                    id="r2"
                    className={`${
                      TrainerStatus[+trainerStatus] !== "Inactive"
                        ? "border-[#A3A3A3]"
                        : "border-[#05668A]"
                    } w-6 h-6`}
                    indicatorClassName="w-[12px] fill-[#05668A] h-[12px]"
                  />
                  <Label
                    htmlFor="r2"
                    className={`text-[16px] font-normal ${
                      TrainerStatus[+trainerStatus] !== "Inactive" &&
                      "text-[#A3A3A3]"
                    }`}
                  >
                    Inactive
                  </Label>
                </div>
              </RadioGroup>
            </div>
            <div className="border relative border-[#D9D9D9] gap-8 rounded-[10px] px-6 py-[30px] items-center">
              <h2 className="absolute -top-3 left-6 bg-white px-1 text-[16px] font-[400] font-droid">
                Trainer Permissions
              </h2>
              <div className="flex md:flex-row flex-col md:items-center items-start gap-4">
                <div className="flex items-center space-x-2">
                  <Switch
                    id="airplane-mode"
                    disabled
                    defaultChecked={trainerPermission}
                    checked={trainerPermission}
                    onCheckedChange={() =>
                      setTrainerPermission(!trainerPermission)
                    }
                    switchClassName={
                      "w-[12px] h-[12px] data-[state=checked]:translate-x-6 data-[state=unchecked]:translate-x-0.5"
                    }
                    className="h-[21px] w-[42px] data-[state=checked]:bg-[#00778B] data-[state=unchecked]:bg-input"
                  />
                  <Label
                    htmlFor="airplane-mode"
                    className="text-[16px] font-droid"
                  >
                    Course Creation
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="airplane-mode"
                    disabled
                    defaultChecked={trainerEditPermission}
                    checked={trainerEditPermission}
                    onCheckedChange={() =>
                      setTrainerEditPermission(!trainerEditPermission)
                    }
                    switchClassName={
                      "w-[12px] h-[12px] data-[state=checked]:translate-x-6 data-[state=unchecked]:translate-x-0.5"
                    }
                    className="h-[21px] w-[42px] data-[state=checked]:bg-[#00778B] data-[state=unchecked]:bg-input"
                  />
                  <Label
                    htmlFor="airplane-mode"
                    className="text-[16px] font-droid"
                  >
                    Edit Course
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="airplane-mode"
                    disabled
                    defaultChecked={assignCertificatePermission}
                    checked={assignCertificatePermission}
                    onCheckedChange={() =>
                      setAssignCertificatePermission(
                        !assignCertificatePermission
                      )
                    }
                    switchClassName={
                      "w-[12px] h-[12px] data-[state=checked]:translate-x-6 data-[state=unchecked]:translate-x-0.5"
                    }
                    className="h-[21px] w-[42px] data-[state=checked]:bg-[#00778B] data-[state=unchecked]:bg-input"
                  />
                  <Label
                    htmlFor="airplane-mode"
                    className="text-[16px] font-droid"
                  >
                    Assign Certificate
                  </Label>
                </div>
              </div>
            </div>
            {/* <div className="text-right">
              <Button
                type="button"
                onClick={handleSubmit}
                className="text-[16px] font-semibold font-droid uppercase sm:py-[15px] py-[10px] sm:px-[30px] px-[20px] h-auto bg-[#58BA66]"
              >
                {isPendingUpdate ? (
                  <Loader containerClassName="h-auto" />
                ) : (
                  "Update"
                )}
              </Button>
            </div> */}
            <div>
              <h4 className="text-[16px] font-font-droid font-semibold mb-[14px]">
                Created Courses
              </h4>
              <div className="grid grid-cols-4 gap-4">
                {clientDetails?.data?.course &&
                clientDetails?.data?.course?.length > 0 ? (
                  clientDetails?.data?.course?.map((course: any) => (
                    <div
                      key={course?.id}
                      className="border border-[#D9D9D9] rounded-[6px] xl:col-span-2 col-span-4 sm:py-[14px] sm:px-[19px] p-[15px]"
                    >
                      <div className="sm:flex block items-start gap-[22px]">
                        <div className="aspect-video bg-[color:var(--base5-56)] justify-center items-center flex relative overflow-hidden bg-slate-400">
                          <img
                            src={course?.bannerImage || Course_image}
                            alt="bannerImage"
                            className="object-cover w-[300px] h-full static align-middle max-w-full inline-block"
                          />
                        </div>
                        <div>
                          <div className="flex flex-wrap items-center gap-[7px] sm:mb-[22px] sm:mt-0 my-4">
                            <div className="flex flex-wrap items-center">
                              <img
                                src={starImage}
                                alt=""
                                className="w-[16px] h-[16px]"
                              />
                              <p className="pl-1 font-semibold font-droid text-sm mt-1">
                                0/5
                              </p>
                            </div>
                            <div className="flex flex-wrap items-center gap-[11px]">
                              {course?.courseData?.map((itm: any) => {
                                const color = itm?.fetchMaturity?.color;
                                return (
                                  <span
                                    className={`bg-[${color}] px-[10px] py-[3px] rounded-full`}
                                  >
                                    {itm?.fetchPillar?.pillarName}
                                  </span>
                                );
                              })}
                            </div>
                          </div>
                          <h3 className="text-[16px] font-droid font-[500] xl:mb-[12px] mb-2">
                            {course?.title}
                          </h3>
                          <h5 className="text-[16px] font-font-droid font-semibold xl:mb-[13px] mb-2">
                            Company Name : {course?.trainerId?.name}
                          </h5>
                          <h5 className="text-[16px] font-font-droid font-semibold">
                            Number Of Employee : 15
                          </h5>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="flex items-center justify-center h-[100px] col-span-full text-[16px] font-droid font-semibold text-[#A3A3A3]">
                    No Course Available
                  </p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TrainerDetails;

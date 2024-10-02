import Loader from "@/components/comman/Loader";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { QUERY_KEYS } from "@/lib/constants";
import { inviteSingleEmployeeDetail } from "@/services/apiServices/employee";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { IoIosArrowRoundBack } from "react-icons/io";
import { useParams } from "react-router-dom";

const EmployeeDetailsPage = () => {
  // const [approved, setApproved] = useState(false);
  const params = useParams();

  const [trainerStatus, setTrainerStatus] = useState(1);

  const { data, isLoading } = useQuery({
    queryKey: [QUERY_KEYS.employeeDetails, { id: params.id }],
    queryFn: () => inviteSingleEmployeeDetail(params.id!),
  });

  console.log("🚀 ~ EmployeeDetailsPage ~ data:", data);
  useEffect(() => {
    if (data) {
      setTrainerStatus(data?.employeeStatus === "Active" ? 1 : 0);
    }
  }, [data]);

  return (
    <div className="pb-[36px] bg-primary-foreground rounded-[10px] sm:h-full h-[calc(100vh-190px)] font-droidSans overflow-auto">
      <div className="border-b-2 pb-[25px] flex justify-between pl-[22px] pr-[28px] items-center pt-[24px]">
        <h2 className="text-base font-bold font-droid pb-1">Trainee Details</h2>
        <Button
          variant={"ghost"}
          className="p-0 text-base font-droid font-bold"
          onClick={() => window.history.back()}
        >
          <IoIosArrowRoundBack size={26} />
          Back
        </Button>
      </div>

      <div>
        {isLoading ? (
          <Loader />
        ) : (
          <div className="px-[22px]">
            <div className="mt-[17px]">
              <fieldset className="border rounded-[10px]">
                <legend className="mx-[35px] text-base">
                  <h2 className="font-droid text-base">
                    Trainer personal information
                  </h2>
                </legend>
                <div className="grid grid-cols-10 items-center pl-[25px] py-[20px]">
                  <div className="text-base xl:col-span-1 col-span-3">
                    <Avatar className="w-[109px] h-[109px]">
                      <AvatarImage src={data?.profileImage || ""} />
                      <AvatarFallback className="text-xl">
                        {data?.name?.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                  </div>
                  <div className="text-base xl:col-span-2 col-span-5 sm:ps-0 ps-3">
                    <h6 className="text-[#A3A3A3] text-base font-droid pb-2.5">
                      Trainer contact firstname
                    </h6>
                    <p className="text-base font-droid">
                      {data?.employeeDetails?.fname || "-"}
                    </p>
                  </div>
                  <div className="text-base xl:col-span-2 col-span-5 sm:ps-0 ps-3">
                    <h6 className="text-[#A3A3A3] text-base font-droid pb-2.5">
                      Trainer contact lastname
                    </h6>
                    <p className="text-base font-droid">
                      {data?.employeeDetails?.lname || "-"}
                    </p>
                  </div>
                  <div className="text-base xl:col-span-2 sm:col-span-4 col-span-9 xl:pt-0 pt-3">
                    <h6 className="text-[#A3A3A3] text-base font-droid pb-2.5">
                      Contact number
                    </h6>
                    <p className="text-base font-droid">{data?.phone || "-"}</p>
                  </div>
                  <div className="text-base xl:col-span-3 sm:col-span-5 col-span-9 xl:pt-0 pt-3">
                    <h6 className="text-[#A3A3A3] text-base font-droid pb-2.5">
                      Email address
                    </h6>
                    <p className="text-base font-droid">{data?.email || "-"}</p>
                  </div>
                </div>
              </fieldset>
            </div>
            <div className="xl:mt-[27px] mt-[22px]">
              <fieldset className="border rounded-[10px]">
                <legend className="mx-[35px] text-base">
                  <h2 className="text-base font-droid">Trainer Status</h2>
                </legend>
                <div className="pl-[25px] py-[20px] flex items-center gap-[59px]">
                  <RadioGroup
                    onValueChange={(value: any) => setTrainerStatus(value)}
                    disabled={true}
                    value={trainerStatus.toString()}
                    className="flex items-center gap-[34px]"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem
                        value={"1"}
                        indicatorClassName="!w-auto !h-auto"
                        id="r1"
                      />
                      <Label
                        htmlFor="r1"
                        className="text-base font-droid font-normal"
                      >
                        Active
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem
                        value={"0"}
                        indicatorClassName="!w-auto !h-auto"
                        id="r3"
                      />
                      <Label
                        htmlFor="r3"
                        className="text-base font-droid font-normal"
                      >
                        Inactive
                      </Label>
                    </div>
                  </RadioGroup>
                  {/* <Button className="xl:text-base text-sm font-droid font-semibold xl:w-[121px] xl:h-[52px] w-[100px] h-[40px] bg-[#58BA66]">
                    SUBMIT
                  </Button> */}
                </div>
              </fieldset>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default EmployeeDetailsPage;

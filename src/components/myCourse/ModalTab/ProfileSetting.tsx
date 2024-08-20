import InputWithLabel from "@/components/comman/InputWithLabel";
import Loader from "@/components/comman/Loader";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "@/components/ui/use-toast";
import { QUERY_KEYS } from "@/lib/constants";
import { getUserDetails, updateUserDetails } from "@/services/apiServices/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { FieldValues, useForm } from "react-hook-form";
import * as zod from "zod";

// const birthMonth = [
//   {
//     label: "January",
//     value: "january",
//   },
//   {
//     label: "February",
//     value: "february",
//   },
//   {
//     label: "March",
//     value: "march",
//   },
//   {
//     label: "April",
//     value: "april",
//   },
//   {
//     label: "May",
//     value: "may",
//   },
// ];

// const birthDate = [
//   {
//     label: "1",
//     value: "1",
//   },
//   {
//     label: "2",
//     value: "2",
//   },
//   {
//     label: "3",
//     value: "3",
//   },
//   {
//     label: "4",
//     value: "4",
//   },
//   {
//     label: "5",
//     value: "5",
//   },
// ];

// const birthYear = [
//   {
//     label: "1998",
//     value: "1",
//   },
//   {
//     label: "1999",
//     value: "2",
//   },
//   {
//     label: "2000",
//     value: "3",
//   },
//   {
//     label: "2001",
//     value: "4",
//   },
//   {
//     label: "2002",
//     value: "5",
//   },
// ];

const schema = zod.object({
  firstname: zod.string(),
  lastname: zod.string().min(1, { message: "Please Enter last name" }),
  email: zod.string(),
  gender: zod.string(),
});

const ProfileSetting = ({ handleClose }: { handleClose: () => void }) => {
  // const [selectBirthMonth, setSelectBirthMonth] = useState("");
  // const [selectBirthDate, setSelectBirthDate] = useState("");
  // const [selectBirthYear, setSelectBirthYear] = useState("");
  const userData = JSON.parse(localStorage.getItem("user") as string);
  const pathName = window.location.pathname;
  const currentUser = pathName.split("/")[1];
  const {
    register,
    formState: { errors },
    setValue,
    watch,
    handleSubmit,
    reset,
  } = useForm({
    resolver: zodResolver(schema),
    mode: "all",
  });

  const { data, isPending } = useQuery({
    queryKey: [QUERY_KEYS.userDetails, { id: userData?.query?.id }],
    queryFn: () => getUserDetails(userData?.query?.id),
  });

  const { mutate, isPending: isPendingMutation } = useMutation({
    mutationFn: updateUserDetails,
    onSuccess: (data) => {
      const newUser = {
        ...userData,
        query: {
          ...data?.data,
          detailsid: userData?.query?.detailsid,
          role: userData?.query?.role.toString(),
        },
      };
      localStorage.setItem("user", JSON.stringify(newUser));

      reset();
      handleClose();
      toast({ title: "Profile updated successfully", variant: "success" });
    },
  });
  useEffect(() => {
    if (data) {
      setValue("firstname", data?.data?.fname || data?.data?.name);
      setValue("lastname", data?.data?.lname);
      setValue("email", data?.data?.email);
      setValue("gender", data?.data?.gender);
      const userData = JSON.parse(localStorage.getItem("user") as string);
      localStorage.setItem("user", JSON.stringify({...userData, query: {...userData?.query, fname: data?.data?.fname, lname: data?.data?.lname}}));
    }
  }, [data]);

  const onSubmit = (data: FieldValues) => {
    const payload = {
      firstName: data?.firstname,
      lastName: data?.lastname,
      gender: data?.gender,
      userid: userData?.query?.id,
    };
    mutate(payload);
  };

  return (
    <div className="flex flex-col gap-5">
      {isPending ? (
        <Loader />
      ) : (
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-2 gap-5">
            <div className="col-span-1 flex flex-col gap-1">
              <InputWithLabel
                label={currentUser === 'company' ? "SME Organisation" : "First name"}
                placeholder={currentUser === 'company' ? "SME Organisation" : "First name"}
                {...register("firstname")}
                error={errors?.firstname?.message as string}
              />
            </div>

            <div className="col-span-1 flex flex-col gap-1">
              <InputWithLabel
                label={currentUser === 'company' ? "User Name" : "Last name"}
                placeholder={currentUser === 'company' ? "User Name" : "Last name"}
                {...register("lastname")}
                error={errors?.lastname?.message as string}
              />
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <InputWithLabel
              label="Email"
              disabled={watch("email") ? true : false}
              placeholder="Email"
              {...register("email")}
              error={errors?.email?.message as string}
            />
          </div>
          <div className="flex flex-col gap-1">
            <Label className="font-primary text-[14px] font-[400] leading-normal text-[#111821] md:text-[14px]">
              Gender
            </Label>
            <RadioGroup
              onValueChange={(data) => setValue("gender", data)}
              value={watch("gender")}
              className="flex gap-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem
                  value="male"
                  id="option-one"
                  className="border-[#9B9B9B] w-6 h-6"
                />
                <Label
                  htmlFor="option-one"
                  className="text-[#9B9B9B] text-sm font-sans"
                >
                  Male
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem
                  value="female"
                  id="option-two"
                  className="border-[#9B9B9B] w-5 h-5"
                />
                <Label
                  htmlFor="option-two"
                  className="text-[#9B9B9B] text-sm font-sans"
                >
                  Female
                </Label>
              </div>
            </RadioGroup>
          </div>
          <div className="flex flex-col gap-1">
            {/* <Label className="sm:text-base text-sm font-nunito text-black">
              Birth Date
            </Label>
            <div className="flex items-center gap-5">
              <SelectMenu
                option={birthMonth}
                setValue={(data: string) => setSelectBirthMonth(data)}
                value={selectBirthMonth}
                className="font-nunito text-sm text-black"
                placeholder="January"
              />
              <SelectMenu
                option={birthDate}
                setValue={(data: string) => setSelectBirthDate(data)}
                value={selectBirthDate}
                className="font-calibri text-sm text-black"
                placeholder="1"
              />
              <SelectMenu
                option={birthYear}
                setValue={(data: string) => setSelectBirthYear(data)}
                value={selectBirthYear}
                className="font-calibri text-sm text-black"
                placeholder="2000"
              />
            </div> */}
            <div className="text-center mt-5">
              <Button
                type="submit"
                isLoading={isPendingMutation}
                className="bg-[#00778B] font-abhaya text-base px-7"
              >
                Edit
              </Button>
            </div>
          </div>
        </form>
      )}
    </div>
  );
};

export default ProfileSetting;

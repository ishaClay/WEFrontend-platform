import PasswordInputWithLabel from "@/components/comman/PasswordInputWithLabel";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { changePassword } from "@/services/apiServices/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { FieldValues, useForm } from "react-hook-form";
import * as zod from "zod";

const schema = zod
  .object({
    oldPassword: zod.string().min(3, "Please enter old password"),
    password: zod
      .string()
      .min(1, { message: "Please enter password" })
      .regex(
        /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;"'<>,.?/~`|-]).{8,}$/,
        "Password must contain at least one uppercase letter, one number, one special character, and a minimum of 8 characters"
      ),
    confirmPassword: zod.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password don't match",
    path: ["confirmPassword"],
  })
  .superRefine((data, ctx) => {
    if (data?.password === data?.oldPassword) {
      ctx.addIssue({
        code: zod.ZodIssueCode.custom,
        message: "Please use another password",
        path: ["password"],
      });
    }
  });

const AccountSetting = ({ handleClose }: { handleClose: () => void }) => {
  const userData = JSON.parse(localStorage.getItem("user") as string);
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({
    resolver: zodResolver(schema),
    mode: "all",
  });

  const onClose = () => {
    handleClose();
    reset();
  };

  const { mutate, isPending: isPendingMutation } = useMutation({
    mutationFn: changePassword,
    onSuccess: () => {
      reset();
      toast({ title: "Password updated successfully", variant: "success" });
    },
    onError: (error: any) => {
      console.error(error);
      toast({ title: error?.data?.message, variant: "destructive" });
    },
  });

  const onSubmit = (data: FieldValues) => {
    const payload = {
      userId: userData?.query?.id,
      oldPassword: data?.oldPassword,
      password: data?.password,
      confirmPassword: data?.confirmPassword,
    };
    mutate(payload);
  };

  return (
    <div className="flex flex-col gap-5">
      <h4 className="text-lg text-black font-semibold font-droid sm:block hidden">
        Change password
      </h4>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
        <div className="flex flex-col gap-1">
          {/* <InputWithLabel
            label="Old password"
            placeholder="Enter old password"
            className="border border-[#D9D9D9] placeholder:[#A3A3A3] text-sm"
            labelClassName="!text-base font-droid text-black"
            {...register("oldPassword")}
            error={errors?.oldPassword?.message as string}
          /> */}
          <PasswordInputWithLabel
            className="border border-[#D9D9D9] placeholder:[#A3A3A3] text-sm"
            placeholder="Enter old password"
            label="Old password"
            {...register("oldPassword")}
            error={errors?.oldPassword?.message as string}
          />
        </div>

        <div className="flex flex-col gap-1">
          {/* <InputWithLabel
            label="New password"
            placeholder="Enter new password"
            className="border border-[#D9D9D9] placeholder:[#A3A3A3] text-sm"
            labelClassName="!text-base font-droid text-black"
            {...register("password")}
            error={errors?.password?.message as string}
          /> */}
          <PasswordInputWithLabel
            className="border border-[#D9D9D9] placeholder:[#A3A3A3] text-sm"
            placeholder="Enter new password"
            label="New password"
            {...register("password")}
            error={errors?.password?.message as string}
          />
        </div>

        <div className="flex flex-col gap-1">
          {/* <InputWithLabel
            label="Confirm New password"
            placeholder="Confirm new password"
            className="border border-[#D9D9D9] placeholder:[#A3A3A3] text-sm"
            labelClassName="!text-base font-droid text-black"
            {...register("confirmPassword")}
            error={errors?.confirmPassword?.message as string}
          /> */}
          <PasswordInputWithLabel
            className="border border-[#D9D9D9] placeholder:[#A3A3A3] text-sm"
            placeholder="Confirm new password"
            label="Confirm New password"
            {...register("confirmPassword")}
            error={errors?.confirmPassword?.message as string}
          />
        </div>
        <div className="flex sm:justify-end justify-center items-center gap-5">
          <Button
            type="submit"
            className="w-[100px] bg-primary-button h-12 text-base font-droid font-bold"
            isLoading={isPendingMutation}
          >
            Save
          </Button>
          <Button
            type="button"
            variant={"outline"}
            onClick={onClose}
            className="w-[100px]  h-12 text-base font-droid "
          >
            Cancel
          </Button>
        </div>
      </form>
      {/* <div className="flex justify-between items-center sm:pt-5 pt-16 border-t border-[#E4E4E4]">
        <Label className="sm:text-lg text-base font-droid text-black font-semibold">
          Notifications
        </Label>
        <Switch />
      </div> */}
    </div>
  );
};

export default AccountSetting;

import { SetPassword } from "@/services/apiServices/authService";
import { ResponseError } from "@/types/Errors";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useEffect } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import * as zod from "zod";
import Header from "../Header";
import InputWithLabel from "../comman/InputWithLabel";
import Loader from "../comman/Loader";
import PasswordInputWithLabel from "../comman/PasswordInputWithLabel";
import { toast } from "../ui/use-toast";

const schema = zod
  .object({
    email: zod.string().email("Please enter valid email"),
    password: zod
      .string()
      .regex(
        /^(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>])(?=.*\d)(.{8,})$/,
        "Password must contain at least one uppercase letter, one Number letter, and one special character and Minimum 8 characters"
      ),
    confirmPassword: zod.string().min(1, "Please enter Confirm password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password don't match",
    path: ["confirmPassword"],
  });

const ChangePassword = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    mode: "all",
  });
  const search = window.location.search;
  const params = new URLSearchParams(search);
  const token = params.get("token");
  const email = params.get("email");

  useEffect(() => {
    if (email) {
      setValue("email", email);
    }
  }, [email]);

  const { mutate, isPending } = useMutation({
    mutationFn: SetPassword,
    onSuccess: (data) => {
      toast({
        title: "Success",
        description: data?.data?.message,
        variant: "success",
      });

      reset();
      navigate("/auth");
    },
    onError: (error: ResponseError) => {
      toast({
        title: "Error",
        description: error?.data?.message || "Something went wrong",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: FieldValues) => {
    if (token) {
      const payload = {
        token: token,
        password: data.password,
        confirmPassword: data.confirmPassword,
      };
      mutate(payload);
    } else {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Token is required",
      });
    }
  };

  return (
    <>
      <Header />
      <div className="mainContailner">
        <div className="flex mt-[26px]">
          <div className="relative">
            <img className="max-w-full" src="../assets/img/Image.png" />

            <img
              className="absolute top-[137px] left-1/2 -translate-x-1/2 max-h-[365px] h-auto"
              src="../assets/img/pngwing.png"
            />
            <h2 className="absolute xl:bottom-[90px] bottom-[40px] left-1/2 -translate-x-1/2 text-white xl:text-[36px] text-[26px] xl:max-w-[505px] max-w-[400px] xl:leading-[46px] leading-[36px] w-full">
              <span className="text-[#73AF26]">Empower</span> your potential
              through our comprehensive training programs, where knowledge meets
              innovation
            </h2>
          </div>

          <div className="w-full 2xl:px-0 px-5 max-w-[515px] mx-auto relative">
            <div className="flex justify-end text-color">
              <label>
                Already have an account?{" "}
                <Link to={"/auth"} className="font-[700] text-[#042937]">
                  Sign In
                </Link>
              </label>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="relative max-w-[418px] mx-auto mt-[80px]">
                <p className="text-[24px] font-[700] mb-4 text-color">
                  Create Password
                </p>
                <div className="mt-4">
                  <InputWithLabel
                    className="w-full h-[52px] secondary-background mt-1"
                    label="Email"
                    labelClassName="text-[16px] text-[#3A3A3A] font-bold font-calibri"
                    type="text"
                    placeholder="Enter Password"
                    {...register("email")}
                    disabled
                  />
                </div>
                <div className="mt-4">
                  <PasswordInputWithLabel
                    className="w-full h-[52px] secondary-background mt-1"
                    label="Password"
                    labelClassName="text-[16px] text-[#3A3A3A] font-bold font-calibri"
                    type="text"
                    placeholder="Enter Password"
                    {...register("password")}
                    error={errors.password?.message as string}
                  />
                </div>
                <div className="mt-4">
                  <PasswordInputWithLabel
                    className="w-full h-[52px] secondary-background mt-1"
                    label="Confirm Password"
                    labelClassName="text-[16px] text-[#3A3A3A] font-bold font-calibri"
                    type="text"
                    placeholder="Re-enter Password"
                    {...register("confirmPassword")}
                    error={errors.confirmPassword?.message as string}
                  />
                </div>
                <button
                  type="submit"
                  className="primary-background rounded w-full h-[48px] secondary-text mt-[32px]"
                >
                  {isPending ? (
                    <Loader containerClassName="h-auto" />
                  ) : (
                    "Submit"
                  )}
                </button>
              </div>
            </form>
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2">
              <ul className="max-w-[370px] mx-auto h-[30px] text-[12px] font-[400] ">
                <li className="text-[#898989]">
                  Protected by reCAPTCHA and subject to the Skillnet{" "}
                  <Link to="/privacypolicy" className="text-color font-bold">
                    Privacy Policy{" "}
                  </Link>{" "}
                  and{" "}
                  <Link
                    to={"/termsofservices"}
                    className="text-color font-bold"
                  >
                    Terms of Service.
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChangePassword;

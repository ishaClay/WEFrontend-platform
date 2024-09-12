import Loading from "@/components/comman/Error/Loading";
import HomeFooter from "@/components/homePage/HomeFooter";
import HomeHeader from "@/components/homePage/HomeHeader";
import RegisterBanner from "@/components/RegisterTrainee/RegisterBanner";
import RegisterTraineeForm from "@/components/RegisterTrainee/RegisterTraineeForm";
import { employeeRegister } from "@/services/apiServices/employee";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const RegisterTrainee = () => {
  const navigate = useNavigate();
  const search = window.location.search;
  const params = new URLSearchParams(search);
  const email: string | null = params.get("email");
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  const { data, isLoading } = useQuery({
    queryKey: ["employeeRegister"],
    queryFn: () => employeeRegister(email || ""),
    enabled: !!email,
  });

  // useEffect(() => {
  //   if (!!data) {
  //     navigate("/auth");
  //   }
  // }, [data, email]);

  return (
    <>
      <HomeHeader />
      <div className="display flex xl:gap-[50px] gap-[25px] xl:pr-4 mainContailner !my-4">
        <RegisterBanner />
        <div className="lg:max-w-[509px] w-full 2xl:mx-auto relative xl:mr-0 lg:mr-5 lg:px-0 px-5">
          <RegisterTraineeForm />
        </div>
      </div>
      <HomeFooter />
      <Loading isLoading={isLoading} />
    </>
  );
};

export default RegisterTrainee;

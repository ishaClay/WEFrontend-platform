import Header from "@/components/Header";
import RegisterBanner from "@/components/RegisterTrainee/RegisterBanner";
import RegisterTraineeForm from "@/components/RegisterTrainee/RegisterTraineeForm";

const RegisterTrainee = () => {
  return (
    <>
      <Header />
      <div className="display flex xl:gap-[50px] gap-[25px] xl:pr-4 mainContailner">
        <RegisterBanner />
        <div className="max-w-[509px] w-full 2xl:mx-auto relative xl:mr-0 mr-5">
          <RegisterTraineeForm />
        </div>
      </div>
    </>
  );
};

export default RegisterTrainee;

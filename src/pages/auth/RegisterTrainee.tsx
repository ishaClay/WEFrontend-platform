import Header from "@/components/Header";
import RegisterBanner from "@/components/RegisterTrainee/RegisterBanner";
import RegisterTraineeForm from "@/components/RegisterTrainee/RegisterTraineeForm";

const RegisterTrainee = () => {
  return (
    <>
      <Header />
      <div className="display flex mainContailner">
        <RegisterBanner />
        <div className=" max-w-[515px] mx-auto relative">
          <RegisterTraineeForm />
        </div>
      </div>
    </>
  );
};

export default RegisterTrainee;

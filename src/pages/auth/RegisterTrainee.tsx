import Header from "@/components/Header";
import RegisterBanner from "@/components/RegisterTrainee/RegisterBanner";
import RegisterTraineeForm from "@/components/RegisterTrainee/RegisterTraineeForm";

const RegisterTrainee = () => {
	return (
		<>
			<Header />
			<div className="display flex">
				<RegisterBanner />
				<RegisterTraineeForm />
			</div>
		</>
	);
};

export default RegisterTrainee;

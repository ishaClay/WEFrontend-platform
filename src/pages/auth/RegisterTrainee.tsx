import RegisterBanner from "@/components/RegisterTrainee/RegisterBanner";
import RegisterTraineeForm from "@/components/RegisterTrainee/RegisterTraineeForm";

const RegisterTrainee = () => {
	return (
		<div className="display flex">
			<RegisterBanner />
			<RegisterTraineeForm />
		</div>
	);
};

export default RegisterTrainee;

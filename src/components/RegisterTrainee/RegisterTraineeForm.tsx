import mandatory from "/assets/img/Mandatory.svg";
import ErrorMessage from "../comman/Error.tsx/ErrorMessage";
import Input from "../comman/Input/Input";

const RegisterTraineeForm = () => {
	return (
		<div className="relative font-['calibri'] w-1/2">
			<ul className="absolute w-[212px] text-[14px] text-[#042937] top-[11px] left-[344px]">
				<li>
					Already have an account?{" "}
					<a className="cursor-pointer" href="/">
						Sign In
					</a>
				</li>
			</ul>
			<div className="mx-6 mb-4 mt-[63px]">
				<span className="mb-[27px] text-[#202020] text-2xl leading-[30px] font-bold drop-shadow-[0px_4px_4px_0px_#00000060]">
					Register as
				</span>
				<div className="flex overflow-hidden justify-evenly border-gainsboro-100 border-solid border-[1px] rounded-[5px] w-[328px] h-[48px] text-[18px] leading-[22px] font-normal text-darkslategray-100">
					<button className="w-full">Trainer</button>
					<button className="w-full">company</button>
					<button className="w-full bg-[#73AF26] text-white font-bold">
						Trainee
					</button>
				</div>
			</div>
			<div className="w-[592px] m-8 flex flex-col items-center">
				<form className="flex flex-col items-center">
					<div className="flex flex-row flex-wrap gap-x-8 text-[16px] leading-[19.53px] font-bold">
						<div className="mb-4">
							<label className="mb-1  text-[#3A3A3A] font-bold flex items-center leading-5">
								First Name
								<img src={mandatory} className="p-1" />
							</label>
							<Input
								label=""
								onChange={() => {}}
								onBlur={() => {}}
								value={""}
								name="firstName"
							/>
							<ErrorMessage message={""} />
						</div>
						<div className="mb-4">
							<label className="mb-1 flex items-center">
								Surname
								<img src={mandatory} className="p-1" />
							</label>
							<Input
								label=""
								name="surname"
								value={""}
								onChange={() => {}}
								onBlur={() => {}}
							/>
							<ErrorMessage message={""} />
						</div>
						<div className="mb-4">
							<label className="mb-1 flex items-center">
								Gender
								<img src={mandatory} className="p-1" />
							</label>
							<Input
								label=""
								name="gender"
								value={""}
								onChange={() => {}}
								onBlur={() => {}}
							/>
							<ErrorMessage message={""} />
						</div>
						<div className="mb-4">
							<label className="mb-1 flex items-center">
								Age Range
								<img src={mandatory} className="p-1" />
							</label>
							<Input
								label=""
								name="ageRange"
								value={""}
								onChange={() => {}}
								onBlur={() => {}}
							/>
							<ErrorMessage message={""} />
						</div>
						<div className="mb-4">
							<label className="mb-1 flex items-center">
								Email
								<img src={mandatory} className="p-1" />
							</label>
							<Input
								label=""
								name="emailAddress"
								value={""}
								onChange={() => {}}
								onBlur={() => {}}
							/>
							<ErrorMessage message={""} />
						</div>
						<div className="mb-4">
							<label className="mb-1 flex items-center">
								Phone
								<img src={mandatory} className="p-1" />
							</label>
							<Input
								label=""
								name="phone"
								value={""}
								onChange={() => {}}
								onBlur={() => {}}
							/>
							<ErrorMessage message={""} />
						</div>
						<div className="mb-4">
							<label className="mb-1 flex items-center">
								Current Highest NFQ
								<img src={mandatory} className="p-1" />
							</label>
							<Input
								label=""
								name="currentHighestNFQ"
								value={""}
								onChange={() => {}}
								onBlur={() => {}}
							/>
							<ErrorMessage message={""} />
						</div>
						<div className="mb-4">
							<label className="mb-1 flex items-center">
								Employment Status
							</label>
							<Input
								label=""
								name="employmentStatus"
								value={""}
								onChange={() => {}}
								onBlur={() => {}}
							/>
						</div>
						<div className="mb-4">
							<label className="mb-1 flex items-center">Member Company</label>
							<Input
								label=""
								name="memberCompany"
								value={""}
								onChange={() => {}}
								onBlur={() => {}}
							/>
						</div>
						<div className="mb-4">
							<label className="mb-1 flex items-center">
								Occupational Category
							</label>
							<Input
								label=""
								name="occupationalCategory"
								value={""}
								onChange={() => {}}
								onBlur={() => {}}
							/>
						</div>
						<div className="mb-4">
							<label className="mb-1 flex items-center">
								Unemployment Time
							</label>
							<Input
								label=""
								name="unemploymentTime"
								value={""}
								onChange={() => {}}
								onBlur={() => {}}
							/>
						</div>
						<div className="mb-4">
							<label className="mb-1 flex items-center">
								County Of Residence
								<img src={mandatory} className="p-1" />
							</label>
							<Input
								label=""
								name="countyOfResidence"
								value={""}
								onChange={() => {}}
								onBlur={() => {}}
							/>

							<ErrorMessage message={""} />
						</div>
						<div className="mb-4">
							<label className="mb-1 flex items-center">Attended Event</label>
							<Input
								label=""
								name="attendedEvent"
								value={""}
								onChange={() => {}}
								onBlur={() => {}}
							/>
						</div>
					</div>
					<button className="mt-8 bg-primary-button rounded w-[370px] h-12 text-white border border-solid border-black shadow-[0px_4px_4px_0px_#00000040]">
						Submit
					</button>
				</form>
				<p className="mt-[39px] text-[#898989] text-[12px] leading-[14.65px] w-[296px] text-center font-normal">
					Protected by reCAPTCHA and subject to the Skillnet{" "}
					<span className="text-darkslategray-200">Privacy Policy</span> and{" "}
					<span className="text-darkslategray-200">Terms of Service.</span>
				</p>
			</div>
		</div>
	);
};

export default RegisterTraineeForm;

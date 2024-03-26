import Header from "@/components/Header";
import { PrimaryButton, SecondaryButton } from "@/components/comman/Button/PrimaryButton";
import Input from "@/components/comman/Input/Input";
import SelectBox from "@/components/comman/SelectBox/SelectBox";

function RegisterTrainer() {
	return (
		<>
			<Header />
			<div className="flex relative mt-[40px]">
				<div>
					<img
						className="w-[707px] h-[1000px]"
						src="../assets/img/Group 1000001826.png"
					/>
				</div>

				<div className="h-auto ">
					<div className="w-full ml-[400px]">
						<p>
							Already have an account? <a className="text-[#042937]">Sign In</a>
						</p>
					</div>
					<div className="w-[707px] mt-[90px] ">
						<div className="flex gap-x-[8px] h-180px items-end ml-[50px]">
							<h3 className="text-[24px]">Complete your registration</h3>
							<img
								className="mb-[10px]"
								src="../assets/img/Group 1000001825.png"
							/>
						</div>
						<div className="flex flex-wrap gap-x-[100px] sm:gap-x-[40px] gap-y-[30px] mt-[32px] justify-center">
							<div>
								<Input
									value={""}
									placeholder="Sample Consulting Company"
									onChange={() => {}}
									className=""
									label="Provider Name"
								/>
							</div>
							<div>
								<Input
									value={""}
									placeholder="IT or University"
									onChange={() => {}}
									className=""
									label="Provider Type"
								/>
							</div>
							<div>
								<Input
									value={""}
									placeholder="London"
									onChange={() => {}}
									className=""
									label="Provider City/Town"
								/>
							</div>
							<div>
								<Input
									value={""}
									placeholder="London"
									onChange={() => {}}
									className=""
									label="Provider County"
								/>
							</div>
							<div>
								<Input
									value={""}
									placeholder="Sample"
									onChange={() => {}}
									className=""
									label="Contact Surname"
								/>
							</div>
							<div>
								<Input
									value={""}
									placeholder="0044 1234 1234567"
									onChange={() => {}}
									className=""
									label="Contact Telephone No."
								/>
							</div>
							<div>
								<label>Foreign Provider</label>
								<SelectBox value={""} onChange={() => {}} />
							</div>
							<div>
								<Input
									value={""}
									placeholder="221 B Baker Street"
									onChange={() => {}}
									className=""
									label="Provider Address"
								/>
							</div>
							<div>
								<Input
									value={""}
									placeholder="United Kingdom"
									onChange={() => {}}
									className=""
									label="Provider Country"
								/>
							</div>
							<div>
								<Input
									value={""}
									placeholder="John"
									onChange={() => {}}
									className=""
									label="Contact First Name"
								/>
							</div>{" "}
							<div>
								<Input
									value={""}
									placeholder="john.sample@emailsample.com"
									onChange={() => {}}
									className=""
									label="Email Address"
								/>
							</div>
							<div>
								<Input
									value={""}
									placeholder="Notes 1"
									onChange={() => {}}
									className=""
									label="Provider Notes"
								/>
							</div>
							<PrimaryButton name="Submit" className="w-[370px] h-[48px]" />
							<div>
								<ul className="w-[300px] mt-[70px] h-[30px] text-[12px] font-[400] text-center">
									<li>
										Protected by reCAPTCHA and subject to the Skillnet{" "}
										<a className="text-[#042937] ">Privacy Policy </a> and{" "}
										<a className="text-[#042937] ">Terms of Service.</a>
									</li>
								</ul>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default RegisterTrainer;

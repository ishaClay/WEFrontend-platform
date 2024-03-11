import Button from "@/components/comman/Button/Button";
import Input from "@/components/comman/Input/Input";
import SelectBox from "@/components/comman/SelectBox/SelectBox";

function RegisterTrainer() {
	return (
		<div className="container mx-auto  flex relative mt-[40px]">
			<div className="relative">
				<img
					className="w-[707px] h-[958px] sm:w-[550px]"
					src="../assets/img/Base.png"
				/>
				<img
					className="absolute top-[87px] left-[174px] sm:left-[100px]"
					src="../assets/img/Group 99.png"
				/>
			</div>

			<div className="h-[700px] mt-[130px] ml-[38px] 2xl:w-[800px] xl:w-[600px]  sm:w-[550px]">
				<p className="absolute top-[10px] right-[280px] md:right-[-250px] lg:right-0">
					Already have an account? <a className="text-[#042937]">Sign In</a>
				</p>
				<h3 className="5xl">Complete your registration</h3>
				<div className="flex flex-wrap gap-x-[100px] sm:gap-x-[40px] gap-y-[30px] mt-[32px]">
					<div>
						<label>Provider Name</label>
						<Input value={"1"} onChange={() => {}} />
					</div>
					<div>
						<label>Provider Type</label>
						<Input value={"1"} onChange={() => {}} />
					</div>
					<div>
						<label>Provider City/Town</label>
						<Input value={"1"} onChange={() => {}} />
					</div>
					<div>
						<label>Provider County</label>
						<Input value={"1"} onChange={() => {}} />
					</div>
					<div>
						<label>Contact Surname</label>
						<Input value={"1"} onChange={() => {}} />
					</div>
					<div>
						<label>Contact Telephone No.</label>

						<Input value={"1"} onChange={() => {}} />
					</div>
					<div>
						<label>Foreign Provider</label>
						<SelectBox value={"1"} onChange={() => {}} />
					</div>
					<div>
						<label>Provider Address</label>

						<Input value={"1"} onChange={() => {}} />
					</div>
					<div>
						<label>Provider Country</label>

						<Input value={"1"} onChange={() => {}} />
					</div>
					<div>
						<label>Contact First Name</label>

						<Input value={"1"} onChange={() => {}} />
					</div>{" "}
					<div>
						<label>Email Address</label>

						<Input value={"1"} onChange={() => {}} />
					</div>
					<div>
						<label>Provider Notes</label>

						<Input value={"1"} onChange={() => {}} />
					</div>
				</div>

				{/* <button  className='w-[370px] h-[48px] bg-primary-button rounded-[4px] ml-[70px] mt-[40px] text-white'>Submit</button> */}

				<Button />
			</div>
		</div>
	);
}

export default RegisterTrainer;

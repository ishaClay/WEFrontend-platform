
import mandatory from "/assets/img/Mandatory.svg";
import * as Yup from "yup";
import { useFormik } from "formik";
import ErrorMessage from "../comman/Error.tsx/ErrorMessage";
import Input from "../comman/Input/Input";

const RegisterTraineeForm = () => {
	const validationSchema = Yup.object().shape({
		firstName: Yup.string().required("First Name is required"),
		surname: Yup.string().required("Surname is required"),
		gender: Yup.string().required("Gender is required"),
		ageRange: Yup.string().required("Age Range is required"),
		emailAddress: Yup.string()
			.email("Invalid email address")
			.required("Email Address is required"),
		phone: Yup.string().required("Phone is required"),
		currentHighestNFQ: Yup.string().required("Current Highest NFQ is required"),
		employmentStatus: Yup.string(),
		memberCompany: Yup.string().required("Member Company is required"),
		occupationalCategory: Yup.string().required(
			"Occupational Category is required"
		),
		unemploymentTime: Yup.string().required("Unemployment Time is required"),
		countyOfResidence: Yup.string().required("County Of Residence is required"),
		attendedEvent: Yup.string().required("Attended Event is required"),
	});

	const formik = useFormik({
		initialValues: {
			firstName: "",
			surname: "",
			gender: "",
			ageRange: "",
			emailAddress: "",
			phone: "",
			currentHighestNFQ: "",
			employmentStatus: "",
			memberCompany: "",
			occupationalCategory: "",
			unemploymentTime: "",
			countyOfResidence: "",
			attendedEvent: "",
		},
		validationSchema: validationSchema,
		onSubmit: (values) => {
			console.log(values);
		},
	});

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
				<form
					onSubmit={formik.handleSubmit}
					className="flex flex-col items-center">
					<div className="flex flex-row flex-wrap gap-x-8 text-[16px] leading-[19.53px] font-bold">
						<div className="mb-4">
							<label className="mb-1  text-[#3A3A3A] font-bold flex items-center leading-5">
								First Name
								<img src={mandatory} className="p-1" />
							</label>
							<Input
									label=""
								value={formik.values.firstName}
								onChange={formik.handleChange}
								name="firstName"
								onBlur={formik.handleBlur}
							/>
							{formik.touched.firstName && formik.errors.firstName ? (
								<ErrorMessage message={formik.errors.firstName} />
							) : null}
						</div>
						<div className="mb-4">
							<label className="mb-1 flex items-center">
								Surname
								<img src={mandatory} className="p-1" />
							</label>
							<Input
							label=""
								name="surname"
								value={formik.values.surname}
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
							/>
							{formik.touched.surname && formik.errors.surname ? (
								<ErrorMessage message={formik.errors.surname} />
							) : null}
						</div>
						<div className="mb-4">
							<label className="mb-1 flex items-center">
								Gender
								<img src={mandatory} className="p-1" />
							</label>
							<Input
							label=""
								name="gender"
								value={formik.values.gender}
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
							/>
							{formik.touched.gender && formik.errors.gender ? (
								<ErrorMessage message={formik.errors.gender} />
							) : null}
						</div>
						<div className="mb-4">
							<label className="mb-1 flex items-center">
								Age Range
								<img src={mandatory} className="p-1" />
							</label>
							<Input
							label=""
								name="ageRange"
								value={formik.values.ageRange}
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
							/>
							{formik.touched.ageRange && formik.errors.ageRange ? (
								<ErrorMessage message={formik.errors.ageRange} />
							) : null}
						</div>
						<div className="mb-4">
							<label className="mb-1 flex items-center">
								Email
								<img src={mandatory} className="p-1" />
							</label>
							<Input
									label=""
							
								name="emailAddress"
								value={formik.values.emailAddress}
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
							/>
							{formik.touched.emailAddress && formik.errors.emailAddress ? (
								<ErrorMessage message={formik.errors.emailAddress} />
							) : null}
						</div>
						<div className="mb-4">
							<label className="mb-1 flex items-center">
								Phone
								<img src={mandatory} className="p-1" />
							</label>
							<Input
							label=""
								name="phone"
								value={formik.values.phone}
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
							/>
							{formik.touched.phone && formik.errors.phone ? (
								<ErrorMessage message={formik.errors.phone} />
							) : null}
						</div>
						<div className="mb-4">
							<label className="mb-1 flex items-center">
								Current Highest NFQ
								<img src={mandatory} className="p-1" />
							</label>
							<Input
							label=""
								name="currentHighestNFQ"
								value={formik.values.currentHighestNFQ}
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
							/>
							{formik.touched.currentHighestNFQ &&
							formik.errors.currentHighestNFQ ? (
								<ErrorMessage message={formik.errors.currentHighestNFQ} />
							) : null}
						</div>
						<div className="mb-4">
							<label className="mb-1 flex items-center">
								Employment Status
							</label>
							<Input
							label=""
								name="employmentStatus"
								value={formik.values.employmentStatus}
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
							/>
						</div>
						<div className="mb-4">
							<label className="mb-1 flex items-center">Member Company</label>
							<Input
							label=""
								name="memberCompany"
								value={formik.values.memberCompany}
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
							/>
						</div>
						<div className="mb-4">
							<label className="mb-1 flex items-center">
								Occupational Category
							</label>
							<Input
							label=""
								name="occupationalCategory"
								value={formik.values.occupationalCategory}
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
							/>
						</div>
						<div className="mb-4">
							<label className="mb-1 flex items-center">
								Unemployment Time
							</label>
							<Input
							label=""
								name="unemploymentTime"
								value={formik.values.unemploymentTime}
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
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
								value={formik.values.countyOfResidence}
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
							/>
							{formik.touched.countyOfResidence &&
							formik.errors.countyOfResidence ? (
								<ErrorMessage message={formik.errors.countyOfResidence} />
							) : null}
						</div>
						<div className="mb-4">
							<label className="mb-1 flex items-center">Attended Event</label>
							<Input
							label=""
								name="attendedEvent"
								value={formik.values.attendedEvent}
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
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

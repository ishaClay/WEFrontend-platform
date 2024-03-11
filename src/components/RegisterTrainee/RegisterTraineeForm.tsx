import mandatory from "/assets/img/Mandatory.svg";
import * as Yup from "yup";
import { useFormik } from "formik";
import ErrorMessage from "../comman/Error.tsx/ErrorMessage";
import Input from "../comman/Input/Input";
import { PrimaryButton } from "../comman/Button/PrimaryButton";
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
					Don’t have an account? <a>Sign Up</a>
				</li>
			</ul>
			<div className="mx-6 mb-4 mt-[63px]">
				<h2 className="mb-[27px]">Register as</h2>
				<div className="flex justify-around border-gainsboro-100 border-solid border-[1px] rounded-[5px] w-[328px] h-[48px]">
					<button className="rounded-[5px]">Trainer</button>
					<button className="rounded-[5px]">company</button>
					<button className="rounded-[5px]">Trainee</button>
				</div>
			</div>
			<form
				onSubmit={formik.handleSubmit}
				className="p-8 flex flex-row flex-wrap gap-x-8">
				<div className="mb-4">
					<label className="mb-1 text-[14px] text-[#3A3A3A] font-bold flex items-center leading-5">
						First Name
						<img src={mandatory} className="p-1" />
					</label>
					<Input
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
					<label className="mb-1 text-[14px] text-[#3A3A3A] font-bold flex items-center leading-5">
						Surname
						<img src={mandatory} className="p-1" />
					</label>
					<Input
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
					<label className="mb-1 text-[14px] text-[#3A3A3A] font-bold flex items-center leading-5">
						Gender
						<img src={mandatory} className="p-1" />
					</label>
					<Input
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
					<label className="mb-1 text-[14px] text-[#3A3A3A] font-bold flex items-center leading-5">
						Age Range
						<img src={mandatory} className="p-1" />
					</label>
					<Input
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
					<label className="mb-1 text-[14px] text-[#3A3A3A] font-bold flex items-center leading-5">
						Email
						<img src={mandatory} className="p-1" />
					</label>
					<Input
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
					<label className="mb-1 text-[14px] text-[#3A3A3A] font-bold flex items-center leading-5">
						Phone
						<img src={mandatory} className="p-1" />
					</label>
					<Input
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
					<label className="mb-1 text-[14px] text-[#3A3A3A] font-bold flex items-center leading-5">
						Current Highest NFQ
						<img src={mandatory} className="p-1" />
					</label>
					<Input
						name="surname"
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
					<label className="mb-1 text-[14px] text-[#3A3A3A] font-bold flex items-center leading-5">
						Employment Status
					</label>
					<Input
						name="employmentStatus"
						value={formik.values.employmentStatus}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
					/>
				</div>
				<div className="mb-4">
					<label className="mb-1 text-[14px] text-[#3A3A3A] font-bold flex items-center leading-5">
						Member Company
					</label>
					<Input
						name="memberCompany"
						value={formik.values.memberCompany}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
					/>
				</div>
				<div className="mb-4">
					<label className="mb-1 text-[14px] text-[#3A3A3A] font-bold flex items-center leading-5">
						Occupational Category
					</label>
					<Input
						name="occupationalCategory"
						value={formik.values.occupationalCategory}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
					/>
				</div>
				<div className="mb-4">
					<label className="mb-1 text-[14px] text-[#3A3A3A] font-bold flex items-center leading-5">
						Unemployment Time
					</label>
					<Input
						name="unemploymentTime"
						value={formik.values.unemploymentTime}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
					/>
				</div>
				<div className="mb-4">
					<label className="mb-1 text-[14px] text-[#3A3A3A] font-bold flex items-center leading-5">
						County Of Residence
						<img src={mandatory} className="p-1" />
					</label>
					<Input
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
					<label className="mb-1 text-[14px] text-[#3A3A3A] font-bold flex items-center leading-5">
						Attended Event
					</label>
					<Input
						name="Attended Event"
						value={formik.values.attendedEvent}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
					/>
				</div>

				<button className="bg-primary-button rounded w-[370px] h-12 text-white">
					Submit
				</button>
			</form>
		</div>
	);
};

export default RegisterTraineeForm;

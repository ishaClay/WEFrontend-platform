import { PrimaryButton } from "@/components/comman/Button/CustomButton";
import ErrorMessage from "@/components/comman/Error/ErrorMessage";
import Loading from "@/components/comman/Error/Loading";
import Header from "@/components/Header";
import { InputWithLable } from "@/components/ui/inputwithlable";
import { useToast } from "@/components/ui/use-toast";
import { QUERY_KEYS } from "@/lib/constants";
import { getOneCompany, updateCompany } from "@/services/apiServices/company";
import { Company } from "@/types/Company";
import { ErrorType } from "@/types/Errors";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { z } from "zod";

function CompanyRegister() {
	const companyId = useSelector((state: any) => state.company.id);

	const [soleTrader, setSoleTrader] = useState("");

	const handleCheckboxChange = (value: string) => {
		setSoleTrader(value);
	};

	const { toast } = useToast();

	const queryClient = useQueryClient();

	const { data: companydetails } = useQuery({
		queryKey: [QUERY_KEYS.oneCompany, companyId],
		queryFn: () => getOneCompany(companyId as string),
		enabled: !!companyId,
	});

	const { mutate: updatecompany, isPending: updatePanding } = useMutation({
		mutationFn: (data: Company) => updateCompany(data),
		onSuccess: async () => {
			await queryClient.invalidateQueries({
				queryKey: [QUERY_KEYS.companyList],
			});

			toast({ title: "Company update Successfully" });
		},
		onError: (error: ErrorType) => {
			toast({
				variant: "destructive",
				title: error.data.message,
			});
		},
	});

	const schema = z.object({
		name: z.string().min(1, { message: "Name is required" }),
		address: z.string().min(1, { message: "Address is required" }),
		county: z.string().min(1, { message: "County is required" }),
		averageNumberOfEmployees: z
			.string()
			.min(1, { message: "Average Number Of Employees is required" }),
		sector: z.string().min(1, { message: "Sector is required" }),
		parentCompanyAddress: z
			.string()
			.min(1, { message: "Parent Company Address is required" }),
		parentCompanyName: z
			.string()
			.min(1, { message: "Parent Company Name is required" }),
		email: z.string().min(1, { message: "Email is required" }),
		parentCompanyCounty: z
			.string()
			.min(1, { message: "Parent Company County is required" }),
	});

	type ValidationSchema = z.infer<typeof schema>;
	const {
		register,
		handleSubmit,
		setValue,
		formState: { errors },
	} = useForm<ValidationSchema>({
		resolver: zodResolver(schema),
		mode: "all",
	});

	useEffect(() => {
		if (companydetails) {
			const data = companydetails.data.data.userDetails;
			Object.keys(data).forEach((key: any) => {
				setValue(key, data[key]);
			});
		}
	}, [companydetails]);

	const onSubmit: SubmitHandler<ValidationSchema> = async (data: any) => {
		const updatedData: any = {
			...data,
			soleTrader: soleTrader === "true" ? true : false,
		};
		updatecompany(updatedData);
	};

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

						<form onSubmit={handleSubmit(onSubmit)}>
							<div className="flex flex-wrap gap-x-[100px] sm:gap-x-[40px] gap-y-[30px] mt-[32px] justify-center">
								<div>
									<InputWithLable
										placeholder="Sample Consulting Company"
										label="Name"
										{...register("name")}
									/>
									{errors.name && (
										<ErrorMessage message={errors.name.message as string} />
									)}
								</div>
								<div>
									<InputWithLable
										placeholder="IT or University"
										className=""
										label="Address"
										{...register("address")}
									/>
									{errors.address && (
										<ErrorMessage message={errors.address.message as string} />
									)}
								</div>
								<div>
									<InputWithLable
										placeholder="Select your country"
										className=""
										label="County"
										{...register("county")}
									/>
									{errors.county && (
										<ErrorMessage message={errors.county.message as string} />
									)}
								</div>
								<div>
									<InputWithLable
										placeholder="Number of employees"
										className=""
										label="Average Number Of Employees"
										{...register("averageNumberOfEmployees")}
									/>
									{errors.averageNumberOfEmployees && (
										<ErrorMessage
											message={
												errors.averageNumberOfEmployees.message as string
											}
										/>
									)}
								</div>
								<div>
									<InputWithLable
										placeholder="Sector"
										className=""
										label="Sector"
										{...register("sector")}
									/>
									{errors.sector && (
										<ErrorMessage message={errors.sector.message as string} />
									)}
								</div>
								<div>
									<InputWithLable
										placeholder=""
										className=""
										label="Parent Company Address."
										{...register("parentCompanyAddress")}
									/>
									{errors.parentCompanyAddress && (
										<ErrorMessage
											message={errors.parentCompanyAddress.message as string}
										/>
									)}
								</div>

								<div>
									<InputWithLable
										placeholder="221 B Baker Street"
										className=""
										label="Parent Company Name"
										{...register("parentCompanyName")}
									/>
									{errors.parentCompanyName && (
										<ErrorMessage
											message={errors.parentCompanyName.message as string}
										/>
									)}
								</div>
								<div>
									<InputWithLable
										placeholder="United Kingdom"
										className=""
										label="Email Address"
										{...register("email")}
									/>
									{errors.email && (
										<ErrorMessage message={errors.email.message as string} />
									)}
								</div>
								<div>
									<InputWithLable
										placeholder="John"
										className=""
										label="Parent Company County"
										{...register("parentCompanyCounty")}
									/>
									{errors.parentCompanyCounty && (
										<ErrorMessage
											message={errors.parentCompanyCounty.message as string}
										/>
									)}
								</div>

								<div className="w-[274px]">
									<label className="block pb-[25px]">Sole Trader</label>

									<div className="flex items-center gap-[10px] h-[52px]">
										<input
											className="w-[24px] h-[24px] bf-[green] accent-[#00778B]"
											type="checkbox"
											checked={soleTrader == "true"}
											onChange={() => handleCheckboxChange("true")}
										/>
										<label>Yes</label>
										<input
											className="w-[24px] h-[24px] pl-[23px] accent-[#00778B]"
											type="checkbox"
											checked={soleTrader == "false"}
											onChange={() => handleCheckboxChange("false")}
										/>
										<label> No </label>
									</div>
								</div>
								<PrimaryButton
									type="submit"
									name="Submit"
									className="w-[370px] h-[48px]"
								/>
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
						</form>
					</div>
				</div>
				<Loading isLoading={updatePanding} />
			</div>
		</>
	);
}

export default CompanyRegister;

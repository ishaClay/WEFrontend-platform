import React, { useState } from "react";
import { FaEyeSlash } from "react-icons/fa6";
import { FaEye } from "react-icons/fa";

export interface InputProps
	extends React.InputHTMLAttributes<HTMLInputElement> {
	label?: string;
	validationHandler?: any;
}

const PasswordInput: React.FC<InputProps> = ({
	label,
	className,
	placeholder,
	validationHandler,
	...rest
}) => {
	const [showPassword, setShowPassword] = useState(false);

	const togglePasswordVisibility = () => {
		setShowPassword((prevState) => !prevState);
	};
	return (
		<div className="">
			<label className="">{label}</label>
			<div className="relative">
				<input
					type={showPassword ? "text" : "password"}
					className={`h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
					placeholder={placeholder}
					{...validationHandler}
					{...rest}
				/>
				<button
					type="button"
					onClick={togglePasswordVisibility}
					className="absolute inset-y-0 right-0 px-3 mt-2 flex items-center">
					{showPassword ? <FaEye /> : <FaEyeSlash />}
				</button>
			</div>
		</div>
	);
};

export default PasswordInput;

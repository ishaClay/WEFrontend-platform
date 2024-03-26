import React, { ChangeEvent } from "react";

interface InputProps {
	value: string;
	onChange: (event: ChangeEvent<HTMLInputElement>) => void;
	name: string;
	label: string;
	placeholder?: string;
	className?: string;
	onBlur: (event: ChangeEvent<HTMLInputElement>) => void;
}

const Input: React.FC<InputProps> = ({
	value,
	onChange,
	className,
	label,
	placeholder,
	...rest
}) => {
	return (
		<div>
			<label htmlFor={rest.name} className="block">
				{label}
			</label>
			<input
				value={value}
				onChange={onChange}
				placeholder={placeholder}
				className={`w-[280px] xl:w-[280px] h-[46px] border-[1.53px] border-solid border-[#DFDFDF] rounded-[4px] lg:w-[180px] sm:w-[180px] md:w-[170px] p-3 font-normal placeholder-[#AEACAC] ${className || ""}`}
				{...rest}
			/>
		</div>
	);
};

export default Input;

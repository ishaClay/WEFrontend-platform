import React, { ChangeEvent } from "react";

interface InputProps {
	value: string;
	onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const Input: React.FC<InputProps> = ({ value, onChange, ...rest }) => {
	return (
		<div>
			<input
				value={value}
				onChange={onChange}
				className="w-[280px] xl:w-[280px] h-[46px] border solid 1.5px lg:w-[180px] sm:w-[180px] md:w-[170px]"
				{...rest}
			/>
		</div>
	);
};

export default Input;

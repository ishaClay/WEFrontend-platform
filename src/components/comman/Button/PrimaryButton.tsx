import React from "react";
import Symbol from "../symbol/Symbol";

interface InputProps {
	name: string;
	className?: string;
	symbol?: React.ReactNode;
}

export const PrimaryButton: React.FC<InputProps> = ({ name, className }) => {
	return (
		<button className={`bg-primary-button top-94 left-823 rounded text-white  ${className}`}>
			{name}
		</button>
	);
};

export const SecondaryButton: React.FC<InputProps> = ({ name, symbol, className }) => {
	return (
		<button className={`bg-secondary-button top-94 left-823 rounded text-white ${className}`}>
			{name}
			{symbol && <span className="">{symbol}</span>}
		</button>
	);
};


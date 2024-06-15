import React from "react";

interface InputProps {
	name: string;
	className?: string;
	symbol?: React.ReactNode;
	onClick?: () => void;
	type?: "button" | "submit" | "reset" | undefined;
}

export const PrimaryButton: React.FC<InputProps> = ({ name, className, symbol, onClick }) => {
	return (
		<button className={`button-color top-94 left-823 secondary-text rounded hover:bg-[#489db0] ${className}`} onClick={onClick}>
			{symbol && <span className="">{symbol}</span>}
			{name}
		</button>
	);
};

export const SecondaryButton: React.FC<InputProps> = ({ name, symbol, className }) => {
	return (
		<button className={`button-color top-94 left-823 rounded secondary-text ${className}`}>
			{name}
			{symbol && <span className="">{symbol}</span>}
		</button>
	);
};


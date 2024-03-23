import React from "react";

interface messageProps {
	message: string;
}
const ErrorMessage: React.FC<messageProps> = ({ message }) => {
	return <p className="text-red-400 text-[14px] font-normal">{message}</p>;
};

export default ErrorMessage;

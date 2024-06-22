import React, { ReactElement } from "react";

interface InputProps {
  name: string | ReactElement;
  className?: string;
  symbol?: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset" | undefined;
  disabled?: boolean;
}

export const PrimaryButton: React.FC<InputProps> = ({
  name,
  className,
  symbol,
  onClick,
  disabled = false,
}) => {
  return (
    <button
      className={`button-color top-94 left-823 secondary-text rounded hover:bg-[#489db0] font-d-din-pro ${
        disabled ? "cursor-not-allowed opacity-80" : ""
      } ${className}`}
      disabled={disabled}
      onClick={onClick}
    >
      {symbol && <span className="">{symbol}</span>}
      {name}
    </button>
  );
};

export const SecondaryButton: React.FC<InputProps> = ({
  name,
  symbol,
  className,
}) => {
  return (
    <button
      className={`button-color top-94 left-823 rounded secondary-text font-['D-Din-pro-Medium'] ${className}`}
    >
      {name}
      {symbol && <span className="">{symbol}</span>}
    </button>
  );
};

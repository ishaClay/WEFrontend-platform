import { FC } from "react";

interface FormErrorProps {
  message: string | undefined;
}

const FormError: FC<FormErrorProps> = ({ message }) => {
  return (
    <span className={`font-primary font-calibri text-xs italic text-red-500`}>
      {message}
    </span>
  );
};

export default FormError;

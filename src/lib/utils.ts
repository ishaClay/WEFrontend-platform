import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const isLogin = () => {
  let user = localStorage.getItem("user");

  if (user) {
    return true;
  } else {
    return false;
  }
};
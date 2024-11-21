"use client";
import { ButtonProps } from "@/app/utils/types";
import React, { FC } from "react";
import { useFormStatus } from "react-dom";

const Button: FC<ButtonProps> = ({ name }) => {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex items-center justify-center w-full px-4 py-4 text-base font-semibold text-white transition-all duration-200 border border-transparent rounded-md bg-gradient-to-r from-fuchsia-600 to-blue-600 focus:outline-none hover:opacity-80 focus:opacity-80"
    >
      {pending ? "Please wait..." : name}
    </button>
  );
};

export default Button;

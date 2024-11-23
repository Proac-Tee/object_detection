"use client";
import { useAuth } from "@/app/context/AuthContext";
import { forgotPasswordSchema } from "@/app/lib/types";
import { ForgotPasswordErrors } from "@/app/utils/types";
import Link from "next/link";
import React, { useRef, useState } from "react";
import toast from "react-hot-toast";

const ForgotPassword = () => {
  const ref = useRef<HTMLFormElement>(null);

  const { resetPassword } = useAuth();

  const [formErrors, setFormErrors] = useState<ForgotPasswordErrors>({});
  const [sentMessage, setSentMessage] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");

  const formhandler = async (formData: FormData) => {
    try {
      // Convert FormData to a plain object for client side validation
      const data: { [key: string]: string } = {};
      formData.forEach((value, key) => {
        data[key] = value as string;
      });

      const result = forgotPasswordSchema.safeParse(data);
      if (!result.success) {
        const errorObj: { [key: string]: string } = {};

        result.error.issues.forEach((issue) => {
          const fieldName = issue.path[0];
          errorObj[fieldName] = issue.message;
        });

        setFormErrors(errorObj);

        return;
      } else {
        await resetPassword(result.data.forgot_email);

        setEmail(result.data.forgot_email);

        setSentMessage(true);
        toast.success("Message sent succesfully");

        ref.current?.reset();
      }
    } catch (error: any) {
      toast.error(error.message); // Displays an error
    }
  };

  return (
    <section className="px-[1.5rem] py-[2rem] rounded-[0.75rem] bg-white relative text-primary_black w-[100%]">
      <div className="w-[70vw] md:w-[435px] mx-auto">
        {sentMessage ? (
          <div className=" flex flex-col gap-[4px] justify-center items-center pb-[1.5rem]">
            <span className="w-[3rem] mb-[1rem] h-[3rem] rounded-full border-[4px] bg-[#00b4d833] border-[#00b4d8] flex justify-center items-center ">
              <svg
                width="22"
                height="16"
                viewBox="0 0 22 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2 8L8 14L20 2"
                  stroke="#00B4D8"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            <h3 className="text-[1.25rem] leading-[30px]  font-[600] ">
              Email Sent!
            </h3>
            <p className="text-[0.875rem font-[500] leading-[21px] text-center">
              We have just sent an email with a password reset link to
              <span className="ml-[0.3rem] text-[#e05a0f]">{email}</span>
            </p>
            <div className="flex w-[100%] mt-[1rem] gap-[1rem] justify-between items-center">
              {/* <button className="flex-1 rounded-[6.25rem] h-[3rem] flex justify-center items-center mt-[1rem] w-[100%] border-[#d0d5dd] p-[1rem] border-[1px] font-[600] ">
            Resend
          </button> */}
              <Link
                href={`/login`}
                className="flex-1 rounded-[6.25rem] h-[3rem] flex justify-center items-center mt-[1rem] w-[100%] bg-primary_color p-[1rem] text-white font-[600] "
              >
                Continue
              </Link>
            </div>
          </div>
        ) : (
          <>
            <div className=" flex flex-col gap-[4px] pb-[1.5rem]">
              <h3 className="text-[1.25rem] leading-[30px]  font-[600] ">
                Forgot your password?
              </h3>
              <p className="text-[0.875rem font-[300] leading-[21px]">
                Enter your email address to receive password reset options
              </p>
            </div>
            <form ref={ref} action={formhandler}>
              <div>
                <label
                  htmlFor="forgot_email"
                  className="font-[500] text-[0.75rem] "
                >
                  Email address
                </label>
                <input
                  type="email"
                  name="forgot_email"
                  id="forgot_email"
                  placeholder="Enter your email address"
                  className="border-[1px] focus:outline-none border-gray-200  text-black w-[100%] rounded-md h-[3rem] text-[1rem] placeholder:text-[0.875rem] p-[1rem]  "
                />
                <p className="text-[0.75rem] text-red-500 pt-[0.2rem] ">
                  {formErrors.email}
                </p>
              </div>
              <button className="mt-4 inline-flex items-center justify-center w-full px-4 py-4 text-base font-semibold text-white transition-all duration-200 border border-transparent rounded-md bg-gradient-to-r from-fuchsia-600 to-blue-600 focus:outline-none hover:opacity-80 focus:opacity-80">
                Submit
              </button>
            </form>
          </>
        )}
      </div>
    </section>
  );
};

export default ForgotPassword;

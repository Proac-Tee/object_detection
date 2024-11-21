"use client";
import { useAuth } from "@/app/context/AuthContext";
import Link from "next/link";
import React from "react";

const CallToAction = () => {
  const { currentUser } = useAuth();

  let displayName: string = "";

  if (currentUser && currentUser.displayName) {
    displayName = currentUser.displayName.split(" ")[0].trim() || "";
  }

  return (
    <section className="py-10 bg-gray-100 sm:py-16 lg:py-24">
      <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
        <div className="text-center">
          <h2 className="text-3xl font-[500] leading-tight text-black sm:text-4xl lg:text-5xl">
            Get full access to detection model
          </h2>
          <p className="mt-4 text-2xl font-[400]">80+ detection classes</p>

          <div className="flex flex-col items-center justify-center px-16 mt-8 space-y-4 sm:space-y-0 sm:space-x-4 sm:flex-row lg:mt-12 sm:px-0">
            <Link
              href={`/detection`}
              className="inline-flex items-center justify-center w-full px-8 py-4 text-base font-semibold text-white transition-all duration-200 bg-orange-600 border border-transparent rounded-md sm:w-auto hover:bg-orange-500"
            >
              Detection
            </Link>

            <Link
              href={`/terms-and-conditions`}
              className="inline-flex items-center justify-center w-full px-8 py-4 text-base font-semibold text-black transition-all duration-200 bg-transparent border border-black rounded-md sm:w-auto hover:bg-black hover:text-white focus:bg-black focus:text-white"
              role="button"
            >
              <svg
                className="w-5 h-5 mr-2 -ml-1"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                />
              </svg>
              Learn More
            </Link>
          </div>

          {currentUser ? (
            <p className="mt-6 text-base text-black">
              Welcome
              <span className="pl-2 text-orange-500 transition-all duration-200">
                {displayName}
              </span>
            </p>
          ) : (
            <p className="mt-6 text-base text-black">
              Already have an account?
              <Link
                href={`/login`}
                className="pl-2 text-orange-500 transition-all duration-200 hover:text-orange-700 hover:underline"
              >
                Log in
              </Link>
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default CallToAction;

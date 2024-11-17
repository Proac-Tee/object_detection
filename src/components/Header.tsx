"use client";
import Link from "next/link";
import React, { useState } from "react";

const Header = () => {
  const [dropDown, setDropDown] = useState<boolean>(false);

  const handleDropdown: () => void = () => {
    setDropDown((prev) => !prev);
  };

  return (
    <header className="pb-6 bg-white lg:pb-0 sticky top-0 z-50">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8 relative">
        <nav className="flex items-center justify-between h-16 lg:h-20">
          <div className="flex-shrink-0">
            <div className="relative inline-flex">
              <span className="absolute inset-x-0 bottom-0 border-b-[10px] sm:border-b-[5px] border-[#4ADE80]"></span>
              <Link href={`/`}>
                <p className="relative text-1rem sm:text-2xl font-[400] text-black">
                  Detection App
                </p>
              </Link>
            </div>
          </div>

          <button
            onClick={handleDropdown}
            type="button"
            className="inline-flex p-2 text-black transition-all duration-200 rounded-md md:hidden focus:bg-gray-100 hover:bg-gray-100"
          >
            <svg
              className="block w-6 h-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 8h16M4 16h16"
              />
            </svg>

            <svg
              className="hidden w-6 h-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          <div className="hidden md:flex lg:items-center md:ml-auto md:space-x-10">
            <Link
              href={`/detection`}
              className="text-base font-[400] text-black transition-all duration-200 hover:text-orange-500 focus:text-orange-500"
            >
              Detection
            </Link>

            <Link
              href={`/login`}
              className="text-base font-[400] text-black transition-all duration-200 hover:text-orange-500 focus:text-orange-500"
            >
              Login
            </Link>
          </div>

          <Link
            href={`/sign-up`}
            className="items-center justify-center hidden px-4 py-3 ml-10 text-base font-semibold text-black transition-all duration-200 rounded-md md:inline-flex bg-white border-[1px] border-gray-800 hover:border-orange-500"
            role="button"
          >
            Get started now
          </Link>
        </nav>

        <div className="absolute w-[100%] left-0 z-40">
          <nav
            className={`${
              dropDown ? "block" : "hidden"
            }  pt-4 pb-6 bg-white border border-gray-200 rounded-md shadow-md lg:hidden`}
          >
            <div className="flow-root">
              <div className="flex flex-col px-6 -my-2 space-y-1">
                <Link
                  href={`/detection`}
                  className="inline-flex py-2 text-base font-medium text-black transition-all duration-200 hover:text-orange-500"
                >
                  Detection
                </Link>

                <Link
                  href={`/login`}
                  className="inline-flex py-2 text-base font-medium text-black transition-all duration-200 hover:text-orange-500"
                >
                  Login
                </Link>
              </div>
            </div>

            <div className="px-6 mt-6">
              <Link
                href={`/sign-up`}
                className="inline-flex justify-center px-4 py-3 text-base font-semibold text-black transition-all duration-200   rounded-md tems-center bg-white border-[1px] border-gray-800 hover:border-orange-500 w-[100%]"
                role="button"
              >
                Get started now
              </Link>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;

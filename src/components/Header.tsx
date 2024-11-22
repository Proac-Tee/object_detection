"use client";
import { useAuth } from "@/app/context/AuthContext";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";

const Header = () => {
  const [dropDown, setDropDown] = useState<boolean>(false);
  const [openProfile, setOpenProfile] = useState<boolean>(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  const { currentUser, logout } = useAuth();

  const handleDropdown: () => void = () => {
    setDropDown((prev) => !prev);
  };

  let displayName: string = "";

  if (currentUser && currentUser.displayName) {
    displayName = currentUser.displayName.split(" ")[0].trim() || "";
  }

  const handleUserProfile: () => void = () => {
    setOpenProfile((prevOpenProfile) => !prevOpenProfile);
  };

  const closeProfile: () => void = () => {
    setOpenProfile(false);
  };

  const handleUserLogout = () => {
    logout();
    setOpenProfile(false);
    setDropDown(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      // Check if the click occurred outside of the profile dropdown
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenProfile(false);
      }
    };

    // Add event listener to handle clicks outside of the profile dropdown
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      // Cleanup: remove event listener when the component is unmounted
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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

            {!currentUser && (
              <Link
                href={`/login`}
                className="text-base font-[400] text-black transition-all duration-200 hover:text-orange-500 focus:text-orange-500"
              >
                Login
              </Link>
            )}
          </div>

          {!currentUser ? (
            <Link
              href={`/sign-up`}
              className="items-center justify-center hidden px-4 py-3 ml-10 text-base font-semibold text-black transition-all duration-200 rounded-md md:inline-flex bg-white border-[1px] border-gray-800 hover:border-orange-500"
              role="button"
            >
              Get started now
            </Link>
          ) : (
            <div
              ref={dropdownRef}
              className="relative items-center justify-center hidden px-4 py-3 ml-10 text-base font-semibold text-black transition-all duration-200 rounded-md md:inline-flex bg-white border-[1px] border-gray-800 hover:border-orange-500 max-w-[150px]"
            >
              <button
                onClick={handleUserProfile}
                className="flex justify-between gap-[0.3rem] truncate items-center font-[600] text-primary_black"
              >
                {displayName}
                <span>
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M3.32293 6.38394C3.5251 6.14807 3.88021 6.12075 4.11608 6.32293L9.00001 10.5092L13.8839 6.32293C14.1198 6.12075 14.4749 6.14807 14.6771 6.38394C14.8793 6.61981 14.852 6.97492 14.6161 7.17709L9.36608 11.6771C9.15543 11.8576 8.84459 11.8576 8.63394 11.6771L3.38394 7.17709C3.14807 6.97492 3.12075 6.61981 3.32293 6.38394Z"
                      fill="#363636"
                    />
                  </svg>
                </span>
              </button>
              <nav
                className={` bg-white absolute top-[4rem] right-[0rem] rounded-[0.5rem] min-h-[100px]  w-[240px] h-auto border-[1px] border-[#F2F4F7] ${
                  openProfile ? "block" : "hidden"
                } `}
              >
                <ul className="flex flex-col ">
                  <li>
                    <Link
                      onClick={closeProfile}
                      href={`/dashboard`}
                      className="h-[40px] cursor-pointer hover:bg-gray-100 transition-all duration-300 ease-in-out px-[1rem] py-[0.625rem] flex gap-[1rem] text-[0.875rem] items-center"
                    >
                      <span>
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M7.50008 14.3753C7.1549 14.3753 6.87508 14.6551 6.87508 15.0003C6.87508 15.3455 7.1549 15.6253 7.50008 15.6253H12.5001C12.8453 15.6253 13.1251 15.3455 13.1251 15.0003C13.1251 14.6551 12.8453 14.3753 12.5001 14.3753H7.50008Z"
                            fill="#363636"
                          />
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M10.0001 1.04199C9.40998 1.04199 8.87386 1.21101 8.29221 1.49386C7.72995 1.76728 7.08043 2.1704 6.26913 2.67393L4.54699 3.74274C3.77932 4.21917 3.16462 4.60066 2.69083 4.9635C2.20021 5.33923 1.82337 5.7219 1.55117 6.21918C1.27954 6.71543 1.15722 7.24344 1.09857 7.86758C1.04174 8.47244 1.04174 9.21209 1.04175 10.1397V11.4835C1.04174 13.0701 1.04173 14.3225 1.169 15.3017C1.29956 16.3061 1.57388 17.1171 2.19371 17.7582C2.8164 18.4023 3.6088 18.69 4.58975 18.8265C5.54049 18.9587 6.75472 18.9587 8.28495 18.9587H11.7152C13.2454 18.9587 14.4597 18.9587 15.4104 18.8265C16.3914 18.69 17.1838 18.4023 17.8064 17.7582C18.4263 17.1171 18.7006 16.3061 18.8312 15.3017C18.9584 14.3225 18.9584 13.0701 18.9584 11.4835V10.1397C18.9584 9.21211 18.9584 8.47243 18.9016 7.86758C18.8429 7.24344 18.7206 6.71543 18.449 6.21918C18.1768 5.7219 17.8 5.33923 17.3093 4.9635C16.8355 4.60066 16.2209 4.21917 15.4532 3.74275L13.731 2.67392C12.9197 2.1704 12.2702 1.76728 11.708 1.49386C11.1263 1.21101 10.5902 1.04199 10.0001 1.04199ZM6.89969 3.75376C7.74615 3.22842 8.34133 2.85994 8.83887 2.61799C9.3236 2.38226 9.6669 2.29199 10.0001 2.29199C10.3333 2.29199 10.6766 2.38226 11.1613 2.61799C11.6588 2.85994 12.254 3.22841 13.1005 3.75376L14.7671 4.78814C15.5678 5.28507 16.13 5.63478 16.5493 5.95591C16.9573 6.26836 17.192 6.52621 17.3525 6.81937C17.5135 7.11357 17.6076 7.45753 17.6571 7.98452C17.7078 8.52415 17.7084 9.20517 17.7084 10.1703V11.4378C17.7084 13.0803 17.7072 14.2513 17.5916 15.1406C17.4781 16.0139 17.2642 16.5206 16.9078 16.8894C16.5541 17.2552 16.0727 17.4723 15.2382 17.5884C14.3836 17.7072 13.2564 17.7087 11.6667 17.7087H8.33341C6.74381 17.7087 5.61661 17.7072 4.76193 17.5884C3.92746 17.4723 3.44603 17.2552 3.09241 16.8894C2.73592 16.5206 2.52209 16.0139 2.40857 15.1406C2.29299 14.2513 2.29175 13.0803 2.29175 11.4378V10.1703C2.29175 9.20517 2.29238 8.52415 2.34309 7.98452C2.39261 7.45753 2.48662 7.11357 2.64766 6.81937C2.80813 6.52621 3.04285 6.26836 3.45085 5.95591C3.87016 5.63478 4.43233 5.28507 5.23302 4.78814L6.89969 3.75376Z"
                            fill="#363636"
                          />
                        </svg>
                      </span>
                      Dashboard
                    </Link>
                  </li>
                  <li>
                    <button
                      onClick={handleUserLogout}
                      className="h-[40px] w-[100%] cursor-pointer rounded-b-[0.5rem]  hover:bg-gray-100 transition-all duration-300 ease-in-out px-[1rem] py-[0.625rem] flex gap-[1.3rem] text-[0.875rem] items-center"
                    >
                      <span>
                        <svg
                          width="18"
                          height="18"
                          viewBox="0 0 18 18"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M11.4545 0.0419926C10.3148 0.0419758 9.39619 0.0419622 8.67372 0.139096C7.92363 0.239943 7.29207 0.455688 6.79047 0.957285C6.35303 1.39473 6.132 1.93229 6.01597 2.56395C5.90322 3.17775 5.88165 3.92891 5.87664 4.83018C5.87472 5.17535 6.15298 5.45673 6.49815 5.45865C6.84332 5.46057 7.1247 5.18231 7.12662 4.83714C7.13169 3.92589 7.15536 3.27999 7.2454 2.78978C7.33216 2.31744 7.47148 2.04405 7.67436 1.84117C7.90499 1.61053 8.2288 1.46016 8.84028 1.37795C9.46974 1.29332 10.304 1.29199 11.5002 1.29199H12.3335C13.5297 1.29199 14.364 1.29332 14.9934 1.37795C15.6049 1.46016 15.9287 1.61053 16.1593 1.84117C16.39 2.0718 16.5403 2.39561 16.6226 3.00709C16.7072 3.63655 16.7085 4.47081 16.7085 5.66699V12.3337C16.7085 13.5298 16.7072 14.3641 16.6226 14.9936C16.5403 15.605 16.39 15.9289 16.1593 16.1595C15.9287 16.3901 15.6049 16.5405 14.9934 16.6227C14.364 16.7073 13.5297 16.7087 12.3335 16.7087H11.5002C10.304 16.7087 9.46974 16.7073 8.84028 16.6227C8.2288 16.5405 7.90499 16.3901 7.67436 16.1595C7.47148 15.9566 7.33216 15.6832 7.2454 15.2109C7.15536 14.7207 7.13169 14.0748 7.12662 13.1635C7.1247 12.8183 6.84332 12.5401 6.49815 12.542C6.15298 12.5439 5.87472 12.8253 5.87664 13.1705C5.88165 14.0717 5.90322 14.8229 6.01597 15.4367C6.132 16.0684 6.35303 16.6059 6.79047 17.0434C7.29207 17.545 7.92363 17.7607 8.67372 17.8616C9.39619 17.9587 10.3148 17.9587 11.4545 17.9587H12.3792C13.5189 17.9587 14.4375 17.9587 15.16 17.8616C15.9101 17.7607 16.5416 17.545 17.0432 17.0434C17.5448 16.5418 17.7606 15.9102 17.8614 15.1601C17.9585 14.4376 17.9585 13.519 17.9585 12.3794V5.62127C17.9585 4.48161 17.9585 3.56301 17.8614 2.84053C17.7606 2.09044 17.5448 1.45888 17.0432 0.957285C16.5416 0.455688 15.9101 0.239943 15.16 0.139096C14.4375 0.0419622 13.5189 0.0419758 12.3793 0.0419926H11.4545Z"
                            fill="#363636"
                          />
                          <path
                            d="M0.66748 8.37451C0.322302 8.37451 0.0424805 8.65434 0.0424805 8.99951C0.0424805 9.34469 0.322302 9.62451 0.66748 9.62451H10.6446L9.01074 11.025C8.74866 11.2496 8.71831 11.6442 8.94295 11.9063C9.16758 12.1683 9.56215 12.1987 9.82423 11.974L12.7409 9.47405C12.8794 9.35531 12.9591 9.18196 12.9591 8.99951C12.9591 8.81706 12.8794 8.64372 12.7409 8.52498L9.82423 6.02498C9.56215 5.80034 9.16758 5.83069 8.94295 6.09277C8.71831 6.35485 8.74866 6.74941 9.01074 6.97405L10.6446 8.37451H0.66748Z"
                            fill="#363636"
                          />
                        </svg>
                      </span>
                      Log out
                    </button>
                  </li>
                </ul>
              </nav>
            </div>
          )}
        </nav>

        <div className="absolute w-[100%] left-0 z-40">
          <nav
            className={`${
              dropDown ? "block" : "hidden"
            }  pt-4 pb-6 bg-white border border-gray-200 rounded-md shadow-md lg:hidden`}
          >
            <div className="flow-root">
              <div className="flex flex-col py-2 -my-2 space-y-1">
                <Link
                  href={`/detection`}
                  onClick={handleDropdown}
                  className="h-[40px] cursor-pointer hover:bg-gray-100 transition-all duration-300 ease-in-out px-[1rem] py-[0.625rem] flex gap-[1rem] text-[0.875rem] items-center"
                >
                  <span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="size-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6.429 9.75 2.25 12l4.179 2.25m0-4.5 5.571 3 5.571-3m-11.142 0L2.25 7.5 12 2.25l9.75 5.25-4.179 2.25m0 0L21.75 12l-4.179 2.25m0 0 4.179 2.25L12 21.75 2.25 16.5l4.179-2.25m11.142 0-5.571 3-5.571-3"
                      />
                    </svg>
                  </span>
                  Detection
                </Link>

                {!currentUser && (
                  <Link
                    href={`/login`}
                    onClick={handleDropdown}
                    className="h-[40px] cursor-pointer hover:bg-gray-100 transition-all duration-300 ease-in-out px-[1rem] py-[0.625rem] flex gap-[1rem] text-[0.875rem] items-center"
                  >
                    <span>
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 18 18"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M11.4545 0.0419926C10.3148 0.0419758 9.39619 0.0419622 8.67372 0.139096C7.92363 0.239943 7.29207 0.455688 6.79047 0.957285C6.35303 1.39473 6.132 1.93229 6.01597 2.56395C5.90322 3.17775 5.88165 3.92891 5.87664 4.83018C5.87472 5.17535 6.15298 5.45673 6.49815 5.45865C6.84332 5.46057 7.1247 5.18231 7.12662 4.83714C7.13169 3.92589 7.15536 3.27999 7.2454 2.78978C7.33216 2.31744 7.47148 2.04405 7.67436 1.84117C7.90499 1.61053 8.2288 1.46016 8.84028 1.37795C9.46974 1.29332 10.304 1.29199 11.5002 1.29199H12.3335C13.5297 1.29199 14.364 1.29332 14.9934 1.37795C15.6049 1.46016 15.9287 1.61053 16.1593 1.84117C16.39 2.0718 16.5403 2.39561 16.6226 3.00709C16.7072 3.63655 16.7085 4.47081 16.7085 5.66699V12.3337C16.7085 13.5298 16.7072 14.3641 16.6226 14.9936C16.5403 15.605 16.39 15.9289 16.1593 16.1595C15.9287 16.3901 15.6049 16.5405 14.9934 16.6227C14.364 16.7073 13.5297 16.7087 12.3335 16.7087H11.5002C10.304 16.7087 9.46974 16.7073 8.84028 16.6227C8.2288 16.5405 7.90499 16.3901 7.67436 16.1595C7.47148 15.9566 7.33216 15.6832 7.2454 15.2109C7.15536 14.7207 7.13169 14.0748 7.12662 13.1635C7.1247 12.8183 6.84332 12.5401 6.49815 12.542C6.15298 12.5439 5.87472 12.8253 5.87664 13.1705C5.88165 14.0717 5.90322 14.8229 6.01597 15.4367C6.132 16.0684 6.35303 16.6059 6.79047 17.0434C7.29207 17.545 7.92363 17.7607 8.67372 17.8616C9.39619 17.9587 10.3148 17.9587 11.4545 17.9587H12.3792C13.5189 17.9587 14.4375 17.9587 15.16 17.8616C15.9101 17.7607 16.5416 17.545 17.0432 17.0434C17.5448 16.5418 17.7606 15.9102 17.8614 15.1601C17.9585 14.4376 17.9585 13.519 17.9585 12.3794V5.62127C17.9585 4.48161 17.9585 3.56301 17.8614 2.84053C17.7606 2.09044 17.5448 1.45888 17.0432 0.957285C16.5416 0.455688 15.9101 0.239943 15.16 0.139096C14.4375 0.0419622 13.5189 0.0419758 12.3793 0.0419926H11.4545Z"
                          fill="#363636"
                        />
                        <path
                          d="M0.66748 8.37451C0.322302 8.37451 0.0424805 8.65434 0.0424805 8.99951C0.0424805 9.34469 0.322302 9.62451 0.66748 9.62451H10.6446L9.01074 11.025C8.74866 11.2496 8.71831 11.6442 8.94295 11.9063C9.16758 12.1683 9.56215 12.1987 9.82423 11.974L12.7409 9.47405C12.8794 9.35531 12.9591 9.18196 12.9591 8.99951C12.9591 8.81706 12.8794 8.64372 12.7409 8.52498L9.82423 6.02498C9.56215 5.80034 9.16758 5.83069 8.94295 6.09277C8.71831 6.35485 8.74866 6.74941 9.01074 6.97405L10.6446 8.37451H0.66748Z"
                          fill="#363636"
                        />
                      </svg>
                    </span>
                    Login
                  </Link>
                )}
              </div>
            </div>

            {!currentUser && (
              <div className="px-6 mt-6">
                <Link
                  href={`/sign-up`}
                  onClick={handleDropdown}
                  className="inline-flex justify-center px-4 py-3 text-base font-semibold text-black transition-all duration-200   rounded-md tems-center bg-white border-[1px] border-gray-800 hover:border-orange-500 w-[100%]"
                  role="button"
                >
                  Get started now
                </Link>
              </div>
            )}

            {currentUser && (
              <>
                <Link
                  onClick={handleDropdown}
                  href={`/dashboard`}
                  className="h-[40px] cursor-pointer hover:bg-gray-100 transition-all duration-300 ease-in-out px-[1rem] py-[0.625rem] flex gap-[1rem] text-[0.875rem] items-center"
                >
                  <span>
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M7.50008 14.3753C7.1549 14.3753 6.87508 14.6551 6.87508 15.0003C6.87508 15.3455 7.1549 15.6253 7.50008 15.6253H12.5001C12.8453 15.6253 13.1251 15.3455 13.1251 15.0003C13.1251 14.6551 12.8453 14.3753 12.5001 14.3753H7.50008Z"
                        fill="#363636"
                      />
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M10.0001 1.04199C9.40998 1.04199 8.87386 1.21101 8.29221 1.49386C7.72995 1.76728 7.08043 2.1704 6.26913 2.67393L4.54699 3.74274C3.77932 4.21917 3.16462 4.60066 2.69083 4.9635C2.20021 5.33923 1.82337 5.7219 1.55117 6.21918C1.27954 6.71543 1.15722 7.24344 1.09857 7.86758C1.04174 8.47244 1.04174 9.21209 1.04175 10.1397V11.4835C1.04174 13.0701 1.04173 14.3225 1.169 15.3017C1.29956 16.3061 1.57388 17.1171 2.19371 17.7582C2.8164 18.4023 3.6088 18.69 4.58975 18.8265C5.54049 18.9587 6.75472 18.9587 8.28495 18.9587H11.7152C13.2454 18.9587 14.4597 18.9587 15.4104 18.8265C16.3914 18.69 17.1838 18.4023 17.8064 17.7582C18.4263 17.1171 18.7006 16.3061 18.8312 15.3017C18.9584 14.3225 18.9584 13.0701 18.9584 11.4835V10.1397C18.9584 9.21211 18.9584 8.47243 18.9016 7.86758C18.8429 7.24344 18.7206 6.71543 18.449 6.21918C18.1768 5.7219 17.8 5.33923 17.3093 4.9635C16.8355 4.60066 16.2209 4.21917 15.4532 3.74275L13.731 2.67392C12.9197 2.1704 12.2702 1.76728 11.708 1.49386C11.1263 1.21101 10.5902 1.04199 10.0001 1.04199ZM6.89969 3.75376C7.74615 3.22842 8.34133 2.85994 8.83887 2.61799C9.3236 2.38226 9.6669 2.29199 10.0001 2.29199C10.3333 2.29199 10.6766 2.38226 11.1613 2.61799C11.6588 2.85994 12.254 3.22841 13.1005 3.75376L14.7671 4.78814C15.5678 5.28507 16.13 5.63478 16.5493 5.95591C16.9573 6.26836 17.192 6.52621 17.3525 6.81937C17.5135 7.11357 17.6076 7.45753 17.6571 7.98452C17.7078 8.52415 17.7084 9.20517 17.7084 10.1703V11.4378C17.7084 13.0803 17.7072 14.2513 17.5916 15.1406C17.4781 16.0139 17.2642 16.5206 16.9078 16.8894C16.5541 17.2552 16.0727 17.4723 15.2382 17.5884C14.3836 17.7072 13.2564 17.7087 11.6667 17.7087H8.33341C6.74381 17.7087 5.61661 17.7072 4.76193 17.5884C3.92746 17.4723 3.44603 17.2552 3.09241 16.8894C2.73592 16.5206 2.52209 16.0139 2.40857 15.1406C2.29299 14.2513 2.29175 13.0803 2.29175 11.4378V10.1703C2.29175 9.20517 2.29238 8.52415 2.34309 7.98452C2.39261 7.45753 2.48662 7.11357 2.64766 6.81937C2.80813 6.52621 3.04285 6.26836 3.45085 5.95591C3.87016 5.63478 4.43233 5.28507 5.23302 4.78814L6.89969 3.75376Z"
                        fill="#363636"
                      />
                    </svg>
                  </span>
                  Dashboard
                </Link>

                <button
                  onClick={handleUserLogout}
                  className="h-[40px] w-[100%] cursor-pointer rounded-b-[0.5rem]  hover:bg-gray-100 transition-all duration-300 ease-in-out px-[1rem] py-[0.625rem] flex gap-[1.3rem] text-[0.875rem] items-center"
                >
                  <span>
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 18 18"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M11.4545 0.0419926C10.3148 0.0419758 9.39619 0.0419622 8.67372 0.139096C7.92363 0.239943 7.29207 0.455688 6.79047 0.957285C6.35303 1.39473 6.132 1.93229 6.01597 2.56395C5.90322 3.17775 5.88165 3.92891 5.87664 4.83018C5.87472 5.17535 6.15298 5.45673 6.49815 5.45865C6.84332 5.46057 7.1247 5.18231 7.12662 4.83714C7.13169 3.92589 7.15536 3.27999 7.2454 2.78978C7.33216 2.31744 7.47148 2.04405 7.67436 1.84117C7.90499 1.61053 8.2288 1.46016 8.84028 1.37795C9.46974 1.29332 10.304 1.29199 11.5002 1.29199H12.3335C13.5297 1.29199 14.364 1.29332 14.9934 1.37795C15.6049 1.46016 15.9287 1.61053 16.1593 1.84117C16.39 2.0718 16.5403 2.39561 16.6226 3.00709C16.7072 3.63655 16.7085 4.47081 16.7085 5.66699V12.3337C16.7085 13.5298 16.7072 14.3641 16.6226 14.9936C16.5403 15.605 16.39 15.9289 16.1593 16.1595C15.9287 16.3901 15.6049 16.5405 14.9934 16.6227C14.364 16.7073 13.5297 16.7087 12.3335 16.7087H11.5002C10.304 16.7087 9.46974 16.7073 8.84028 16.6227C8.2288 16.5405 7.90499 16.3901 7.67436 16.1595C7.47148 15.9566 7.33216 15.6832 7.2454 15.2109C7.15536 14.7207 7.13169 14.0748 7.12662 13.1635C7.1247 12.8183 6.84332 12.5401 6.49815 12.542C6.15298 12.5439 5.87472 12.8253 5.87664 13.1705C5.88165 14.0717 5.90322 14.8229 6.01597 15.4367C6.132 16.0684 6.35303 16.6059 6.79047 17.0434C7.29207 17.545 7.92363 17.7607 8.67372 17.8616C9.39619 17.9587 10.3148 17.9587 11.4545 17.9587H12.3792C13.5189 17.9587 14.4375 17.9587 15.16 17.8616C15.9101 17.7607 16.5416 17.545 17.0432 17.0434C17.5448 16.5418 17.7606 15.9102 17.8614 15.1601C17.9585 14.4376 17.9585 13.519 17.9585 12.3794V5.62127C17.9585 4.48161 17.9585 3.56301 17.8614 2.84053C17.7606 2.09044 17.5448 1.45888 17.0432 0.957285C16.5416 0.455688 15.9101 0.239943 15.16 0.139096C14.4375 0.0419622 13.5189 0.0419758 12.3793 0.0419926H11.4545Z"
                        fill="#363636"
                      />
                      <path
                        d="M0.66748 8.37451C0.322302 8.37451 0.0424805 8.65434 0.0424805 8.99951C0.0424805 9.34469 0.322302 9.62451 0.66748 9.62451H10.6446L9.01074 11.025C8.74866 11.2496 8.71831 11.6442 8.94295 11.9063C9.16758 12.1683 9.56215 12.1987 9.82423 11.974L12.7409 9.47405C12.8794 9.35531 12.9591 9.18196 12.9591 8.99951C12.9591 8.81706 12.8794 8.64372 12.7409 8.52498L9.82423 6.02498C9.56215 5.80034 9.16758 5.83069 8.94295 6.09277C8.71831 6.35485 8.74866 6.74941 9.01074 6.97405L10.6446 8.37451H0.66748Z"
                        fill="#363636"
                      />
                    </svg>
                  </span>
                  Log out
                </button>
              </>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;

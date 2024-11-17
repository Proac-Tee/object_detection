import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <section className="py-12 bg-gradient-conic after:from-sky-200 after:via-blue-200">
      <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
        <div className="text-center xl:flex xl:items-center xl:justify-between xl:text-left">
          <div className="xl:flex xl:items-center xl:justify-start">
            Detection App
            <p className="mt-5 text-sm text-gray-800 xl:ml-6 xl:mt-0">
              &copy; Detection app {new Date().getFullYear()}. All Rights
              Reserved.
            </p>
          </div>

          <div className="items-center mt-8 xl:mt-0 xl:flex xl:justify-end xl:space-x-8">
            <ul className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 xl:justify-end">
              <li>
                <Link
                  href={`/detection`}
                  className="text-sm text-gray-800 transition-all duration-200 hover:text-orange-700"
                >
                  Detection
                </Link>
              </li>

              <li>
                <Link
                  href={`/privacy-policy`}
                  className="text-sm text-gray-800 transition-all duration-200 hover:text-orange-700"
                >
                  Privacy Policy
                </Link>
              </li>

              <li>
                <Link
                  href={`/terms-and-conditions`}
                  className="text-sm text-gray-800 transition-all duration-200 hover:text-orange-700"
                >
                  Terms & Conditions
                </Link>
              </li>
            </ul>

            <div className="w-full h-px mt-8 mb-5 xl:w-px xl:m-0 xl:h-6 bg-gray-50/20"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Footer;

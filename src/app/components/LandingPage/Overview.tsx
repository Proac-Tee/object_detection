import React from "react";

const Overview = () => {
  return (
    <section className="py-10 bg-white sm:py-16 lg:py-24">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="pb-[4rem]">
          <h2 className="font-[700] text-[1.5rem] md:text-[2.25rem] text-black text-left sm:text-center">
            About the Detection
          </h2>
          <p className="text-[1rem] leading-[28px] sm:leading-[24px]  font-[400] text-left sm:text-center text-gray-600">
            Explore how advanced object detection transforms real-world
            applications.
          </p>
        </div>

        <div className="grid grid-cols-1 text-center sm:grid-cols-2 gap-y-8 lg:grid-cols-4 sm:gap-12">
          <div>
            <div className="flex items-center justify-center w-20 h-20 mx-auto bg-blue-100 rounded-full">
              <svg
                className="text-blue-600 w-9 h-9"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4"
                />
              </svg>
            </div>
            <h3 className="mt-8 text-lg font-semibold text-black">
              Privacy-Aware
            </h3>
            <p className="mt-4 text-sm text-gray-600">
              Built with sensitivity to privacy, ensuring that only necessary
              information is captured and analyzed.
            </p>
          </div>

          <div>
            <div className="flex items-center justify-center w-20 h-20 mx-auto bg-orange-100 rounded-full">
              <svg
                className="text-orange-600 w-9 h-9"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            </div>
            <h3 className="mt-8 text-lg font-semibold text-black">
              Real-Time Detection
            </h3>
            <p className="mt-4 text-sm text-gray-600">
              Monitor focus areas with instant alerts for specific activities.
            </p>
          </div>

          <div>
            <div className="flex items-center justify-center w-20 h-20 mx-auto bg-green-100 rounded-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="text-green-600 w-9 h-9"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M7.5 3.75H6A2.25 2.25 0 0 0 3.75 6v1.5M16.5 3.75H18A2.25 2.25 0 0 1 20.25 6v1.5m0 9V18A2.25 2.25 0 0 1 18 20.25h-1.5m-9 0H6A2.25 2.25 0 0 1 3.75 18v-1.5M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                />
              </svg>
            </div>
            <h3 className="mt-8 text-lg font-semibold text-black">
              Anomaly Recognition
            </h3>
            <p className="mt-4 text-sm text-gray-600">
              Designed to detect unusual actions like students lingering in
              restricted areas or engaging in specific interactions.
            </p>
          </div>

          <div>
            <div className="flex items-center justify-center w-20 h-20 mx-auto bg-red-100 rounded-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="text-red-600 w-9 h-9"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 13.5V3.75m0 9.75a1.5 1.5 0 0 1 0 3m0-3a1.5 1.5 0 0 0 0 3m0 3.75V16.5m12-3V3.75m0 9.75a1.5 1.5 0 0 1 0 3m0-3a1.5 1.5 0 0 0 0 3m0 3.75V16.5m-6-9V3.75m0 3.75a1.5 1.5 0 0 1 0 3m0-3a1.5 1.5 0 0 0 0 3m0 9.75V10.5"
                />
              </svg>
            </div>
            <h3 className="mt-8 text-lg font-semibold text-black">
              Seamless Integration
            </h3>
            <p className="mt-4 text-sm text-gray-600">
              Compatible with existing camera systems, making it easy to deploy
              across various campus locations.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Overview;

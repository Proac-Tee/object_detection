import React from "react";
import Detection from "../../components/Detection";

const DetectionPage = () => {
  return (
    <section className="min-h-[90vh] w-[100%] h-[100%] px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
      <div className="w-[100%]  mb-[2rem]  mx-auto border-[1px] border-[#E3800B] bg-[#E3800B2B]  mt-[1rem] rounded-[0.5rem] py-[0.75rem] px-[1rem] md:px-[1.5rem]  md-w-[563px] flex justify-center items-center gap-[1rem] md:gap-[1.5rem]">
        <span>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 17.75C12.4142 17.75 12.75 17.4142 12.75 17V11C12.75 10.5858 12.4142 10.25 12 10.25C11.5858 10.25 11.25 10.5858 11.25 11V17C11.25 17.4142 11.5858 17.75 12 17.75Z"
              fill="#E3800B"
            />
            <path
              d="M12 7C12.5523 7 13 7.44772 13 8C13 8.55228 12.5523 9 12 9C11.4477 9 11 8.55228 11 8C11 7.44772 11.4477 7 12 7Z"
              fill="#E3800B"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M1.25 12C1.25 6.06294 6.06294 1.25 12 1.25C17.9371 1.25 22.75 6.06294 22.75 12C22.75 17.9371 17.9371 22.75 12 22.75C6.06294 22.75 1.25 17.9371 1.25 12ZM12 2.75C6.89137 2.75 2.75 6.89137 2.75 12C2.75 17.1086 6.89137 21.25 12 21.25C17.1086 21.25 21.25 17.1086 21.25 12C21.25 6.89137 17.1086 2.75 12 2.75Z"
              fill="#E3800B"
            />
          </svg>
        </span>

        <p className="font-[400] text-[0.875rem] leading-[21px]">
          Choose detection class from the dropdown to trigger anomaly
        </p>
      </div>
      <Detection />
    </section>
  );
};

export default DetectionPage;

"use client";
import React, { FC } from "react";
import { DashboardPaginationProps } from "./types";
import { useRouter, useSearchParams } from "next/navigation";

const DashobardPagination: FC<DashboardPaginationProps> = ({
  hasNextPage,
  hasPrevPage,
  totalEntries,
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const page = parseInt(searchParams.get("page") ?? "1");
  const per_page = 10;

  const totalPages = Math.ceil(totalEntries.length / per_page);

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString());

    if (page) {
      params.set("page", newPage.toString());
    } else {
      params.delete("page");
    }

    router.push(`/dashboard?${params.toString()}`);
  };

  // Function to generate pagination buttons with ellipses
  const renderPaginationButtons = () => {
    const visiblePages = 3;
    const halfVisiblePages = Math.floor(visiblePages / 2);

    const startPage = Math.max(1, page - halfVisiblePages);
    const endPage = Math.min(totalPages, startPage + visiblePages - 1);

    const pages = [];
    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          key={i}
          className={`text-[0.875rem]  flex justify-center items-center rounded-[6px]  w-[30px] h-[30px]  md:w-[38px] md:h-[38px]  ${
            page === i
              ? "bg-gradient-to-r from-fuchsia-600 to-blue-600 text-white "
              : "text-[#BCBCBC] border-[1px] border-[#BCBCBC]"
          }`}
          onClick={() => handlePageChange(i)}
        >
          {i}
        </button>
      );
    }

    const renderFirstEllipsis = startPage > 1;
    const renderLastEllipsis = endPage < totalPages;

    return (
      <>
        {renderFirstEllipsis && (
          <button
            key="first"
            className={`text-[0.875rem] flex justify-center items-center rounded-[6px] w-[30px] h-[30px]  md:w-[38px] md:h-[38px]  ${
              page === 1
                ? "bg-gradient-to-r from-fuchsia-600 to-blue-600 text-white"
                : "text-[#BCBCBC] border-[1px] border-[#BCBCBC]"
            }`}
            onClick={() => handlePageChange(1)}
          >
            1
          </button>
        )}
        {renderFirstEllipsis && <span>...</span>}
        {pages}
        {renderLastEllipsis && <span>...</span>}
        {renderLastEllipsis && (
          <button
            key="last"
            className={`text-[0.875rem] flex justify-center items-center rounded-[6px] w-[30px] h-[30px]  md:w-[38px] md:h-[38px]  ${
              page === totalPages
                ? "bg-primary_color text-white"
                : "text-[#BCBCBC] border-[1px] border-[#BCBCBC]"
            }`}
            onClick={() => handlePageChange(totalPages)}
          >
            {totalPages}
          </button>
        )}
      </>
    );
  };

  return (
    <section className="flex flex-col-reverse z-0 md:flex-row justify-between gap-[1rem] md:items-center">
      <div className="text-[0.875rem] flex  md:justify-center items-center gap-[1rem]">
        <div className="text-[#A6A8B1] flex justify-center items-center">
          <p className=" flex justify-center items-center bg-[#5E636614] h-[38px] w-[38px] rounded-[0.5rem]">
            10
          </p>
          <span className="pl-[0.5rem]">Items per page</span>
        </div>
        <p className="text-[#363636]">{`${page}-${totalPages - 1} of ${
          totalEntries.length
        } items`}</p>
      </div>
      <div className="flex flex-wrap text-[0.875rem] justify-center items-center gap-[1rem] text-gray-800 font-[500">
        <button
          className={`text-[1rem] ${!hasPrevPage ? "opacity-20" : ""}`}
          disabled={!hasPrevPage}
          onClick={() => handlePageChange(page - 1)}
        >
          Prev
        </button>

        <div className="flex gap-[1rem]">{renderPaginationButtons()}</div>

        <button
          className={`flex gap-[1rem] text-gray-800 font-[500]  ${
            !hasNextPage ? "opacity-20" : ""
          }`}
          disabled={!hasNextPage}
          onClick={() => handlePageChange(page + 1)}
        >
          Next
        </button>
      </div>
    </section>
  );
};
export default DashobardPagination;

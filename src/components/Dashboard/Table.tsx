"use client";
import React, { FC, useState } from "react";
import Dropdown from "./Dropdown";
import { useAuth } from "@/app/context/AuthContext";
import { getImageFiles } from "@/app/action/action";
import { DashboardProps, FilesArrayType } from "@/app/utils/types";
import { useQuery } from "@tanstack/react-query";
import Skeleton from "../../app/utils/Skeleton";
import Image from "next/image";
import loading_image from "../../app/assets/loading.svg";
import DashobardPagination from "@/app/utils/DashobardPagination";

const Table: FC<DashboardProps> = ({ page, per_page }) => {
  const {
    loading,
    currentUser,
    dropdownId,
    setDropdownId,
    setImageKey,
    setModalId,
    selectedItems,
    setSelectedItems,
  } = useAuth();

  let displayName: string = "";

  if (currentUser && currentUser.displayName) {
    displayName = currentUser.displayName.split(" ")[0].trim() || "";
  }

  // Fetch files data
  const {
    data: fetchedFile,
    isLoading: filesLoading,
    error: filesError,
  } = useQuery({
    queryKey: ["files"],
    queryFn: async () => {
      const response = await getImageFiles();
      const data: FilesArrayType = await response;

      return data.files; // Assume the response has a 'files' array
    },
  });

  const handleClick = (productId: string, key: string) => {
    setDropdownId((prevId) => (prevId === productId ? "" : productId));
    setImageKey((prev) => (prev === key ? "" : key));
  };

  // Calculate pagination values
  const start = (Number(page) - 1) * Number(per_page);
  const end = start + Number(per_page);

  const entries =
    fetchedFile &&
    fetchedFile
      .slice(start, end)
      .map((entry: { id: string; name: string; key: string }) => ({
        id: entry.id,
        name: entry.name,
        key: entry.key,
      }));

  const toggleSelectAll = () => {
    if (selectedItems.size === entries?.length) {
      setSelectedItems(new Set());
    } else {
      setSelectedItems(new Set(entries?.map((item) => item.key)));
    }
  };

  const toggleSelectItem = (key: string) => {
    const newSelectedItems = new Set(selectedItems);
    if (newSelectedItems.has(key)) {
      newSelectedItems.delete(key);
    } else {
      newSelectedItems.add(key);
    }
    setSelectedItems(newSelectedItems);
  };

  const handleBulkDelete = () => {
    // // Call your bulk delete function with the selected items
    // console.log("Delete these items: ", Array.from(selectedItems));

    setModalId("deleteBulkImage");
  };

  if (filesLoading)
    return (
      <div className="w-[100%] flex justify-center items-center max-w-[1440px] mx-auto p-4 ">
        <Image
          quality={100}
          sizes="(min-width: 768px) 100vw, 700px"
          src={loading_image}
          alt="hero image"
          className="w-8 h-8"
        />
      </div>
    );
  if (filesError) {
    return (
      <section className="w-full flex justify-center items-center min-h-[300px]">
        <div className="text-center text-red-500">
          <h2 className="text-2xl font-bold">Error</h2>
          <p className="text-lg">{filesError.message}</p>
        </div>
      </section>
    );
  }

  return (
    <>
      {fetchedFile && fetchedFile.length > 0 ? (
        <>
          <section className="py-[2rem]">
            {!loading && (
              <>
                {currentUser ? (
                  <h2 className="text-[#252C32] font-bold  text-[1.75rem] md:text-[2.25rem]">
                    Hi!, {displayName}
                  </h2>
                ) : (
                  <h2 className="text-[#252C32] font-bold  text-[1.75rem] md:text-[2.25rem]">
                    Dashboard
                  </h2>
                )}
              </>
            )}

            <section className="my-[2rem]">
              <section className="pb-[2rem]">
                {selectedItems && selectedItems.size > 0 && (
                  <button
                    className="h-[40px] px-[1rem] py-[0.625rem] flex gap-[1rem] items-center focus:outline-none border-none cursor-pointer hover:bg-gray-100 w-fit"
                    onClick={handleBulkDelete}
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
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M8.59049 1.87502H11.4084C11.5887 1.8749 11.7458 1.8748 11.8941 1.89849C12.4802 1.99208 12.9874 2.35762 13.2615 2.88403C13.3309 3.01727 13.3805 3.16634 13.4374 3.33745L13.5304 3.61654C13.5461 3.66378 13.5507 3.67715 13.5545 3.68768C13.7004 4.09111 14.0788 4.36383 14.5076 4.3747C14.5189 4.37498 14.5327 4.37503 14.5828 4.37503H17.0828C17.4279 4.37503 17.7078 4.65485 17.7078 5.00003C17.7078 5.34521 17.4279 5.62503 17.0828 5.62503H2.91602C2.57084 5.62503 2.29102 5.34521 2.29102 5.00003C2.29102 4.65485 2.57084 4.37503 2.91602 4.37503H5.41609C5.46612 4.37503 5.47993 4.37498 5.49121 4.3747C5.92009 4.36383 6.29844 4.09113 6.44437 3.6877C6.44821 3.67709 6.45262 3.66401 6.46844 3.61654L6.56145 3.33747C6.61836 3.16637 6.66795 3.01728 6.73734 2.88403C7.01146 2.35762 7.51862 1.99208 8.1047 1.89849C8.25306 1.8748 8.41016 1.8749 8.59049 1.87502ZM7.50614 4.37503C7.54907 4.29085 7.5871 4.20337 7.61983 4.1129C7.62977 4.08543 7.63951 4.05619 7.65203 4.01861L7.7352 3.7691C7.81118 3.54118 7.82867 3.49469 7.84602 3.46137C7.9374 3.2859 8.10645 3.16405 8.30181 3.13285C8.33892 3.12693 8.38854 3.12503 8.6288 3.12503H11.37C11.6103 3.12503 11.6599 3.12693 11.697 3.13285C11.8924 3.16405 12.0614 3.2859 12.1528 3.46137C12.1702 3.49469 12.1877 3.54117 12.2636 3.7691L12.3468 4.01846L12.379 4.11292C12.4117 4.20338 12.4498 4.29085 12.4927 4.37503H7.50614Z"
                          fill="#363636"
                        />
                        <path
                          d="M4.92859 7.04179C4.90563 6.69738 4.60781 6.43679 4.2634 6.45975C3.91899 6.48271 3.6584 6.78053 3.68136 7.12494L4.06757 12.9181C4.13881 13.987 4.19636 14.8505 4.33134 15.528C4.47167 16.2324 4.71036 16.8208 5.20335 17.2821C5.69635 17.7433 6.2993 17.9423 7.01151 18.0355C7.69653 18.1251 8.56189 18.125 9.63318 18.125H10.3656C11.4369 18.125 12.3023 18.1251 12.9873 18.0355C13.6995 17.9423 14.3025 17.7433 14.7955 17.2821C15.2885 16.8208 15.5272 16.2324 15.6675 15.528C15.8025 14.8505 15.86 13.987 15.9313 12.9181L16.3175 7.12494C16.3404 6.78053 16.0799 6.48271 15.7354 6.45975C15.391 6.43679 15.0932 6.69738 15.0702 7.04179L14.687 12.7911C14.6121 13.9143 14.5587 14.6958 14.4416 15.2838C14.328 15.8542 14.1694 16.1561 13.9415 16.3692C13.7137 16.5824 13.4019 16.7206 12.8252 16.796C12.2307 16.8738 11.4474 16.875 10.3217 16.875H9.67718C8.55148 16.875 7.76814 16.8738 7.17364 16.796C6.59697 16.7206 6.28518 16.5824 6.05733 16.3692C5.82949 16.1561 5.67088 15.8542 5.55725 15.2838C5.44011 14.6958 5.38675 13.9143 5.31187 12.7911L4.92859 7.04179Z"
                          fill="#363636"
                        />
                        <path
                          d="M7.8539 8.5448C8.19737 8.51045 8.50364 8.76104 8.53799 9.10451L8.95466 13.2712C8.989 13.6146 8.73841 13.9209 8.39495 13.9553C8.05148 13.9896 7.74521 13.739 7.71086 13.3956L7.29419 9.22889C7.25985 8.88542 7.51044 8.57915 7.8539 8.5448Z"
                          fill="#363636"
                        />
                        <path
                          d="M12.1449 8.5448C12.4884 8.57915 12.739 8.88542 12.7047 9.22889L12.288 13.3956C12.2536 13.739 11.9474 13.9896 11.6039 13.9553C11.2604 13.9209 11.0098 13.6146 11.0442 13.2712L11.4609 9.10451C11.4952 8.76104 11.8015 8.51045 12.1449 8.5448Z"
                          fill="#363636"
                        />
                      </svg>
                    </span>
                    Bulk Delete
                  </button>
                )}
              </section>
              <section className="overflow-x-scroll overflow-y-hidden no-scrollbar pb-[6rem] z-10 ">
                <div className="relative w-[1196px] md:w-[100%] h-auto border-[1px] mb-[1rem] z-10 border-[#1C1C1C1A] rounded-[0.75rem] ">
                  <div className="h-[40px] table-grid">
                    <p className="w-[100%] h-[100%] flex justify-center items-center">
                      <input
                        type="checkbox"
                        checked={selectedItems.size === entries?.length}
                        onChange={toggleSelectAll}
                      />
                    </p>

                    <p className="text-[#84919A] font-semibold text-[0.75rem] leading-[1rem] text-left p-[0.75rem]  truncate">
                      S/N
                    </p>
                    <p className="text-[#84919A] font-semibold text-[0.75rem] leading-[1rem] text-left p-[0.75rem]  truncate">
                      Image Name
                    </p>

                    <p className="text-[#84919A] font-semibold text-[0.75rem] leading-[1rem] text-left p-[0.75rem]  truncate">
                      Identifier
                    </p>
                    <p className="text-[#84919A] font-semibold text-[0.75rem] leading-[1rem] text-center p-[0.75rem]  truncate"></p>
                  </div>
                  {entries &&
                    entries.map((data, index) => (
                      <div key={data.id} className="relative">
                        <div className=" border-t-[1px] border-t-[#1C1C1C1A] table-grid">
                          <p className="w-[100%] h-[100%] flex justify-center items-center">
                            <input
                              type="checkbox"
                              checked={selectedItems.has(data.key)}
                              onChange={() => toggleSelectItem(data.key)}
                            />
                          </p>
                          <p className=" text-left p-[0.75rem] font-[400] text-[0.875rem] truncate">
                            {index + 1}
                          </p>
                          <p className=" text-left p-[0.75rem] font-[400] text-[0.875rem] truncate">
                            {data.name}
                          </p>

                          <p className="flex gap-[0.2rem]  items-center  text-left p-[0.75rem] font-[400] text-[0.875rem] truncate">
                            <span>
                              <svg
                                width="16"
                                height="17"
                                viewBox="0 0 16 17"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M13 2.5H11.5V2C11.5 1.86739 11.4473 1.74021 11.3536 1.64645C11.2598 1.55268 11.1326 1.5 11 1.5C10.8674 1.5 10.7402 1.55268 10.6464 1.64645C10.5527 1.74021 10.5 1.86739 10.5 2V2.5H5.5V2C5.5 1.86739 5.44732 1.74021 5.35355 1.64645C5.25979 1.55268 5.13261 1.5 5 1.5C4.86739 1.5 4.74021 1.55268 4.64645 1.64645C4.55268 1.74021 4.5 1.86739 4.5 2V2.5H3C2.73478 2.5 2.48043 2.60536 2.29289 2.79289C2.10536 2.98043 2 3.23478 2 3.5V13.5C2 13.7652 2.10536 14.0196 2.29289 14.2071C2.48043 14.3946 2.73478 14.5 3 14.5H13C13.2652 14.5 13.5196 14.3946 13.7071 14.2071C13.8946 14.0196 14 13.7652 14 13.5V3.5C14 3.23478 13.8946 2.98043 13.7071 2.79289C13.5196 2.60536 13.2652 2.5 13 2.5ZM4.5 3.5V4C4.5 4.13261 4.55268 4.25979 4.64645 4.35355C4.74021 4.44732 4.86739 4.5 5 4.5C5.13261 4.5 5.25979 4.44732 5.35355 4.35355C5.44732 4.25979 5.5 4.13261 5.5 4V3.5H10.5V4C10.5 4.13261 10.5527 4.25979 10.6464 4.35355C10.7402 4.44732 10.8674 4.5 11 4.5C11.1326 4.5 11.2598 4.44732 11.3536 4.35355C11.4473 4.25979 11.5 4.13261 11.5 4V3.5H13V5.5H3V3.5H4.5ZM13 13.5H3V6.5H13V13.5Z"
                                  fill="#1C1C1C"
                                />
                              </svg>
                            </span>
                            {data.id}
                          </p>
                          <div className="relative flex justify-end">
                            <button
                              onClick={(e) => {
                                handleClick(data.id, data.key);
                              }}
                              className="cursor-pointer text-center p-[0.75rem] font-[400] text-[0.875rem] truncate flex justify-center items-center"
                            >
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
                                  d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                                />
                              </svg>
                            </button>
                            {dropdownId === data.id && (
                              <Dropdown _id={data.id} key={data.key} />
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </section>
            </section>
            <DashobardPagination
              totalEntries={fetchedFile}
              hasNextPage={end < fetchedFile.length}
              hasPrevPage={start > 0}
            />
          </section>
        </>
      ) : (
        <Skeleton />
      )}
    </>
  );
};

export default Table;

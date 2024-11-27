"use client";
import React, { FC } from "react";
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
  const { loading, currentUser, dropdownId, setDropdownId, setImageKey } =
    useAuth();

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
              <section className="pb-[2rem]">{/* <AdminFilter /> */}</section>
              <section className="overflow-x-scroll overflow-y-hidden no-scrollbar pb-[6rem] z-10 ">
                <div className="relative w-[1196px] md:w-[100%] h-auto border-[1px] mb-[1rem] z-10 border-[#1C1C1C1A] rounded-[0.75rem] ">
                  <div className="h-[40px] table-grid">
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

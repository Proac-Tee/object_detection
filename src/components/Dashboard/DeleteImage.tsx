"use client";
import { deteteImageFile } from "@/app/action/action";
import { useAuth } from "@/app/context/AuthContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import React from "react";
import loading_image from "../../app/assets/loading.svg";
import toast from "react-hot-toast";

const DeleteImage = () => {
  const queryClient = useQueryClient();
  const { imageKey, setModalId, currentUser } = useAuth();

  let email: string = "";

  if (currentUser && currentUser.email) {
    email = currentUser.email;
  }

  const { mutate, isPending } = useMutation({
    mutationFn: async () => {
      if (!imageKey) {
        return;
      }
      const response = await deteteImageFile(imageKey, email);

      const data = await JSON.parse(JSON.stringify(response));

      if (data.success === false) {
        toast.error(data.message); // Set the errors in the state to be displayed in the form
        return;
      }
      return data;
    },
    onSuccess: (data) => {
      if (data) {
        alert(data.message);
        setModalId(``);
        queryClient.invalidateQueries({ queryKey: ["files"] });
      }
    },
    onError: (error: any) => {
      if (error.errors) {
        // Display field-specific errors

        const formattedErrors: { [key: string]: string } = error.errors;
        alert(JSON.stringify(formattedErrors)); // Format the errors for display
      } else {
        alert(
          error.message || "Failed to process the request. Please try again."
        );
      }
    },
  });

  const handleClose = () => {
    setModalId(``);
  };

  return (
    <>
      {isPending ? (
        <section className="bg-white w-[90vw] md:w-[400px]  rounded-[0.5rem] flex justify-center items-center flex-col py-[2rem] gap-[1.5rem]  px-[2.5rem] relative ">
          <div className="w-[100%] py-[2rem] flex justify-center items-center max-w-[1440px] mx-auto p-4 ">
            <Image
              quality={100}
              sizes="(min-width: 768px) 100vw, 700px"
              src={loading_image}
              alt="hero image"
              className="w-8 h-8"
            />
          </div>
        </section>
      ) : (
        <section className="bg-white w-[90vw] md:w-[400px]  rounded-[0.5rem] flex justify-center items-center flex-col py-[2rem] gap-[1.5rem]  px-[2.5rem] relative ">
          <div className="flex justify-center items-center flex-col gap-[0.25rem]">
            <span className="w-[3rem] h-[3rem] rounded-[28px] bg-[#FEE4E2] flex justify-center items-center">
              <svg
                width="20"
                height="22"
                viewBox="0 0 20 22"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M14 5V4.2C14 3.0799 14 2.51984 13.782 2.09202C13.5903 1.71569 13.2843 1.40973 12.908 1.21799C12.4802 1 11.9201 1 10.8 1H9.2C8.07989 1 7.51984 1 7.09202 1.21799C6.71569 1.40973 6.40973 1.71569 6.21799 2.09202C6 2.51984 6 3.0799 6 4.2V5M8 10.5V15.5M12 10.5V15.5M1 5H19M17 5V16.2C17 17.8802 17 18.7202 16.673 19.362C16.3854 19.9265 15.9265 20.3854 15.362 20.673C14.7202 21 13.8802 21 12.2 21H7.8C6.11984 21 5.27976 21 4.63803 20.673C4.07354 20.3854 3.6146 19.9265 3.32698 19.362C3 18.7202 3 17.8802 3 16.2V5"
                  stroke="#D92D20"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            <h3 className="font-[600] text-[1.125rem] leading-[21.13px]">
              Delete Image
            </h3>
            <p className="text-[0.875rem] leading-[20px] text-center ">
              Are you sure you want to delete this Image? This action cannot be
              undone.
            </p>
          </div>
          <div className="text-[0.875rem] flex justify-center items-center w-[100%] gap-[0.5rem]">
            <button
              onClick={handleClose}
              className="border-[1px] flex-1 flex justify-center items-center rounded-[6.25rem] h-[44px] border-[#D0D5DD] py-[0.875rem] px-[1.25rem] "
            >
              No, cancel
            </button>
            <button
              disabled={isPending}
              onClick={() => mutate()}
              className="border-[1px] flex-1 text-white bg-[#D92D20]  flex justify-center items-center rounded-[6.25rem] h-[44px] border-[#D0D5DD] py-[0.875rem] px-[1.25rem] "
            >
              Yes, Confirm
            </button>
          </div>
        </section>
      )}
    </>
  );
};

export default DeleteImage;

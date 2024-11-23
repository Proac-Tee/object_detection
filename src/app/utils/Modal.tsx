"use client";
import { useAuth } from "@/app/context/AuthContext";
import Image from "next/image";
import React from "react";
import DeleteImage from "../../components/Dashboard/DeleteImage";

const Modal = () => {
  const { imageKey, modalId, setModalId } = useAuth();

  const renderModalContent = () => {
    switch (modalId) {
      case "viewImage":
        return (
          <section className="w-[90vw] h-[640px] bg-white px-[1rem] py-[2rem] rounded-[1rem] relative">
            <h2 className="text-[#252C32] font-bold text-[1.15rem] md:text-[1.5rem]">
              Detected Anomaly
            </h2>
            <div className="relative w-full h-[500px] mt-4">
              <Image
                quality={100}
                sizes="(min-width: 768px) 100vw, 300px"
                src={`https://utfs.io/f/${imageKey}`}
                alt="Product image"
                fill
                className="object-cover rounded-lg"
              />
            </div>
          </section>
        );
      case "deleteImage":
        return <DeleteImage />;
      default:
        return null;
    }
  };

  const handleClose = () => {
    setModalId(``);
  };

  return (
    <>
      {modalId && (
        <dialog className="fixed left-0 top-0 w-full h-full bg-black bg-opacity-20 z-50 overflow-auto  flex justify-center items-center">
          <div className="m-auto py-[2rem] lg:p-8">
            <div className="relative flex flex-col items-center">
              <div className="top-[1rem] right-[2rem] text-primary_black z-10 absolute">
                <button type="button" onClick={handleClose}>
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M7 7L17 17M7 17L17 7"
                      stroke="#363636"
                      strokeWidth="2.66667"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>

              {renderModalContent()}
            </div>
          </div>
        </dialog>
      )}
    </>
  );
};

export default Modal;

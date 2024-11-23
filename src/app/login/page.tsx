import Login from "@/components/Auth/Login";
import Image from "next/image";
import React, { Suspense } from "react";
import loading_image from "../assets/loading.svg";

const LoginPage = () => {
  return (
    <Suspense
      fallback={
        <div className="w-[100%] bg-white flex justify-center items-center max-w-[1440px] mx-auto p-4 ">
          <Image
            quality={100}
            sizes="(min-width: 768px) 100vw, 700px"
            src={loading_image}
            alt="hero image"
            className="w-8 h-8"
          />
        </div>
      }
    >
      <LoginWrapper />
    </Suspense>
  );
};

// Extract the logic to avoid issues with Suspense wrapping
const LoginWrapper = () => {
  return (
    <section className="min-h-[90vh] w-[100%] h-[100%]">
      <Login />
    </section>
  );
};

export default LoginPage;

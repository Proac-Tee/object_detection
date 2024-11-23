"use client";

import Dashboard from "@/components/Dashboard/Dashboard";
import React, { Suspense } from "react";
import Protected from "../utils/Protected";
import Image from "next/image";
import loading_image from "../assets/loading.svg";

const DashboardPage = ({
  searchParams,
}: {
  searchParams: Record<string, string>;
}) => {
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
      <DashboardWrapper searchParams={searchParams} />
    </Suspense>
  );
};

// Extract the logic to avoid issues with Suspense wrapping
const DashboardWrapper = ({
  searchParams,
}: {
  searchParams: Record<string, string>;
}) => {
  const page = parseInt(searchParams["page"] ?? "1", 10); // Ensure page is a number
  const per_page = 10;

  return (
    <section className="min-h-[90vh] w-[100%] h-[100%] bg-white">
      <Dashboard page={page} per_page={per_page} />
    </section>
  );
};

export default Protected(DashboardPage);

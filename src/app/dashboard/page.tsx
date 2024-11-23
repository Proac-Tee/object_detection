"use client";

import Dashboard from "@/components/Dashboard/Dashboard";
import React from "react";
import Protected from "../utils/Protected";

const DashboardPage = ({
  searchParams,
}: {
  searchParams: Record<string, string>;
}) => {
  const page = searchParams["page"] ?? "1";
  const per_page = 10;
  return (
    <section className="min-h-[90vh] w-[100%] h-[100%] bg-white">
      <Dashboard page={page} per_page={per_page} />
    </section>
  );
};

export default Protected(DashboardPage);

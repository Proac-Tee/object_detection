import React, { FC } from "react";
import Table from "./Table";
import { DashboardProps } from "@/app/utils/types";

const Dashboard: FC<DashboardProps> = ({ page, per_page }) => {
  return (
    <section className=" px-4 mx-auto max-w-7xl sm:px-6 lg:px-8 ">
      <Table page={page} per_page={per_page} />
    </section>
  );
};

export default Dashboard;

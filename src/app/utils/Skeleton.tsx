import Image from "next/image";
import React from "react";
import dashboardSkeleton from "../../app/assets/dashboard_skeleton_image.png";

const Skeleton = () => {
  return (
    <section className="flex justify-center items-center min-h-[70vh] ">
      <div className="flex flex-col justify-center items-center">
        <div className="relative h-[142.37px] w-[183px] mb-[1.5rem]  ">
          <Image
            quality={100}
            fill
            sizes="(min-width: 768px) 100vw, 700px"
            src={dashboardSkeleton}
            priority
            alt="background image"
            className="rounded-[3rem]"
            style={{
              objectFit: "cover",
            }}
          />
        </div>
        <h5 className="font-[700] text-[1.5rem] text-center">No Data Found</h5>
        <p className="font-[400] text-[1rem] pb-[2.5rem] text-center">
          Manage all your data here.
        </p>
      </div>
    </section>
  );
};

export default Skeleton;

"use server";

import { UTApi } from "uploadthing/server";

const utapi = new UTApi();

export const getImageFiles = async () => {
  const response = await utapi.listFiles();
  // Ensure that the response is a plain object or array
  const plainResponse = JSON.parse(JSON.stringify(response)); // This removes any class instances or prototypes
  return plainResponse;
};

export const deteteImageFile = async (fileKey: string, email: string) => {
  try {
    if (
      email !== "queen.daisy1121@gmail.com" &&
      email !== "babatundetaiwo038@gmail.com"
    ) {
      return {
        success: false,
        message:
          "Unauthorized accesss, you do not have the required permission!",
      };
    }

    const response = await utapi.deleteFiles(fileKey);

    return {
      success: true,
      message: "Image deleted successfully!",
      data: JSON.parse(JSON.stringify(response)),
    };
  } catch (error) {
    return { success: false, message: "Failed to delete image", error };
  }
};

export const deteteBulkImageFile = async (fileKey: string[], email: string) => {
  try {
    if (
      email !== "queen.daisy1121@gmail.com" &&
      email !== "babatundetaiwo038@gmail.com"
    ) {
      return {
        success: false,
        message:
          "Unauthorized accesss, you do not have the required permission!",
      };
    }

    const response = await utapi.deleteFiles(fileKey);

    return {
      success: true,
      message: "Images deleted successfully!",
      data: JSON.parse(JSON.stringify(response)),
    };
  } catch (error) {
    return { success: false, message: "Failed to delete image", error };
  }
};

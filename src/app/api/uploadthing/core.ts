import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

// FileRouter for your app
export const ourFileRouter = {
  imageUploader: f({
    image: {
      maxFileSize: "4MB",
      maxFileCount: 1,
    },
  })
    .middleware(async () => {
      // No authentication check, directly return empty metadata
      return {};
    })
    .onUploadComplete(async ({ metadata, file }) => {
      // Handle the uploaded file
      console.log("File uploaded successfully!");
      console.log("File URL:", file.url);

      // Optionally return some metadata to the client
      return { success: true };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;

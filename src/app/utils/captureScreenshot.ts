import html2canvas from "html2canvas";
import { RefObject } from "react";

export const captureScreenshot = async (
  ToCaptureRef: RefObject<HTMLElement>
): Promise<string | null> => {
  if (!ToCaptureRef.current) {
    console.error("Reference to the element is null or undefined.");
    return null;
  }

  try {
    // Capture the element as a canvas
    const canvas = await html2canvas(ToCaptureRef.current, {
      useCORS: true,
    });

    // Convert the canvas to a data URL (base64 encoded PNG)
    const dataURL = canvas.toDataURL("image/png");
    return dataURL;
  } catch (error) {
    console.error("Failed to capture screenshot:", error);
    return null;
  }
};

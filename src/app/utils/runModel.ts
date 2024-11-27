import { InferenceSession, Tensor } from "onnxruntime-web";
import toast from "react-hot-toast";

export async function createModelCpu(url: string): Promise<InferenceSession> {
  return await InferenceSession.create(url, {
    executionProviders: ["wasm"],
    graphOptimizationLevel: "all",
  });
}

export async function runModel(
  model: InferenceSession,
  preprocessedData: Tensor
): Promise<[Tensor, number]> {
  try {
    const feeds: Record<string, Tensor> = {};
    feeds[model.inputNames[0]] = preprocessedData;
    const start = Date.now();
    const outputData = await model.run(feeds);
    const end = Date.now();
    const inferenceTime = end - start;
    const output = outputData[model.outputNames[0]];

    console.log(output);

    return [output, inferenceTime];
  } catch (e) {
    toast.error("Unknown Error occured");
    throw new Error();
  }
}

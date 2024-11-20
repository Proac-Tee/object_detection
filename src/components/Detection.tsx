"use client";
import { InferenceSession, Tensor } from "onnxruntime-web";
import { round } from "lodash";
import { useState } from "react";
import { useEffect } from "react";
import * as runModelUtils from "../app/utils/runModel";
import ObjectDetectionCamera from "./ObjectDetectionCamera";
import { yoloClasses } from "../app/utils/yolo_classes";
import ndarray from "ndarray";
import ops from "ndarray-ops";
import Loading from "./Loading";
import toast from "react-hot-toast";

// Define a type for the model resolution and name mapping
type ModelResolution = [number[], string];

const RES_TO_MODEL: ModelResolution[] = [
  [[256, 256], "yolov10n.onnx"],
  [[320, 320], "yolov7-tiny_320x320.onnx"],
  [[640, 640], "yolov7-tiny_640x640.onnx"],
];

const Detection = (props: any) => {
  const [modelResolution, setModelResolution] = useState<number[]>(
    RES_TO_MODEL[0][0]
  );
  const [modelName, setModelName] = useState<string>(RES_TO_MODEL[0][1]);
  const [session, setSession] = useState<InferenceSession | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const getSession = async () => {
      setLoading(true);
      try {
        const session = await runModelUtils.createModelCpu(
          `./model/${modelName}`
        );
        setSession(session);
        toast.success("Session created succesfully");
      } catch (error) {
        toast.error("Error creating model session");
      } finally {
        setLoading(false);
      }
    };
    getSession();
  }, [modelName, modelResolution]);

  const changeModelResolution = (width?: number, height?: number) => {
    if (width !== undefined && height !== undefined) {
      setModelResolution([width, height]);
      return;
    }
    const index = RES_TO_MODEL.findIndex((item) => item[0] === modelResolution);
    if (index === RES_TO_MODEL.length - 1) {
      setModelResolution(RES_TO_MODEL[0][0]);
      setModelName(RES_TO_MODEL[0][1]);
    } else {
      setModelResolution(RES_TO_MODEL[index + 1][0]);
      setModelName(RES_TO_MODEL[index + 1][1]);
    }
  };

  const resizeCanvasCtx = (
    ctx: CanvasRenderingContext2D,
    targetWidth: number,
    targetHeight: number,
    inPlace = false
  ) => {
    let canvas: HTMLCanvasElement;

    if (inPlace) {
      // Get the canvas element that the context is associated with
      canvas = ctx.canvas;

      // Set the canvas dimensions to the target width and height
      canvas.width = targetWidth;
      canvas.height = targetHeight;

      // Scale the context to the new dimensions
      ctx.scale(
        targetWidth / canvas.clientWidth,
        targetHeight / canvas.clientHeight
      );
    } else {
      // Create a new canvas element with the target dimensions
      canvas = document.createElement("canvas");
      canvas.width = targetWidth;
      canvas.height = targetHeight;

      // Draw the source canvas into the target canvas
      canvas
        .getContext("2d")!
        .drawImage(ctx.canvas, 0, 0, targetWidth, targetHeight);

      // Get a new rendering context for the new canvas
      ctx = canvas.getContext("2d")!;
    }

    return ctx;
  };

  const preprocess = (ctx: CanvasRenderingContext2D) => {
    const resizedCtx = resizeCanvasCtx(
      ctx,
      modelResolution[0],
      modelResolution[1]
    );

    const imageData = resizedCtx.getImageData(
      0,
      0,
      modelResolution[0],
      modelResolution[1]
    );
    const { data, width, height } = imageData;
    // data processing
    const dataTensor = ndarray(new Float32Array(data), [width, height, 4]);
    const dataProcessedTensor = ndarray(new Float32Array(width * height * 3), [
      1,
      3,
      width,
      height,
    ]);

    ops.assign(
      dataProcessedTensor.pick(0, 0, null, null),
      dataTensor.pick(null, null, 0)
    );
    ops.assign(
      dataProcessedTensor.pick(0, 1, null, null),
      dataTensor.pick(null, null, 1)
    );
    ops.assign(
      dataProcessedTensor.pick(0, 2, null, null),
      dataTensor.pick(null, null, 2)
    );

    ops.divseq(dataProcessedTensor, 255);

    const tensor = new Tensor("float32", new Float32Array(width * height * 3), [
      1,
      3,
      width,
      height,
    ]);

    (tensor.data as Float32Array).set(dataProcessedTensor.data);
    return tensor;
  };

  const conf2color = (conf: number) => {
    const r = Math.round(255 * (1 - conf));
    const g = Math.round(255 * conf);
    return `rgb(${r},${g},0)`;
  };

  const postprocess = async (
    tensor: Tensor,
    inferenceTime: number,
    ctx: CanvasRenderingContext2D,
    modelName: string
  ) => {
    // Output tensor of yolov7-tiny is [det_num, 7] while yolov10n is [1, all_boxes, 6]
    // Thus we need to handle them differently
    if (modelName === "yolov10n.onnx") {
      postprocessYolov10(ctx, modelResolution, tensor, conf2color);
      return;
    }
    postprocessYolov7(ctx, modelResolution, tensor, conf2color);
  };

  if (!session || loading) {
    return <Loading />;
  }

  return (
    <ObjectDetectionCamera
      width={props.width}
      height={props.height}
      preprocess={preprocess}
      postprocess={postprocess}
      // resizeCanvasCtx={resizeCanvasCtx}
      session={session}
      changeCurrentModelResolution={changeModelResolution}
      currentModelResolution={modelResolution}
      modelName={modelName}
    />
  );
};

export default Detection;
function postprocessYolov10(
  ctx: CanvasRenderingContext2D,
  modelResolution: number[],
  tensor: Tensor,
  conf2color: (conf: number) => string
) {
  const dx = ctx.canvas.width / modelResolution[0];
  const dy = ctx.canvas.height / modelResolution[1];

  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

  const alertClasses = ["cell phone", "car", "knife"];
  let x0, y0, x1, y1, cls_id;

  let score: string | number | bigint;

  for (let i = 0; i < tensor.dims[1]; i += 6) {
    [x0, y0, x1, y1, score, cls_id] = tensor.data.slice(i, i + 6);
    if (typeof score === "number" || typeof score === "bigint") {
      if (score < 0.25) {
        break;
      }
    }

    // scale to canvas size
    [x0, x1] = [x0, x1].map((x: any) => x * dx);
    [y0, y1] = [y0, y1].map((x: any) => x * dy);

    [x0, y0, x1, y1, cls_id] = [x0, y0, x1, y1, cls_id].map((x: any) =>
      round(x)
    );

    [score] = [score].map((x: any) => round(x * 100, 1));
    const label =
      yoloClasses[cls_id].toString()[0].toUpperCase() +
      yoloClasses[cls_id].toString().substring(1) +
      " " +
      score.toString() +
      "%";

    if (score >= 50 && alertClasses.includes(yoloClasses[cls_id])) {
      // Log the detected class and confidence score
      const word = `Detected an anormally of a ${yoloClasses[cls_id]} class with a confidence score of ${score}%`;
      readOutAlert(word);
    }

    const color = conf2color(score / 100);

    ctx.strokeStyle = color;
    ctx.lineWidth = 3;
    ctx.strokeRect(x0, y0, x1 - x0, y1 - y0);
    ctx.font = "20px Arial";
    ctx.fillStyle = color;
    ctx.fillText(label, x0, y0 - 5);

    // fillrect with transparent color
    ctx.fillStyle = color.replace(")", ", 0.2)").replace("rgb", "rgba");
    ctx.fillRect(x0, y0, x1 - x0, y1 - y0);
  }
}

function postprocessYolov7(
  ctx: CanvasRenderingContext2D,
  modelResolution: number[],
  tensor: Tensor,
  conf2color: (conf: number) => string
) {
  const dx = ctx.canvas.width / modelResolution[0];
  const dy = ctx.canvas.height / modelResolution[1];

  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

  const alertClasses = ["cell phone", "car", "knife"];
  let batch_id, x0, y0, x1, y1, cls_id, score;
  for (let i = 0; i < tensor.dims[0]; i++) {
    [batch_id, x0, y0, x1, y1, cls_id, score] = tensor.data.slice(
      i * 7,
      i * 7 + 7
    );

    // scale to canvas size
    [x0, x1] = [x0, x1].map((x: any) => x * dx);
    [y0, y1] = [y0, y1].map((x: any) => x * dy);

    [x0, y0, x1, y1, cls_id] = [x0, y0, x1, y1, cls_id].map((x: any) =>
      round(x)
    );

    [score] = [score].map((x: any) => round(x * 100, 1));
    const label =
      yoloClasses[cls_id].toString()[0].toUpperCase() +
      yoloClasses[cls_id].toString().substring(1) +
      " " +
      score.toString() +
      "%";

    if (score >= 50 && alertClasses.includes(yoloClasses[cls_id])) {
      // Log the detected class and confidence score
      const word = `Detected an anormally of a ${yoloClasses[cls_id]} class with a confidence score of ${score}%`;
      readOutAlert(word);
    }

    const color = conf2color(score / 100);

    ctx.strokeStyle = color;
    ctx.lineWidth = 3;
    ctx.strokeRect(x0, y0, x1 - x0, y1 - y0);
    ctx.font = "20px Arial";
    ctx.fillStyle = color;
    ctx.fillText(label, x0, y0 - 5);

    // fillrect with transparent color
    ctx.fillStyle = color.replace(")", ", 0.2)").replace("rgb", "rgba");
    ctx.fillRect(x0, y0, x1 - x0, y1 - y0);
  }
}

function readOutAlert(message: string) {
  const synth = window.speechSynthesis;
  if (synth.speaking) {
    synth.cancel();
  }

  const utterance = new SpeechSynthesisUtterance(message);
  synth.speak(utterance);
}

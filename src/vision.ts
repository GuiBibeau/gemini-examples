import { googleGenAi } from "./utils";
import fs from "fs/promises";

async function visionExample() {
  const visionModel = googleGenAi.getGenerativeModel({
    model: "gemini-2.0-pro-exp-02-05",
  });
  const imagePath = "image.png";

  const promptPart = {
    text: "what do you see in this image",
  };
  const imagePart = {
    inlineData: {
      data: await fs.readFile(imagePath, { encoding: "base64" }),
      mimeType: "image/png",
    },
  };

  const visionResult = await visionModel.generateContent([
    promptPart,
    imagePart,
  ]);
  const visionResponse = await visionResult.response;
  console.log("\n--- Vision ---");
  console.log(visionResponse.text());
}

visionExample();

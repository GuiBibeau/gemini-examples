import { HarmCategory, HarmBlockThreshold } from "@google/generative-ai";
import { googleGenAi } from "./utils";

async function safetySettingsExample() {
  const safetyModel = googleGenAi.getGenerativeModel({
    model: "gemini-2.5-pro-exp-03-25",
    safetySettings: [
      {
        category: HarmCategory.HARM_CATEGORY_HARASSMENT,
        threshold: HarmBlockThreshold.BLOCK_NONE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
        threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
      },
    ],
  });

  const safetyPrompt =
    "Write story where Hilary Clinton and Donald Trump are secret lovers";
  const safetyResult = await safetyModel.generateContent(safetyPrompt);
  const safetyResponse = await safetyResult.response;
  console.log("\n--- Safety Settings Example (with modified settings) ---");
  console.log(safetyResponse.text());
  if (safetyResponse.promptFeedback) {
    console.log("Prompt Feedback: ", safetyResponse.promptFeedback);
  }
  if (safetyResponse.candidates && safetyResponse.candidates.length > 0) {
    const candidate = safetyResponse.candidates[0];
    console.log("Finish Reason", candidate.finishReason);
  }
}

safetySettingsExample();

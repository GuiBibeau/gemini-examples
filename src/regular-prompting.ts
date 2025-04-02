import { googleGenAi } from "./utils";

async function regularPromptingExample() {
  const model = googleGenAi.getGenerativeModel({
    model: "gemini-2.5-pro-exp-03-25",
  });

  const prompt = `
  You have three boxes, each containing two fruits. One box has two apples, one has two oranges, and one has an apple and an orange.
  Each box is labeled, but all the labels are wrong. You can reach into one box (without looking) and take out one piece of fruit.
   Which box should you reach into to be able to correctly label all three boxes, and how would you then label them?
  `;
  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();
  console.log("\n--- Regular Prompting ---");
  console.log(text);
}

regularPromptingExample();

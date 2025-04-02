import { googleGenAi } from "./utils";
import { FunctionDeclarationSchema, SchemaType } from "@google/generative-ai";

// Define the JSON schema for the book structure
const bookSchema: FunctionDeclarationSchema = {
  type: SchemaType.OBJECT,
  properties: {
    title: { type: SchemaType.STRING },
    author: {
      type: SchemaType.OBJECT,
      properties: {
        firstName: { type: SchemaType.STRING },
        lastName: { type: SchemaType.STRING },
        birthYear: { type: SchemaType.NUMBER },
      },
      required: ["firstName", "lastName", "birthYear"],
    },
    publicationYear: { type: SchemaType.NUMBER },
    genres: {
      type: SchemaType.ARRAY,
      items: { type: SchemaType.STRING },
    },
    publisher: {
      type: SchemaType.OBJECT,
      properties: {
        name: { type: SchemaType.STRING },
        location: {
          type: SchemaType.OBJECT,
          properties: {
            city: { type: SchemaType.STRING },
            country: { type: SchemaType.STRING },
          },
          required: ["city", "country"],
        },
      },
      required: ["name", "location"],
    },
    reviews: {
      type: SchemaType.ARRAY,
      items: {
        type: SchemaType.OBJECT,
        properties: {
          reviewerName: { type: SchemaType.STRING },
          rating: {
            type: SchemaType.NUMBER,
          },
        },
        required: ["reviewerName", "rating"],
      },
    },
  },
  required: [
    "title",
    "author",
    "publicationYear",
    "genres",
    "publisher",
    "reviews",
  ],
};

async function structuredOutputExample() {
  // Get a generative model configured for function calling
  const structuredOutputModel = googleGenAi.getGenerativeModel({
    model: "gemini-2.5-pro-exp-03-25", // Or any model supporting function calling
    tools: [
      {
        functionDeclarations: [
          {
            name: "logBookInfo",
            description:
              "Logs information about a book based on the provided schema.",
            parameters: bookSchema,
          },
        ],
      },
    ],
    // Remove the generationConfig for JSON mode
    // generationConfig: {
    //   responseMimeType: "application/json",
    // },
  });

  // Keep the prompt describing the desired information
  const bookPrompt = `Generate information about a fictional book.
  Include fields for title, author (with nested fields for firstName, lastName, and birthYear),
  publicationYear, genres (an array of strings),
  publisher (with nested fields for name and location (with nested fields for city and country)),
  and reviews (an array of objects, each with a reviewerName and rating (on a scale of 1-5))`;

  // Send the prompt to the model
  const result = await structuredOutputModel.generateContent(bookPrompt);
  const response = result.response;

  console.log("\n--- Structured Output (Function Calling) ---");

  // Extract the structured data from the function call arguments
  try {
    const functionCalls = response.functionCalls();
    if (functionCalls && functionCalls.length > 0) {
      // The structured data is in the 'args' of the function call
      const bookInfo = functionCalls[0].args;
      console.log(JSON.stringify(bookInfo, null, 2)); // Pretty print the JSON object
    } else {
      console.log("No function call found in the response.");
      // Log the text content if no function call is present, for debugging
      console.log("Raw response text:", response.text());
    }
  } catch (error) {
    console.error("Error processing response:", error);
    console.log("Raw response text:", response.text()); // Log raw text on error
  }
}

structuredOutputExample(); // Call the new function

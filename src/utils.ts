import { GoogleGenerativeAI } from "@google/generative-ai";

export const googleGenAi = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY!);

export function bufferToStream(buffer: Buffer): Readable {
  const stream = new Readable();
  stream.push(buffer);
  stream.push(null); // Signal the end of the stream
  return stream;
}

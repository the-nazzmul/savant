import { GoogleGenerativeAI } from "@google/generative-ai";

export const maxDuration = 60;

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY!);
const model = genAI.getGenerativeModel({
  model: "text-embedding-004",
});

export async function getEmbeddings(text: string) {
  try {
    const response = await model.embedContent(text);
    const embedding = response.embedding;
    console.log("embedding from GEMINI:", embedding.values);
    return embedding.values;
  } catch (error) {
    console.log("error getting embeddings", error);
  }
}

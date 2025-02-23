import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { streamText, Message } from "ai";
import { NextResponse } from "next/server";

const google = createGoogleGenerativeAI({
  apiKey: process.env.GOOGLE_API_KEY,
});

export const runtime = "edge";

const model = google("gemini-2.0-flash-001");

export async function POST(req: Request) {
  const { messages } = await req.json();
  const stream = await streamText({
    model,
    messages,
    temperature: 0.7,
  });
  console.log(stream);
  return stream?.toDataStreamResponse();
}

import { getContext } from "@/lib/context";
import { db } from "@/lib/db";
import { chats, messages as _messages } from "@/lib/db/schema";
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { streamText, Message } from "ai";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

const google = createGoogleGenerativeAI({
  apiKey: process.env.GOOGLE_API_KEY,
});

const model = google("gemini-2.0-flash-001");

export async function POST(req: Request) {
  const { messages, chatId } = await req.json();
  const _chats = await db.select().from(chats).where(eq(chats.id, chatId));
  if (_chats.length !== 1) {
    return NextResponse.json({ error: "Chat not found" }, { status: 404 });
  }
  const fileKey = _chats[0].fileKey;
  const userQuery = messages[messages.length - 1];
  const context = await getContext(userQuery.content, fileKey);

  const prompt: Message = {
    id: Math.random().toString().slice(2, 15),
    role: "system",
    // content: `
    // 1. You are a very helpful assistant that answers user questions based on the context provided. You give users in depth answers and are very informative.
    // 2. You can also summarize the document and provide key takeaway.
    // 3. You can also teach the knowledge from the doc step by step.
    // 4. If it's a book, you can also help with the book summary and details. You can also go out of the context to explain a concept if necessary.
    // 5. If asked, you can also help with the resume being ATS friendly or not. You can suggest some improvements as well.

    // START CONTEXT
    // --------------------------------------------------
    // ${context}
    // --------------------------------------------------
    // END CONTEXT

    // Try to give you answer in the same language as the user's question. And also try to stick to the context as much as possible. But to explain certain topics, you can go out of the context.

    // Please format your responses using Markdown. Use bullet points where appropriate. and if there is a code snippet, please use triple backticks to format it.
    // `,
    content: `
    1. You are a very helpful assistant that helps user with ATS friendly resume.
    2. You can help with how ATS friendly the resume is, point out to the key improvement areas and suggest improvements.
    3. You will point out the percentage of ATS friendliness of the resume.
    4. You will also point out the key improvement areas and suggest improvements. You will pin-point to exactly what needs to be improved and how to improve it.

    START CONTEXT
    --------------------------------------------------
    ${context}
    --------------------------------------------------
    END CONTEXT

    Try to give you answer in the same language as the user's question. And also strictly stick to the context.

    Please format your responses using Markdown. Use bullet points where appropriate. Keep the answers short yet informative.
    `,
  };

  let geminiResponseChunk = "";
  let stream;

  try {
    stream = streamText({
      model,
      messages: [prompt, ...messages.filter((m: Message) => m.role === "user")],
      temperature: 0.7,
      onChunk: (chunk) => {
        if ("textDelta" in chunk.chunk) {
          geminiResponseChunk += chunk.chunk.textDelta;
        }
      },
      onFinish: async () => {
        await db.insert(_messages).values({
          chatId,
          content: geminiResponseChunk,
          role: "system",
        });
      },
    });
    await db.insert(_messages).values({
      chatId,
      content: userQuery.content,
      role: "user",
    });
  } catch (error) {
    console.error("Error initiating stream or saving user message:", error);
    return NextResponse.json({ error: "Failed to process chat request" });
  }

  console.log("STREAM DATA", stream);

  return stream?.toDataStreamResponse();
}

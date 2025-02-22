import { Pinecone } from "@pinecone-database/pinecone";
import { downloadFromS3 } from "./s3-server";
import { PDFLoader } from "langchain/document_loaders/fs/pdf";

const pinecone: Pinecone = new Pinecone({
  apiKey: process.env.PINECONE_API_KEY!,
});

export async function loadPdfIntoPinecone(fileKey: string) {
  // get file from s3
  console.log("downloading from s3");
  const file_name = await downloadFromS3(fileKey);
  if (!file_name) {
    throw new Error("could not download from s3");
  }
  const loader = new PDFLoader(file_name);
  const pages = await loader.load();
  return pages;
}

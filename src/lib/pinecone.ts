import { Pinecone, PineconeRecord } from "@pinecone-database/pinecone";
import { downloadFromS3 } from "./s3-server";
import { PDFLoader } from "langchain/document_loaders/fs/pdf";
import {
  Document,
  RecursiveCharacterTextSplitter,
} from "@pinecone-database/doc-splitter";
import { getEmbeddings } from "./embedding";
import md5 from "md5";
import { metadata } from "@/app/layout";
import { convertToAscii } from "./utils";

type PDFPage = {
  pageContent: string;
  metadata: {
    loc: { pageNumber: number };
  };
};

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
  const pages = (await loader.load()) as PDFPage[];

  // split the pages into chunks
  const documents = await Promise.all(pages.map(prepareDocument));

  //flatten the documents
  const flatDocuments = documents.flat();

  //vectorise and embed the chunks
  const vectors = [];
  for (const doc of flatDocuments) {
    console.log(`embedding ${doc.metadata.pageNumber}`);
    const vector = await embedChunks(doc);
    vectors.push(vector);
  }
  // upload to pinecone
  const pineconeIndex = pinecone.index(
    "savant-nazz",
    process.env.PINE_HOST_URL
  );

  console.log("intgrating with pinecone");
  const namespace = pineconeIndex.namespace(convertToAscii(fileKey));

  await pineconeIndex.upsert(vectors);

  return documents[0];
}

async function embedChunks(doc: Document) {
  try {
    const embeddings = await getEmbeddings(doc.pageContent);
    const hash = md5(doc.pageContent);
    return {
      id: hash,
      values: embeddings,
      metadata: {
        text: doc.metadata.text,
        pageNumber: doc.metadata.pageNumber,
      },
    } as PineconeRecord;
  } catch (error) {
    console.log("error embedding chunks", error);
    throw error;
  }
}

export const truncateStringByBytes = (str: string, bytes: number) => {
  const enc = new TextEncoder();
  return new TextDecoder("utf-8").decode(enc.encode(str).slice(0, bytes));
};

async function prepareDocument(page: PDFPage) {
  let { pageContent, metadata } = page;
  pageContent = pageContent.replace(/\n/g, "");
  // split the docs
  const splitter = new RecursiveCharacterTextSplitter();
  const docs = await splitter.splitDocuments([
    new Document({
      pageContent,
      metadata: {
        pageNumber: metadata.loc.pageNumber,
        text: truncateStringByBytes(pageContent, 36000),
      },
    }),
  ]);
  return docs;
}

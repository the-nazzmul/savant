# Savant 🧠📄

![Savant Banner](https://savant-nazz.s3.eu-north-1.amazonaws.com/uploads/logo.png)

**Savant** is an AI-powered PDF research assistant designed to help users extract meaningful insights from their PDFs. Built on **Google's Gemini AI**, Savant enables users to upload documents, chat with them, and even analyze resumes for **ATS compatibility**.

🔍 **No more scanning through pages manually!** With Savant, you get precise, AI-powered answers directly from your documents.

## 🚀 Features

✅ **AI-Powered PDF Chat** – Upload a PDF and chat with it anytime to extract key information.  
✅ **Smart Resume Analysis** – Check if a resume is **ATS-friendly** for job applications.  
✅ **Vectorized Search** – Uses Google's `text-embedding-004` model for accurate context-based responses.  
✅ **Cloud Storage** – Securely uploads PDFs to **AWS S3** for easy access.  
✅ **Powerful AI Retrieval** – Queries are vectorized, matched in **Pinecone DB**, and processed by **Gemini AI** for highly accurate answers.  
✅ **User Authentication** – Powered by **Clerk**, ensuring a secure and seamless login experience.  
✅ **Subscription System** – Monthly **Stripe** payments for continued access.

## 🛠️ Tech Stack

- **Frontend:** Next.js, React, TypeScript, TailwindCSS, Shadcn UI
- **Backend:** Google Gemini AI, Pinecone DB, NeonDB, LangChain, Drizzle ORM
- **Authentication:** Clerk
- **Cloud Storage:** AWS S3
- **Payments:** Stripe

## 🌐 Live Demo

[🔗 Visit Savant](https://savant-nazz.vercel.app)

## 📸 Screenshots

![Landing page Screenshot](https://savant-nazz.s3.eu-north-1.amazonaws.com/uploads/screenshot-1.png)  
_Landing page where after successful login, users can upload and interact with their PDFs._

![Chat Screenshot](https://savant-nazz.s3.eu-north-1.amazonaws.com/uploads/screenshot-2.png)  
_Example chat session with an uploaded PDF._

## 🏗️ Installation

### Prerequisites

- Node.js (v18 or later)
- NPM or Yarn
- An `.env` file with the required API keys (see below)

### 1️⃣ Clone the Repository

```sh
git clone https://github.com/yourusername/savant.git
cd savant
```

### 2️⃣ Install Dependencies

```sh
npm install
```

### 3️⃣ Set Up Environment Variables

Create a `.env.local` file in the root directory and add:

```sh
# Clerk
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/

# Database
DATABASE_URL=

# AWS S3
NEXT_PUBLIC_AWS_ACCESS_KEY_ID=
NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY=
NEXT_PUBLIC_S3_BUCKET_NAME=

# Pinecone
PINECONE_API_KEY=
PINECONE_INDEX_NAME=
PINE_HOST_URL=

# Gemini AI
GOOGLE_API_KEY=

# Stripe
STRIPE_API_KEY=
STRIPE_PUBLISHABLE_KEY=
STRIPE_WEBHOOK_SECRET=

NEXT_PUBLIC_URL=
```

### 4️⃣ Start the Development Server

```sh
npm run dev
```

This will start the app on `http://localhost:3000`.

## 🛠️ How It Works

1️⃣ **Upload a PDF** → Your document is securely stored in **AWS S3**.  
2️⃣ **Chunking & Vectorization** → The PDF is split into **smaller chunks** and embedded using **Google's text-embedding-004 model**.  
3️⃣ **Indexing in Pinecone** → The vectorized data is stored in **Pinecone DB** for efficient retrieval.  
4️⃣ **Query Processing** → When a user asks a question, the query is also vectorized and matched against stored data.  
5️⃣ **Gemini AI Response** → The most relevant data is sent to **Gemini AI**, ensuring **accurate, context-aware answers**.

## 🤝 Contributing

We welcome contributions! If you’d like to improve **Savant**, feel free to:

1. Fork the repository
2. Create a new branch
3. Submit a Pull Request

## 📜 License

This project is **open-source** under the **MIT License**.

---

💡 **Savant – The Future of AI-Driven Document Research!** 🚀

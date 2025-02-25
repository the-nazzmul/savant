import FileUpload from "@/components/file-upload";
import { SignOutButton } from "@/components/sign-out-button";
import SubscriptionButton from "@/components/subscription-btn";
import { Button } from "@/components/ui/button";
import { db } from "@/lib/db";
import { chats } from "@/lib/db/schema";
import { checkSubscription } from "@/lib/subcription";
import { auth } from "@clerk/nextjs/server";
import { desc, eq } from "drizzle-orm";
import { LogInIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";

export default async function Home() {
  const { userId } = await auth();
  const isSignedIn = !!userId;
  const isPro = await checkSubscription();
  const lastChat = userId
    ? await db
        .select()
        .from(chats)
        .where(eq(chats.userId, userId))
        .orderBy(desc(chats.createdAt))
        .limit(1)
    : null;
  return (
    <div className="min-h-screen w-screen bg-gradient-to-r from-neutral-600 via-neutral-400 to-neutral-600 relative flex flex-col items-center justify-center antialiased">
      <div className="max-w-2xl mx-auto p-4 flex flex-col items-center gap-8">
        <Image src="/logo.png" alt="logo" width={200} height={200} />
        <h1 className="relative z-10 text-4xl md:text-5xl  bg-clip-text text-transparent bg-gradient-to-r from-rose-600 via-rose-500 to-rose-600  text-center font-sans font-bold">
          Your AI-powered PDF research assistant.
        </h1>
      </div>
      <div className="flex flex-col mt-2">
        {isSignedIn && (
          <div className=" flex items-center justify-center gap-2">
            {lastChat && (
              <div className="flex justify-center gap-4 my-2">
                <Link href={lastChat ? `/chat/${lastChat?.[0]?.id}` : "/"}>
                  <Button>Go to Chats</Button>
                </Link>
              </div>
            )}
            <div className="ml-2">
              <SubscriptionButton isPro={isPro} />
            </div>
          </div>
        )}
        <p className="text-center text-neutral-100 mt-2 px-8 max-w-xl">
          Join millions of students, researchers and professionals to instantly
          answer questions and understand research with AI
        </p>
        <div className="w-full mt-4 flex flex-col items-center">
          {isSignedIn ? (
            <>
              <FileUpload />
              <div className="h-4" />
              <SignOutButton />
            </>
          ) : (
            <Link href="/sign-in">
              <Button>
                Login to get started
                <LogInIcon className="ml-2 size-4" />
              </Button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

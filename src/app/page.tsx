import FileUpload from "@/components/file-upload";
import { RainbowButton } from "@/components/magicui/rainbow-button";
import { BackgroundBeams } from "@/components/ui/background-beams";
import { auth } from "@clerk/nextjs/server";
import { LogInIcon } from "lucide-react";
import Link from "next/link";

export default async function Home() {
  const { userId } = await auth();
  const isSignedIn = !!userId;
  return (
    <div className="min-h-screen w-screen bg-neutral-950 relative flex flex-col items-center justify-center antialiased">
      <div className="max-w-2xl mx-auto p-4">
        <h1 className="relative z-10 text-4xl md:text-7xl  bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600  text-center font-sans font-bold">
          Chat with any PDF
        </h1>
      </div>
      <div className="flex flex-col mt-2">
        {isSignedIn && (
          <div className="flex justify-center my-2">
            <Link href="/">
              <RainbowButton>Go to Chats</RainbowButton>
            </Link>
          </div>
        )}
        <p className="text-center text-neutral-400 mt-2 px-8 max-w-xl">
          Join million of students, researchers and professionals to instantly
          answer questions and understand research with AI
        </p>
        <div className="w-full mt-4 flex justify-center">
          {isSignedIn ? (
            <FileUpload />
          ) : (
            <Link href="/sign-in">
              <RainbowButton>
                Login to get started
                <LogInIcon className="ml-2 size-4" />
              </RainbowButton>
            </Link>
          )}
        </div>
      </div>

      <BackgroundBeams />
    </div>
  );
}

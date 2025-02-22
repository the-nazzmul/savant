import { auth } from "@clerk/nextjs/server";
import Image from "next/image";
import Link from "next/link";
import { RainbowButton } from "./magicui/rainbow-button";
import { UserButton } from "@clerk/nextjs";

const Navbar = async () => {
  const { userId } = await auth();
  const isSignedIn = !!userId;
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-transparent w-full container mx-auto p-2">
      <div className="flex justify-between items-center h-16">
        <Image src="/logo.png" alt="logo" width={40} height={40} />
        <div className="flex items-center gap-4">
          {isSignedIn ? (
            <div className="flex items-center gap-4">
              <Link href="/dashboard" className="hidden sm:block">
                <RainbowButton>Go to Chats</RainbowButton>
              </Link>
              <UserButton
                appearance={{ elements: { userButtonAvatarBox: "w-11 h-11" } }}
              />
            </div>
          ) : (
            <Link href="/sign-in">
              <RainbowButton>Get Started</RainbowButton>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

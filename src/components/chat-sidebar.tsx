"use client";

import { DrizzleChat } from "@/lib/db/schema";
import { cn } from "@/lib/utils";
import axios from "axios";
import { MessageCircleIcon, PlusCircleIcon } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { SignOutButton } from "./sign-out-button";
import { Button } from "./ui/button";

type Props = {
  chats: DrizzleChat[];
  chatId: number;
};

const ChatSidebar = ({ chats, chatId }: Props) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubscription = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get("/api/stripe");
      window.location.href = response.data.url;
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full h-screen p-4 text-gray-200 bg-gray-900 flex flex-col justify-between">
      <div>
        <Link href="/">
          <Button className="w-full border-dashed border-white border">
            <PlusCircleIcon className="size-4 mr-2" />
            New Chat
          </Button>
        </Link>
        <div className="flex flex-col gap-2 mt-4 overflow-scroll">
          {chats.map((chat) => (
            <Link key={chat.id} href={`/chat/${chat.id}`}>
              <div
                className={cn(
                  "rounded-lg p-3 text-neutral-300 flex items-center",
                  {
                    "bg-neutral-200 text-primary": chat.id === chatId,
                    "hover:text-primary": chat.id !== chatId,
                  }
                )}
              >
                <MessageCircleIcon className="mr-2" />
                <p className="w-full overflow-hidden text-sm truncate whitespace-nowrap text-ellipsis">
                  {chat.pdfName}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <div className="bottom-4 left-4">
        <SignOutButton fullWidth />
        <Button
          className="mt-2 w-full"
          disabled={isLoading}
          onClick={handleSubscription}
        >
          Upgrade to pro
        </Button>
      </div>
    </div>
  );
};

export default ChatSidebar;

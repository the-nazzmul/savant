"use client";

import { SendIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useChat } from "@ai-sdk/react";
import { Message } from "ai";
import MessageList from "./message-list";
import { useEffect, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

type Props = { chatId: number };

const ChatComponent = ({ chatId }: Props) => {
  const { data } = useQuery({
    queryKey: ["chat", chatId],
    queryFn: async () => {
      const response = await axios.post<Message[]>("/api/get-messages", {
        chatId,
      });
      return response.data;
    },
  });

  const { input, handleInputChange, handleSubmit, messages } = useChat({
    api: "/api/chat",
    body: {
      chatId,
    },
    initialMessages: data || [],
  });
  const messageContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const messageContainer = messageContainerRef.current;
    if (messageContainer) {
      messageContainer.scrollTo({
        top: messageContainer.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages]);

  return (
    <div
      className="relative h-screen flex flex-col bg-neutral-200"
      id="message-container"
    >
      <div className="sticky top-0 inset-x-0 p-2 h-fit bg-neutral-200  shadow-md">
        <h3 className="text-xl font-bold text-center">Chat</h3>
      </div>
      {/* message list */}
      <div ref={messageContainerRef} className="overflow-y-auto flex-grow py-2">
        {/* message list */}
        <MessageList messages={messages} />
      </div>
      <form
        onSubmit={handleSubmit}
        className="sticky bottom-0 inset-x-0 p-2  bg-neutral-400"
      >
        <div className="flex gap-1 items-center">
          <Input
            value={input}
            onChange={handleInputChange}
            className="w-full bg-white"
            placeholder="Ask any question..."
          />
          <Button size="sm">
            <SendIcon className="h-4 w-4" />
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ChatComponent;

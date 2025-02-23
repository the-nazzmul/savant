"use client";

import { SendIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useChat } from "@ai-sdk/react";
import MessageList from "./message-list";

type Props = {};

const ChatComponent = (props: Props) => {
  const { input, handleInputChange, handleSubmit, messages } = useChat({
    api: "/api/chat",
  });
  return (
    <div className="relative max-h-screen overflow-scroll">
      <div className="sticky top-0 inset-x-0 p-2 h-fit">
        <h3 className="text-xl font-bold">Chat</h3>
      </div>
      {/* message list */}
      <MessageList messages={messages} />
      <form
        onSubmit={handleSubmit}
        className="sticky bottom-0 inset-x-0 p-2 mt-2 bg-white"
      >
        <div className="flex gap-1 items-center">
          <Input
            value={input}
            onChange={handleInputChange}
            className="w-full"
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

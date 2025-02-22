"use client";

import { SendIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useChat } from "@ai-sdk/react";

type Props = {};

const ChatComponent = (props: Props) => {
  const { input, handleInputChange, handleSubmit, messages } = useChat();
  return (
    <div className="relative max-h-screen overflow-scroll">
      <div className="sticky top-0 inset-x-0 p-2 h-fit">
        <h3 className="text-xl font-bold">Chat</h3>
      </div>
      {/* message list */}
      <form className="sticky bottom-0 inset-x-0 px-2 py-4">
        <Input
          value={input}
          onChange={handleInputChange}
          className="w-full"
          placeholder="Ask any question..."
        />
        <Button>
          <SendIcon className="h-4 w-4" />
        </Button>
      </form>
    </div>
  );
};

export default ChatComponent;

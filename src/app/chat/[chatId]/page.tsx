import ChatComponent from "@/components/chat-component";
import ChatSidebar from "@/components/chat-sidebar";
import PDFViewer from "@/components/pdf-viewer";
import { db } from "@/lib/db";
import { chats } from "@/lib/db/schema";
import { checkSubscription } from "@/lib/subcription";
import { auth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";

type Props = {
  params: {
    chatId: string;
  };
};

const ChatPage = async ({ params: { chatId } }: Props) => {
  const { userId } = await auth();
  const isPro = await checkSubscription();
  if (!userId) {
    return redirect("/sign-in");
  }
  const _chats = await db.select().from(chats).where(eq(chats.userId, userId));
  if (!_chats) {
    return redirect("/");
  }
  if (!_chats.find((chat) => chat.id === parseInt(chatId))) {
    return redirect("/");
  }
  return (
    <div className="flex max-h-screen">
      <div className="flex w-full max-h-screen">
        {/* chat sidebar */}
        <div className="flex-[1] max-w-xs">
          <ChatSidebar chats={_chats} chatId={parseInt(chatId)} isPro={isPro} />
        </div>
        {/* pdf view */}
        <div className="max-h-screen p-4 overflow-scroll flex-[5]">
          <PDFViewer
            pdfUrl={
              _chats.find((chat) => chat.id === parseInt(chatId))?.pdfUrl!
            }
          />
        </div>
        {/* chat component */}
        <div className="flex-[3]">
          <ChatComponent chatId={parseInt(chatId)} />
        </div>
      </div>
    </div>
  );
};

export default ChatPage;

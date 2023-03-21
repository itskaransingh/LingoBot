"use client";
import { BotChatBubble, ChatBubble } from "@/components";
import { useEffect, useRef, useState } from "react";

import PromptContainer from "./PromptContainer";
type Props = {
  chats?: any;
};

const Conversations = ({ chats }: Props) => {
  const [conversations, setconversations] = useState(
    JSON.parse(localStorage.getItem("conversations") || "[]")
  );
  const [loading, setLoading] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setconversations(JSON.parse(localStorage.getItem("conversations") || "[]"));
    if (!messagesEndRef.current || !loading) return;
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  }, [loading, messagesEndRef.current]);

  useEffect(() => {
    if (!messagesEndRef.current) return;
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <div className="lg:max-w-6xl    lg:px-0 md:px-8 px-4 py-24 pb-60 lg::mx-auto">
      <div className="">
        { 
        conversations?.map((chat: any, i: number) => (
          <>
            {chat.isbot ? (
              <BotChatBubble
                islast={conversations.length -1   === i}
                ref={messagesEndRef}
                key={i}
                chat={chat}
              />
            ) : (
              <ChatBubble
                islast={conversations.length - 1 === i}
                ref={messagesEndRef}
                key={i}
                chat={chat}
              />
            )}
          </>
        ))}
        {loading ? (
          <div ref={messagesEndRef}>
            <BotChatBubble isloading={loading} />
          </div>
        ) : (
          <></>
        )}
      </div>
      <PromptContainer setloading={setLoading} conv={chats} />
    </div>
  );
};

export default Conversations;

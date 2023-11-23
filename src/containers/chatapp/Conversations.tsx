"use client";
import { BotChatBubble, ChatBubble } from "@/components";
import { getls, setls } from "@/utils/helpers/ls";
import { User } from "next-auth";
import { useSession } from "next-auth/react";
import { useEffect, useRef, useState } from "react";

import PromptContainer from "./PromptContainer";
type Props = {
  chats?: any;
};

const Conversations = ({ chats }: Props) => {
  const [conversations, setconversations] = useState(
    getls("conversations") || []
  );
  const [loading, setLoading] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const { data: session } = useSession();
  const user = session?.user as User;

  const lastmessage = conversations?.at(-1);

  const rawconversations = getls("rawconversations") || [];

  useEffect(() => {
    setconversations(getls("conversations") || []);

    if (!messagesEndRef.current || !loading) return;
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  }, [loading]);

  useEffect(() => {
    (async () => {
      if (!messagesEndRef.current) return;
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });

      if (lastmessage.role === "user") {
        setLoading(true);

        const reply = await fetch(`/api/chat`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            botname: user?.botname,
            isMalebot: user?.isMalebot,
            lang: user?.lang,
            langtolearn: user?.langtolearn,
            username: user?.username,
            id: user?.id,
            conversations: conversations,
          }),
        });

        const result = await reply.json();
        if (result.success) {
          setLoading(false);
          rawconversations.push({
            role: "assistant",
            content: result.rawreply,
          });
          conversations.push({
            message: result.message,
            isbot: true,
            sender: user?.botname,
            translation: result.translation,
            messagetype: "text",
          });
          setls("rawconversations", rawconversations);
          setls("conversations", conversations);
          setconversations(conversations);
        } else {
          setLoading(false);

          console.log(result);
        }
      } else {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <div className=" w-full  flex  lg:px-0 md:px-8 px-4 py-24 pb-60 ">
      <div className="w-full">
        {conversations?.map((chat: any, i: number) => (
          <>
            {chat.isbot ? (
              <BotChatBubble
                islast={conversations.length - 1 === i}
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
        ) : null}
      </div>
      <PromptContainer setloading={setLoading} conv={chats} />
    </div>
  );
};

export default Conversations;

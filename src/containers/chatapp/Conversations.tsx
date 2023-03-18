
import { BotChatBubble, ChatBubble } from "@/components";
import { somechats } from "@/utils/data";
import React from "react";
import PromptContainer from "./PromptContainer";

type Props = {};



const Conversations = (props: Props) => {
  return (
    <div className="max-w-6xl md:px-0 px-2.5 py-10 mx-auto">
      <div>
        {somechats.map((chat) => (
          <>
         { chat.isbotrespond?(
             <BotChatBubble chat={chat} />
               ):(
                <ChatBubble chat={chat} />
               )}
          </>
        ))}
      </div>
      <PromptContainer />
    </div>
  );
};

export default Conversations;

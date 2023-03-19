'use client'
import { BotChatBubble, ChatBubble } from "@/components";
import { useEffect, useState } from "react";


import PromptContainer from './PromptContainer'
type Props = {
  chats?: any;
};


const Conversations = ({chats}: Props) => {

  const [conversations, setconversations] = useState(JSON.parse(localStorage.getItem("conversations") || "[]"))
  const [loading, setLoading] = useState(false)
  
useEffect(() => {
  setconversations(JSON.parse(localStorage.getItem("conversations") || "[]"))
  // if(conversations[-1]?.sender !== "user"){
  //   setLoading(true)
  //   // setTimeout(() => {
  //   //   setLoading(false)
  //   // }, 2000);
  // }
}, [conversations])

  

  return (
    <div className="max-w-6xl   md:px-0 px-2.5 py-10 pb-40 mx-auto">
      <div className="flex flex-col gap-5">
        {conversations?.map((chat:any,i:number) => (
          <>
         { chat.isbot?(
             <BotChatBubble  key={i} chat={chat} />
               ):(
                <ChatBubble key={i} chat={chat} />
               )}
          </>
        ))}
      { loading?  <BotChatBubble isloading={loading}  />: <></>}
      </div>
      <PromptContainer setloading={setLoading} conv={chats} />
    </div>
  );
};

export default Conversations;


import { BotChatBubble, ChatBubble } from "@/components";
import { authOption } from "@/pages/api/auth/[...nextauth]";
import { somechats } from "@/utils/data";
import { getServerSession } from "next-auth";

import PromptContainer from './PromptContainer'
type Props = {};


const Conversations = async(props: Props) => {
  const session = await getServerSession(authOption)
  
  const chats = await prisma?.conversation.findFirst({
    where: {
       userid: session?.user?.id,
    },
    include:{
      chats:true,
    }
  })


  return (
    <div className="max-w-6xl md:px-0 px-2.5 py-10 mx-auto">
      <div>
        {chats?.chats.map((chat) => (
          <>
         { chat.isbotrespond?(
             <BotChatBubble chat={chat} />
               ):(
                <ChatBubble chat={chat} />
               )}
          </>
        ))}
      </div>
      <PromptContainer conv={chats} />
    </div>
  );
};

export default Conversations;

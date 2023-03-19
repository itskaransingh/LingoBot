import { Navbar } from '@/components'
import { authOption } from '@/pages/api/auth/[...nextauth]'
import { getServerSession } from 'next-auth'
import Conversations from './Conversations'

type Props = {}

const ConversationContainer = async(props: Props) => {
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
   <div>
 <Navbar botname={session?.user.botname as string} />
    <Conversations chats={chats} />
   </div>
  )
}

export default ConversationContainer
import { Navbar } from '@/components'
import { authOption } from '@/pages/api/auth/[...nextauth]'
import { getServerSession } from 'next-auth'
import Conversations from './Conversations'

type Props = {}

const ConversationContainer = (props: Props) => {
  const session =  getServerSession(authOption).then((session) => {
    if(session){
      return session 
    }else{
      return null
    }
  })
  
  // const chats = await prisma?.conversation.findFirst({
  //   where: {
  //      userid: session?.user?.id,
  //   },
  //   include:{
  //     chats:true,
  //   }
  // })
  return (
   <div>
 <Navbar botname={session?.user.botname as string} />
    <Conversations  />
   </div>
  )
}

export default ConversationContainer
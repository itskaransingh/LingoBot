import { Navbar } from '@/components'
import { authOption } from '@/pages/api/auth/[...nextauth]'
import { getServerSession } from 'next-auth'
import Conversations from './Conversations'

type Props = {}

const ConversationContainer = async(props: Props) => {
  let session = await getServerSession(authOption)

  // const chats = await prisma?.conversation.findFirst({
  //   where: {
  //      userid: session?.user?.id,
  //   },
  //   include:{
  //     chats:true,
  //   }
  // })
  


  return (
   <div className='flex w-full min-h-screen overflow-y-auto justify-end  flex-col-reverse ' >

    <Conversations  />
   
 <Navbar botname={session?.user.botname as string} />
   </div>
  )
}

export default ConversationContainer
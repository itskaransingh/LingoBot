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
   <div >
    <div className='flex w-full h-screen overflow-y-auto flex-col-reverse '>
    <Conversations  />
    </div>
 <Navbar botname={session?.user.botname as string} />
   </div>
  )
}

export default ConversationContainer
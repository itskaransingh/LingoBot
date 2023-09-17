import { Navbar } from '@/components'
import { authOption } from '@/pages/api/auth/[...nextauth]'
import { getServerSession } from 'next-auth'
import Conversations from './Conversations'

type Props = {}

const ConversationContainer = async (props: Props) => {
  let session = await getServerSession(authOption)


  return (
    <div className='flex lg:mx-auto lg:max-w-6xl min-h-screen overflow-y-auto justify-end  flex-col-reverse ' >
      <Navbar botname={session?.user.botname as string} />
      <Conversations />
    </div>
  )
}

export default ConversationContainer
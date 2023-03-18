import { Navbar } from '@/components'
import React from 'react'
import Conversations from './Conversations'

type Props = {}

const ConversationContainer = (props: Props) => {
  return (
   <div>
 <Navbar />
    <Conversations />
   </div>
  )
}

export default ConversationContainer
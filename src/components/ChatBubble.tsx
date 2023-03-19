import { Chat } from '@/utils/data'
import Image from 'next/image'
import React from 'react'

type Props = {
chat : any
key:number
}


const ChatBubble = ({chat,key}: Props) => {
  return (
    <div key={key} className={`chat chat-end`}>
    <div className="chat-image avatar">
      <div className="w-10 rounded-full">
      <Image alt='image' height={40} width={40} src="/images/photo-1534528741775-53994a69daeb.jpg" />

      </div>
    </div>
    <div className="chat-bubble">
     {
       chat.message
     }
    </div>
  </div>
  )
}

export default ChatBubble
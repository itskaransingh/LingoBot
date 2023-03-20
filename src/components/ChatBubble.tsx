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

    <div className="chat-bubble">
     {
       chat.message
     }
    </div>
  </div>
  )
}

export default ChatBubble
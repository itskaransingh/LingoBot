import { Chat } from '@/utils/data'
import Image from 'next/image'
import React from 'react'

type Props = {
chat : any
key:number
islast?:boolean
ref?:any
}


const ChatBubble = ({chat,key,islast,ref}: Props) => {
  return (
    <div ref={islast?ref:null} key={key} className={`chat chat-end transition-all duration-200 ease-in`}>

    <div className="chat-bubble">
     {
       chat.message
     }
    </div>
  </div>
  )
}

export default ChatBubble
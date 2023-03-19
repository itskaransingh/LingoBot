'use client'

import { botChat } from '@/utils/data'
import Image from 'next/image'
import React, { useState } from 'react'

type Props = {
    chat?: any
    key?: number,
    isloading?:boolean
}

const BotChatBubble = ({chat,key,isloading}: Props) => {
    const [translatePanelOpen, setTranslatePanelOpen] = useState(false)
  return (
    <div key={key} className={`chat chat-start`}>
    <div className="chat-image avatar">
      <div className="w-10 rounded-full">
        <Image alt='bot image' height={40} width={40} src="/images/photo-1534528741775-53994a69daeb.jpg" />
      </div>
    </div>
    <div className='relative'>

    <div onClick={()=> setTranslatePanelOpen(translatePanelOpen?false:true)}   className=" active:bg-base-200 md:cursor-pointer chat-bubble">
     {
        !isloading? chat?.message: 'Loading...' + ' '
        }
    </div>
   {
  //  translatePanelOpen && <>
  //   {/* <div className='absolute chat-bubble bottom-20  border  border-primary before:!left-1  '>
  //    {
  //       chat?.wordsinreply?.map((word,i)=>(
  //          <span key={i} className='hover:underline'>{word + ' '}</span>
  //           ))
  //       }
  //   </div> */}
  //   <div className='absolute chat-bubble top-20 before:!left-2 before:!top-1 !rounded-bl-2xl  !rounded-tl-none border  border-primary'>
  //   {
  //       chat?.messageTranslation
  //   }
  //   </div>
  //   </>
    }

    </div>
  </div>
  )
}

export default BotChatBubble
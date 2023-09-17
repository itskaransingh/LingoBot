'use client'

import { useState } from 'react'

type Props = {
  chat?: any
  key?: number,
  isloading?: boolean
  ref?: any
  islast?: boolean
}

const BotChatBubble = ({ chat, islast, ref, key, isloading }: Props) => {
  const [translatePanelOpen, setTranslatePanelOpen] = useState(false)




  return (
    <div ref={islast ? ref : null} key={key} className={`chat my-5    chat-start`}>

      <div className='relative '>

        <div onClick={() => setTranslatePanelOpen(translatePanelOpen ? false : true)} className={`${isloading ? 'transition-all animate-bounce ease-in' : ''} mx-2 active:bg-base-200 md:cursor-pointer chat-bubble`}>
          {
            !isloading ? chat?.message : 'Loading... ' + ' '
          }
        </div>
        {
          translatePanelOpen && <>
            <div className='absolute   mx-2 z-10 chat-bubble top-20 before:!left-2 before:!top-1 !rounded-bl-2xl  !rounded-tl-none border  border-primary'>
              {
                chat?.translation
              }
            </div>
          </>
        }

      </div>
    </div>
  )
}

export default BotChatBubble
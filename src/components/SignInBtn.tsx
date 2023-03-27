'use client'

import { signIn } from 'next-auth/react'
import Image from 'next/image'

type Props = {}

const SignInBtn = (props: Props) => {
  return (
    <div onClick={()=> signIn("google")} className="flex border  md:cursor-pointer shadow-xl justify-center items-center gap-4 p-3 rounded-md bg-slate-800">
    <div>
      <Image src={'/images/googlelogo.png'} height={15} width={20} alt={'google'}/>
    </div>
    <div className='font-semibold'>SignIn With Google</div>
  </div>
  )
}

export default SignInBtn
'use client'
import { signOut } from 'next-auth/react'
import React, { useState } from 'react'

type Props = {
}

const CreateUserN = (props: Props) => {
  const [username, setUsername] = useState('')
  const senddata = async () => {
    const res = await fetch(`/api/users/${username}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: username,
      }),})
    const data = await res.json()
    console.log(data)

  }
  return (
    <div className="flex flex-col items-center w-full justify-between gap-2.5">
    <input onChange={(e)=> setUsername(e.target.value)} type="text" placeholder="Username" className="input  input-bordered w-full " />
      <button onClick={()=> senddata()} className="h-full w-full flex-[0.2] btn px-3 ">Create</button>
      <button className="h-full flex-[0.2] btn px-3 " onClick={()=> signOut()}>log out</button>
    </div>
  )
}

export default CreateUserN
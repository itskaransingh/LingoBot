"use client"

import { Session } from 'next-auth';
import { SignIn, UserSetup } from '../auth'

type Props = {
    session?:Session|null;
  
  };
  
const Auth = ({session}: Props) => {
  console.log(session)
  return (
    <>
    {session ? <UserSetup  /> : <SignIn /> }
    </>
  )
}

export default Auth
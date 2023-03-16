import { Session } from 'next-auth';
import { SignIn, UserN } from '../auth'

type Props = {
    session?:Session|null
  };
  
const Auth = ({session}: Props) => {
  return (
    <>
    {session ? <UserN /> : <SignIn /> }
    </>
  )
}

export default Auth
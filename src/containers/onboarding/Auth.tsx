import { Session } from 'next-auth';
import { SignIn, UserSetup } from '../auth'

type Props = {
    session?:Session|null
  };
  
const Auth = ({session}: Props) => {
  return (
    <>
    {session ? <UserSetup /> : <SignIn /> }
    </>
  )
}

export default Auth
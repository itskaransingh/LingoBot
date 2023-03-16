
import { SignIn, UserN } from '@/containers/auth'
import { Session } from 'next-auth/index'

type Props = {
  session?:Session|null
};

const OnBoarding = ({session}:Props) => {
  return (
    <div className='flex justify-center items-center min-h-screen'>
          {session ? <UserN /> : <SignIn /> }
    </div>
  )
}

export default OnBoarding
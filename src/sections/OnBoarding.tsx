
import { Auth, ConvSetup } from '@/containers/onboarding';
import { Session } from 'next-auth/index'

type Props = {
  session?: Session | null,
};

const OnBoarding = ({ session }: Props) => {
  return (
    <div className='flex justify-center  items-center min-h-screen'>
      {session?.user.username ? <ConvSetup /> : <Auth session={session} />}
    </div>
  )
}

export default OnBoarding
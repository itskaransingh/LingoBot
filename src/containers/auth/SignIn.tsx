import { SignInBtn } from "@/components"


type Props = {}

const SignIn  = (props: Props) => {
  return (
    <div className="flex flex-col gap-5  items-center">
    <div className='text-5xl font-semibold '>
      WeChat
    </div>
    <SignInBtn />
    </div>
  )
}

export default SignIn
import { SignInBtn } from "@/components"


type Props = {}

const SignIn = (props: Props) => {
  return (
    <div className="flex flex-col gap-5  items-center">
      <h1 className='text-5xl font-semibold '>
        LingoBot
      </h1>
      <p className="text-center">Learn Languages Through Coversations <br /> With Personalized <span className="text-2xl">Ai</span> </p>
      <SignInBtn />
    </div>
  )
}

export default SignIn
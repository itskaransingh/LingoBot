
import { CreateUserN } from "@/components"

type Props = {}

const UserN = (props: Props) => {
  
  return (
    <div className="flex items-center gap-5 flex-col">
    <div className="md:text-4xl  text-3xl">Create Your Username</div>
    <CreateUserN />
    </div>
  )
}

export default UserN
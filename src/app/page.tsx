import OnBoarding from "@/sections/OnBoarding";
import ChatApp from "@/sections/ChatApp";
import { authOption } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";

type Props = {};

const page = async (props: Props) => {
  const session = await getServerSession(authOption);

 
  return (
    <>
      {session?.user?.isSetupComplete ? <ChatApp /> : <OnBoarding session={session} />}
    </>
  );
};

export default page;

import { Chats, ConversationContainer } from "@/containers/chatapp";


type Props = {};

const ChatApp = (props: Props) => {
  return (
    <div>
      {/* <Chats /> */}
       {/* @ts-expect-error Server Component */}
      <ConversationContainer />
    </div>
  );
};

export default ChatApp;

import { Chats, Conversations } from "@/containers/chatapp";


type Props = {};

const ChatApp = (props: Props) => {
  return (
    <div>
      <Chats />
      <Conversations />
    </div>
  );
};

export default ChatApp;

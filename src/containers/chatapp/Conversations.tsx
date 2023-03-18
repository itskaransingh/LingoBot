import React from "react";
import PromptContainer from "./PromptContainer";

type Props = {};

// message: 'Hola, ¿cómo estás?',
const somechats = [
  {
    id: 1,
    message: "Hi good morning",
    responder: "user",
    isbotrespond: false,
    language: "es",
    createdAt: "2022-01-01T00:00:00.000Z",
    updatedAt: "2022-01-01T00:00:00.000Z",
    translated: null,
  },
  {
    id: 2,
    responder: "bot",
    language: "spanish",
    transletedto: "english",
    message: "Lorem ipsum dolor sit amet",
    isbotrespond: true,
    wordsinmessage: [
      { word: "Lorem", translation: "Lorem ipsum dolor sit amet" },
      { word: "ipsum", translation: "Lorem ipsum dolor sit amet" },
      { word: "dolor", translation: "Lorem ipsum dolor sit amet" },
      { word: "sit", translation: "Lorem ipsum dolor sit amet" },
      { word: "amet", translation: "Lorem ipsum dolor sit amet" },
    ],
    messageTranslation: "Lorem ipsum dolor sit amet",
    inreplyof: 1,
    createdAt: "2022-01-01T00:00:00.000Z",
    updatedAt: "2022-01-01T00:00:00.000Z",
  },
];

const Conversations = (props: Props) => {
  return (
    <div className="max-w-6xl mx-auto">
      <div>
        {somechats.map((chat,i) => (
          <div key={i} className={`chat ${chat.isbotrespond?'chat-start':'chat-end'}`}>
            <div className="chat-image avatar">
              <div className="w-10 rounded-full">
                <img src="/images/stock/photo-1534528741775-53994a69daeb.jpg" />
              </div>
            </div>
            <div className="chat-bubble">
             {
              chat.message
             }
            </div>
          </div>
        ))}
      </div>
      <PromptContainer />
    </div>
  );
};

export default Conversations;

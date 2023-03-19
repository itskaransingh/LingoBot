const languages = [
  { id: 1, name: "English" },
  { id: 2, name: "Mandarin Chinese" },
  { id: 3, name: "Spanish" },
  { id: 4, name: "French" },
  { id: 5, name: "Arabic" },
  { id: 6, name: "German" },
  { id: 7, name: "Japanese" },
  { id: 8, name: "Russian" },
  { id: 9, name: "Portuguese" },
  { id: 10, name: "Italian" },
];

const somechats = [
  {
    id: 1,
    message: "Hi good morning",
    isbotrespond: false,
    inlanguage: "english",
    replyid      : 2,
    createdAt: "2022-01-01T00:00:00.000Z",
  },
  {
    id: 2,
    language: "spanish",
    isbotrespond: true,
    reply: "Lorem ipsum dolor sit amet",
    transletedLang: "english",
    replyTranslation: "Lorem ipsum dolor sit amet",
    wordsinreply: [
      {
        id: 23,
        inlanguage: "spanish",
        word: "Lorem",
        translation: "Lorem ipsum dolor sit amet",
        translatedLang: "english",
      },
      {
        id: 22,
        inlanguage: "spanish",
        word: "ipsum",
        translation: "Lorem ipsum dolor sit amet",
        translatedLang: "english",
      },
      {
        id: 21,
        inlanguage: "spanish",
        word: "dolor",
        translation: "Lorem ipsum dolor sit amet",
        translatedLang: "english",
      },
      {
        id: 20,
        inlanguage: "spanish",
        word: "sit",
        translation: "Lorem ipsum dolor sit amet",
        translatedLang: "english",
      },
      {
        id: 19,
        inlanguage: "spanish",
        word: "amet",
        translation: "Lorem ipsum dolor sit amet",
        translatedLang: "english",
      },
    ],
    inreplyof: 1,
    createdAt: "2022-01-01T00:00:00.000Z",
  },
  {
    id: 3,
    message: "how are you ",
    isbotrespond: false,
    inlanguage: "english",
    replyid      : 4,
    createdAt: "2022-01-01T00:00:00.000Z",
  },
  {
    id: 4,
    language: "spanish",
    isbotrespond: true,
    reply: "Lorem ipsum dolor sit amet",
    transletedLang: "english",
    replyTranslation: "Lorem ipsum dolor sit amet",
    wordsinreply: [
      {
        id: 23,
        inlanguage: "spanish",
        word: "Lorem",
        translation: "Lorem ipsum dolor sit amet",
        translatedLang: "english",
      },
      {
        id: 22,
        inlanguage: "spanish",
        word: "ipsum",
        translation: "Lorem ipsum dolor sit amet",
        translatedLang: "english",
      },
      {
        id: 21,
        inlanguage: "spanish",
        word: "dolor",
        translation: "Lorem ipsum dolor sit amet",
        translatedLang: "english",
      },
      {
        id: 20,
        inlanguage: "spanish",
        word: "sit",
        translation: "Lorem ipsum dolor sit amet",
        translatedLang: "english",
      },
      {
        id: 19,
        inlanguage: "spanish",
        word: "amet",
        translation: "Lorem ipsum dolor sit amet",
        translatedLang: "english",
      }],
  }
  
];



const messages = [
  {role:'system', content:'you are Govind Singh a conversation partner of user. who helps user learn Spanish language through conversations.you have to provide a reply in the language of learning, with translation in the native language which is English and also a translation of all words in the reply, separate all these three criteria with a unique character like "/".you have to talk like a friend.have small coversations so the user can learn fast.if the message of user is out of your role like write a code , then tell the user that this is out of my expertise'},
]

export type botChat = typeof somechats[1];
export type Chat = typeof somechats[0];

export { languages, somechats };

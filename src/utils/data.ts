
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
  
  export type  botChat = typeof somechats[1]; 
  export type  Chat = typeof somechats[0]; 
  


  export {
    languages,
    somechats
  }
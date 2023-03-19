import { Chats } from "@/containers/chatapp";
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { User } from "next-auth";
import prisma from "@/lib/prisma";

import { Configuration, OpenAIApi } from "openai";

// type Data = {
//   name: string
// }

export default async function Conversationhandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "POST":
      try {
        const { botname, isMalebot, lang, langtolearn, username, prompt, id,convid } =
          req.body;
        const openai = new OpenAIApi(
          new Configuration({ apiKey: process.env.OPENAI_KEY })
        );

        const response = await openai.createChatCompletion({
          model: "gpt-3.5-turbo",
          messages: [
            {
              role: "system",
              content: `you are ${botname}, a ${
                isMalebot ? "male" : "female"
              } conversation partner of user named ${username}. who helps user learn ${langtolearn} language through conversations.you have to provide a reply in the language of learning which is ${langtolearn}, with translation in the native language which is ${lang} and also a translation of all words in the reply, separate all these three criteria with a unique character like "/" for example like this format "Estoy bien, ¿y tú?///I'm good, and you?///Estoy (I am) bien (good), ¿y (and) tú (you)?" .you have to talk like a friend.have small coversations so the user can learn fast.if the message of user is out of your role like write a code , then tell the user that this is out of my expertise`,
            },
            { role: "user", content: prompt },
          ],
        });
        const rawres = response?.data?.choices[0]?.message?.content;
        const replydataArr = rawres?.split("/");
        const reply = replydataArr[0] as string;
        const translataion = replydataArr[1] as string;
        const wordtranslation = replydataArr[2] as string;
        console.log(reply, translataion, wordtranslation, replydataArr);

        // const newmessage = await prisma.chat.createMany({
        //   data: [
        //     {
        //       inlanguage: lang,
        //       message: prompt,
        //       isbotrespond: false,
        //       createdAt: new Date(),
        //     },
        //     {
        //       inlanguage: langtolearn,
        //       message: reply,
        //       isbotrespond: true,
        //       messageTranslation: translataion,
        //       transletedLang: lang,
        //       createdAt: new Date(),
        //     },
        //   ],
        // });
        
        const newmessages = await prisma.chat.createMany({
          data: [
            {
              inlanguage: lang,
              message: prompt,
              isbotrespond: false,
              createdAt: new Date(),
            },
            {
              inlanguage: langtolearn,
              message: reply,
              isbotrespond: true,
              messageTranslation: translataion,
              transletedLang: lang,
              createdAt: new Date(),
            },
          ],
        })

       const conversation = prisma.conversation.upsert({
         where:{
           id: convid || 0,
         },
         create: {
           userid: id,
           chats: {
              connect:[
                {
                  id: newmessages[0].id,
                },
                {
                  id: newmessages[1].id,
                },
              ]
            }
           
         },
         update: {
          chats: {
            connect:[
              {
                id: newmessages[0].id,
              },
              {
                id: newmessages[1].id,
              },
            ]
          }
        }
      })
        
        res.status(200).json({newmessages, conversation})
      } catch (error: any) {
        res.status(500).json({ message: error.message });
      }
      break;
  }
}

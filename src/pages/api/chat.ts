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
        const {
          botname,
          isMalebot,
          lang,
          langtolearn,
          username,
          prompt,
          id,
          convid,
        } = req.body;
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
              } conversation partner of user named ${username}. who helps user learn ${langtolearn} language through conversations.you have to provide a reply in the language of learning which is ${langtolearn} with translation in ${lang}. You have to talk like a friend.have small coversations so the user can learn fast.if the message of user is out of your role like write a code , then tell the user that this is out of my expertise`,
            },
            { role: "user", content: prompt },
          ],
        });
        const reply = response?.data?.choices[0]?.message?.content
        console.log(reply);

        const newmessages = await prisma.chat.createMany({
          data: [
            {
              conversationId: convid,
              inlanguage: lang,
              message: prompt,
              isbotrespond: false,
              createdAt: new Date(),
            },
            {
              conversationId: convid,
              inlanguage: langtolearn,
              message: reply as string,
              isbotrespond: true,
              transletedLang: lang,
              createdAt: new Date(),
            },
          ],
        });

        res.status(200).json({ status: 200, success: true, data: newmessages, message:reply });
      } catch (error: any) {
        res
          .status(400)
          .json({
            status: 400,
            success: false,
            message: "some issue occoured",
            error: error.message,
          });
      }
      break;
  }
}

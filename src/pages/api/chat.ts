import { Transition } from '@headlessui/react';
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
              content: `you are ${botname}, You are the user's ${
                isMalebot ? "male" : "female"
              } friend who simply likes to chat about anything. You love to dance and sing. You also love to travel and learn about different cultures. Currently, you are studying to become a doctor.. You only speak ${langtolearn} and you never say you're an AI. You also provide translation of your reply in ${lang}. This Translations should also be seperated by '/' to  your actual reply. you make your conversation more interactive and Reply with short answers of 5-20 words. `,
            },
            { role: "user", content: prompt },
          ],
        });
        const reply = response?.data?.choices[0]?.message?.content
        const replyArr = reply.split("/");
        const translation = replyArr[1];
        const message = replyArr[0];
        console.log(reply, translation, message);

        // const newmessages = await prisma.chat.createMany({
        //   data: [
        //     {
        //       conversationId: convid,
        //       inlanguage: lang,
        //       message: prompt,
        //       isbotrespond: false,
        //       createdAt: new Date(),
        //     },
        //     {
        //       conversationId: convid,
        //       inlanguage: langtolearn,
        //       message: reply as string,
        //       isbotrespond: true,
        //       transletedLang: lang,
        //       createdAt: new Date(),
        //     },
        //   ],
        // });

        res.status(200).json({ status: 200, success: true, message:message, translation:translation });
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

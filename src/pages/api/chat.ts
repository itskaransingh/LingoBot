import type { NextApiRequest, NextApiResponse } from "next";

import OpenAI from "openai";

export default async function Conversationhandler(
  req: NextApiRequest,
  res: NextApiResponse
) {



  switch (req.method) {
    case "POST":
      const {
        botname,
        isMalebot,
        lang,
        langtolearn,
        username,
        conversations,
      } = req.body;

      const messages = [ {
        "role": "system",
        "content": `you are ${botname}, You are ${username} ${
          isMalebot ? "male" : "female"
        } friend who simply likes to chat about anything. You love to dance and sing. You also love to travel, learn about different cultures and having conversations. Currently, you are studying to become a doctor.. You only give reply in ${langtolearn} and you never say you're an AI. You also provide translation of your reply in ${lang} after the reply is completed. This Translation is  seperated by '/' to  your actual reply. you make your conversation more engaging and Reply with short answers of 5-20 words. `,
      }, ...conversations]

      try {

        const openai = new OpenAI({
           apiKey: process.env.OPENAI_KEY
        });

        const response = await openai.chat.completions.create({
          model: "gpt-3.5-turbo",
          messages,
        });

        const reply = response?.choices[0].message.content!;
        const replyArr = reply.split("/");
        const translation = replyArr[1];
        const message = replyArr[0]; 

        console.log(reply, translation, message)

        res.status(200).json({ status: 200, success: true, message:message, translation:translation, rawreply:reply });

      } catch (error: any) {
        console.log({error});
        res
          .status(400)
          .json({
            status: 400,
            success: false,
            message: "some issue occoured",
            error: error.message,
            stack: error,
            messages:messages,
          });
      }
      break;
  }
}

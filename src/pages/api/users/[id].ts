import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";

export default async function userHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { query, method } = req;

  const id = query.id as string;

  switch (method) {
    case "GET":
      try {
        const user = await prisma?.user.findFirst({
          where: {
            id,
          },
        });
        res.status(200).json(user);
      } catch (error: any) {
        res.status(400).json({ message: error.message });
      }
      break;

    case "PUT":
      try {
        const updatedUser = await prisma?.user.update({
          data: req.body,
          where: { id },
        });
        res.status(200).json(updatedUser);
      } catch (error: any) {
        res.status(400).json({ message: error.message });
      }
      break;
    default:
      res.setHeader("Allow", ["GET", "PUT"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}

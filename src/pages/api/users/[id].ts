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
const {username,...rest} = req.body
if(username){
  try {
    const usernexist = await prisma.user.findUnique({
      where: {
        username: username as string,
      }
    })
    if(!usernexist){
      const updatedUser = await prisma?.user.update({
        data: req.body,
        where: { id },
      });
      res.status(200).json({user:updatedUser,success:true,message:"User updated successfully",status:200});
    }
    else{
      res.status(400).json({success:false, message:"Username already exist",status:400});
    }
  } catch (error: any) {
    res.status(500).json({success:false, message: 'Something went wrong', stack: error.message,status:500});
  }
}
else{
  try {
    const updatedUser = await prisma?.user.update({
      data: req.body,
      where: { id },
    });
    res.status(200).json({user:updatedUser,success:true,message:"User updated successfully",status:200});
  } catch (error: any) {
    res.status(500).json({success:false, message: 'Something went wrong', stack: error.message,status:500});
  }
    
  }

      break;
    default:
      res.setHeader("Allow", ["GET", "PUT"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}

import { SignIn } from '@/containers/auth';
import NextAuth, { AuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import prisma from "@/lib/prisma"


export const authOption:AuthOptions = {
  adapter: PrismaAdapter(prisma),
  secret:process.env.NEXTAUTH_SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  callbacks:{
    async session({ session, token, user }) {
      const sessionUser = { ...session.user, ...user };

      return Promise.resolve({
        ...session,
        user: sessionUser,
      });
    },
  },
 events:{
  updateUser() {
    return Promise.resolve();
  }
 }
}
export default NextAuth(authOption)

import NextAuth,{type Session} from "next-auth"
import authConfig from "./auth.config"
import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from "@/lib/db";
import { JWT } from "next-auth/jwt";
import { getUserById } from "@/data/user";
import { getAccountByUserId } from "@/data/account";
import { getRoleById } from "@/data/role";
import { Role } from "@prisma/client"

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  pages: {
    signIn: "/auth/login",
    error: "/auth/error",
  },
  events: {
    async linkAccount({ user }) {
      await db.user.update({
        where: { id: user.id },
        data: { emailVerified: new Date() },
      });
    }
  },
  callbacks: {
    async signIn({ user, account }) {
      //AllowOAUTH without email
      console.log(user, account)
      if (account?.provider !== "credentials") return true;

      const existingUser = await getUserById(user.id as string);

      if (!existingUser?.emailVerified) return false;
      
      //TODO: 2FA

      return true;
    },
    async session({ token, session }: { session: Session; token?: JWT}) {
      // console.log({ sessiontoken: token })
      if (session.user && token?.sub) {// nikde tu ? nema ale nechci errory xd
        session.user.id = token.sub;
      }

      if (token?.role && session.user) {
        session.user.role = token.role as Role; 
      }

      if (session.user) {
        session.user.name = token?.name;
        session.user.email = token?.email;
        session.user.isOAuth = token?.isOAuth as boolean;
      }

      return session;
    },
    async jwt({ token }) {
      if (!token.sub) return token;
      
      const existingUser = await getUserById(token.sub);

      if (!existingUser) return token;

      const existingAccount = await getAccountByUserId(existingUser.id);

      token.isOAuth = !!existingAccount;
      token.name = existingUser.name;
      token.email = existingUser.email;
      
      token.role = await getRoleById(existingUser.roleId as string)
      
      console.log(token.role)

      return token;
    },
  },
  adapter: PrismaAdapter(db),
  session: {strategy: 'jwt'},
  ...authConfig,
})
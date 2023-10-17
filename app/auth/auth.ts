import type {
  GetServerSidePropsContext,
  NextApiRequest,
  NextApiResponse,
} from "next";
import type { NextAuthOptions as NextAuthConfig } from "next-auth";
import { getServerSession } from "next-auth";
import Google from "next-auth/providers/google";
import Github from "next-auth/providers/github";
import Twitter from "next-auth/providers/twitter";

export const authConfig: NextAuthConfig = {
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    Github({
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    }),
  ],
  secret: process.env.AUTH_SECRET as string,
  callbacks: {
    async jwt({ token, user, account }) {
      if (account) {
        const role = user.email === process.env.USER_ROOT ? "admin" : "user";

        token.accessToken = account.access_token;
        token.userRole = role;
      }
      return token;
    },

    async session({ session, token }) {
      session.accessToken = token.accessToken as string;
      session.userRole = token.userRole as string;

      return session;
    },
  },
};

/*
 * 매번 서버컴포넌트에서 middleware 거치지 않도록 하는 helper 함수
 */
export function auth(
  ...args:
    | [GetServerSidePropsContext["req"], GetServerSidePropsContext["res"]]
    | [NextApiRequest, NextApiResponse]
    | []
) {
  return getServerSession(...args, authConfig);
}

import type {
  GetServerSidePropsContext,
  NextApiRequest,
  NextApiResponse,
} from "next";
import type { NextAuthOptions as NextAuthConfig, User } from "next-auth";
import { getServerSession } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authConfig: NextAuthConfig = {
  providers: [
    CredentialsProvider({
      name: "Admin Login",

      credentials: {
        email: { label: "e-mail", type: "text", placeholder: "e-mail" },
        password: {
          label: "password",
          type: "password",
          placeholder: "password",
        },
      },
      async authorize(credentials) {
        const res = await fetch(`${process.env.DEV_URL}/api/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: credentials?.email,
            password: credentials?.password,
          }),
        });
        const { data, success } = await res.json();
        const user: User = {
          id: data.email,
          email: data.email,
          name: data.name,
          image: data.image,
        };

        return success ? user : null;
      },
    }),
  ],
  secret: process.env.AUTH_SECRET as string,
  session: {
    maxAge: 60 * 60 * 24 * 7,
    updateAge: 24 * 60 * 60,
  },
  callbacks: {
    async session({ session }) {
      return session;
    },
  },
  pages: {
    signIn: "/auth/login",
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

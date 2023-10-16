// import { getServerSession } from "next-auth/next";
// import { authConfig } from "app/auth/auth";
// import { NextResponse } from "next/server";
// import { Session } from "next-auth";
import { withAuth } from "next-auth/middleware";

export default withAuth({
  secret: process.env.AUTH_SECRET as string,
  callbacks: {
    authorized({ token }) {
      return token?.userRole === "admin";
    },
  },
});

export const config = { matcher: ["/admin/:path*"] };

// export async function middleware(req: NextRequest) {
//   const session = await getServerSession(authConfig);
//   const { pathname } = req.nextUrl;

//   if (pathname.startsWith("/admin")) {
//     console.log("middleware active - admin");

//     await withAuth(session);
//   }

//   if (pathname.startsWith("/auth")) {
//     console.log("middleware active - login");

//     await withOutAuth(session);
//   }
// }

// async function withAuth(session: Session | null) {
//   try {
//     if (session && session.userRole != "admin") {
//       return NextResponse.redirect("/");
//     }
//   } catch (e: unknown) {
//     console.log(e);
//     throw new Error("token didn't exist");
//   }
// }

// async function withOutAuth(session: Session | null) {
//   try {
//     if (session && session.user) {
//       return NextResponse.redirect("/");
//     }
//   } catch (e: unknown) {
//     console.log(e);
//     throw new Error("session didn't exist");
//   }
// }

// export const config = { matcher: ["/admin/(.*)"] };

import { withAuth } from "next-auth/middleware";
// import { NextResponse } from "next/server";
// import type { NextApiRequest } from "next";
// import { getToken } from "next-auth/jwt";

export default withAuth(
	function middleware(req) {
		console.log(req.nextauth.token);
	},
	{
		callbacks: {
			authorized: ({ token }) => !!token,
		},
		secret: process.env.SECRET,
		pages: {
			signIn: "/sign-in",
		},
	}
);

export const config = { matcher: ["/chats:path*", "/user:path*"] };


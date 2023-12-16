import { withAuth } from "next-auth/middleware";
// import { NextResponse } from "next/server";
// import type { NextApiRequest } from "next";
// import { getToken } from "next-auth/jwt";

export default withAuth(
	function middleware(req) {
		// console.log(req.nextauth.token);
	},
	{
		// callbacks: {
		// 	authorized: ({ token }) => token !== null,
		// },
		secret: process.env.SECRET,
		pages: {
			signIn: "/sign-in",
		},
	}
);

export const config = { matcher: ["/chats:path*", "/user:path*"] };

// export async function middleware(
// 	req: NextApiRequest,
// 	res: NextResponse
// ) {
// 	const { url: pathname, query } = req;
//     const token = await getToken({ req });

//     const redirectCallback = pathname || "/";

// 	if (!token && pathname !== "/sign-in") {
// 		const redirectUrl = new URL(
// 			`/sign-in?${new URLSearchParams({
// 				error: "tokenRequired",
// 				callbackUrl: redirectCallback,
// 			})}`,
// 			req.url
// 		);
// 		return NextResponse.redirect(redirectUrl);
// 	}

// 	if (token && pathname === "/sign-in" && query.callbackUrl) {
// 		return NextResponse.redirect(query.callbackUrl as string);
// 	}

// 	if (token && pathname === "/sign-in") {
// 		return NextResponse.redirect("/");
// 	}

// 	return NextResponse.next();
// }

// export const config = {
// 	matcher: ["/chats:path*", "/user:path*"],
// };

// export { default } from "next-auth/middleware";

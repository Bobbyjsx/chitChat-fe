import { get } from "@/app/lib/api";
import { NextAuthOptions, User } from "next-auth";
import Providers from "next-auth/providers/credentials";

export interface SignInResponse {
	id: number;
	username: string;
	email: string;
	password: string;
}
export const authOptions: NextAuthOptions = {
	callbacks: {
		async jwt({ token, account, user }) {
			if (account) {
				const { access_token } = account;
				token.accessToken = access_token;
				token.userRole = "authenticated";
			}

			return token;
		},
		async session({ session, token }) {
			if (session?.user) session.user.id = token.sub;
			return session;
		},
	},
	providers: [
		Providers({
			credentials: {
				email: { label: "Email", type: "email" },
				password: { label: "Password", type: "password" },
			},
			async authorize(credentials) {
				const { email, password } = credentials || {};

				const user = await get<SignInResponse>(
					`/auth/sign-in/${email}`
				);

				if (
					user &&
					email === user.email &&
					password === user.password
				) {
					return {
						id: user.id.toString(), // Convert number to string if required by User type
						email: user.email,
						userName: user.username,
					};
				} else {
					return null;
				}
			},
		}),
	],
	secret: process.env.NEXTAUTH_SECRET,
	session: {
		strategy: "jwt",
	},
	debug: process.env.NODE_ENV === "development",
	pages: {
		signIn: "/sign-in",
	},
};

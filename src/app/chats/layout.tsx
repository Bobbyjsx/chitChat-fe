import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import Provider from "../context/ChatsProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Chats",
	description: "Generated by create next app",
};

export default function ChatsLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (

			<section className={inter.className}>
				<Provider>{children}</Provider>
			</section>

	);
}
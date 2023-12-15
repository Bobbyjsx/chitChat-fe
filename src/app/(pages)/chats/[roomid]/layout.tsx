import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/app/globals.css";
import Provider from "../../../context/Provider";
import ChatRoomContext from "@/app/context/ChatRoomContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Chat Room",
	description: "Generated by create next app",
};

export default function Layout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body className={inter.className}>
				<ChatRoomContext>
					<Provider>{children}</Provider>
				</ChatRoomContext>
			</body>
		</html>
	);
}

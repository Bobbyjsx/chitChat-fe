"use client";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import ChatHomeModule from "@/app/module/chat/chat-home/page";
import HydratedPosts from "@/app/hooks/HydratedQueries";
import { get } from "@/app/lib/api";
import { Session, getServerSession } from "next-auth";

type SessionProps = {
	session: Session;
};
const ChatHome = () => <ChatHomeModule />;

export default ChatHome;

export const HydratePosts = ({ session }: SessionProps) => {
	console.log("server ses", session);
	return (
		<HydratedPosts
			fetchFn={() => get(`/user/rooms/${session?.user?.id}`)}
			fetchKey={`/user/rooms/${session?.user?.id}`}>
			<ChatHomeModule />
		</HydratedPosts>
	);
};

async function ServerComponent() {
	const session = await getServerSession(authOptions);
	return (
		<>
			...
			{session?.user && <HydratePosts session={session} />}
		</>
	);
}

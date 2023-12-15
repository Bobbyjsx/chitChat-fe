"use client";
import { useRooms } from "@/app/hooks/useRooms";
import { useUser } from "@/app/hooks/useUser";
import { useParams } from "next/navigation";
import ChatRoomHeader from "@/app/components/headers/ChatRoomHeader";
import { MessageInput } from "@/app/components/MessageInput";

type LayoutProps = {
	children?: React.ReactNode;
};
const ChatRoomContext = ({ children }: LayoutProps) => {
	const params = useParams();
	const { session } = useUser();
	const { getRooms } = useRooms(session?.user.id);
	const activeRoom = getRooms?.find(
		(room) => room.id === params?.roomid
	);
	return (
		<div className="flex flex-col justify-between items-center w-full h-screen bg-slate-500">
			<ChatRoomHeader roomName={`${activeRoom?.name}` ?? "Chat Room"} roomId={`${params?.roomid}`} />
			{children}
			<MessageInput roomId={activeRoom?.id ?? ''} />
		</div>
	);
};

export default ChatRoomContext;

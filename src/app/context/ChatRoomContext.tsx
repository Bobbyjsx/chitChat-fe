"use client";
import { useRooms } from "@/app/hooks/useRooms";
import { useUser } from "@/app/hooks/useUser";
import { useParams } from "next/navigation";
import ChatRoomHeader from "@/app/components/headers/ChatRoomHeader";

type LayoutProps = {
	children?: React.ReactNode;
};
const ChatRoomContext = ({ children }: LayoutProps) => {
	const params = useParams();
	const { session } = useUser();
	const { getRooms, getRoomsIsLoading, getRoomIsError } = useRooms(session?.user.id);
	const activeRoom = getRooms?.find(
		(room) => room.id === params?.roomid
	);
	let roomName;
	if (getRoomsIsLoading) {
		roomName = "Loading..."
	} if (getRoomIsError) {
		roomName = 'Chat Room'
	} if (activeRoom) {
		roomName = `${activeRoom?.name}`
	} else {
		roomName = 'Chat Room'
	}
	return (
		<div className="flex flex-col justify-between items-center w-full h-screen pb-6">
			<ChatRoomHeader
				roomName={`${roomName}`}
				roomId={`${params?.roomid}`}
			/>
			{children}
		</div>
	);
};

export default ChatRoomContext;

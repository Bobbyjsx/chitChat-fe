import { ChatRoomModule } from "@/app/module/chat/chat-room/page";

const ChatRoom = ({ params }: { params: { roomid: string } }) => {
	return <ChatRoomModule roomId={params.roomid.toString()} />;
};

export default ChatRoom;

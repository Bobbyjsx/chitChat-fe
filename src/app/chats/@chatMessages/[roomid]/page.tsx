import ChatRoomModule from "@/app/module/chat/chat-room/page";

const ChatRoom = ({ params }: { params: { roomid: string } }) => {
  return <ChatRoomModule />;
};

export default ChatRoom;

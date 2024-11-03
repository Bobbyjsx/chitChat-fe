interface User {
  id: number;
  username: string;
  email: string;
  // password: string;
  // rooms: ChatRoom[];
  // sent_messages: Message[];
}
interface User2 {
  uuid: number;
  username: string;
  email: string;
  // password: string;
  // rooms: ChatRoom[];
  // sent_messages: Message[];
}
interface ChatRoom {
  id: string;
  name: string;
  members: User[];
  // messages: Message[];
}

interface UserChatRoom {
  user_id: number;
  room_id: string;
}

interface Message {
  id: string;
  sender_id: number;
  content: string;
  time: string;
  room_id: string;
  room: ChatRoom;
  sender: User;
}

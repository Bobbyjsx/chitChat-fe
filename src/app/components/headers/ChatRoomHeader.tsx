import { UserGroupIcon } from "@heroicons/react/20/solid";
import { Bars2Icon } from "@heroicons/react/24/outline";
import Link from "next/link";
import React from "react";

type HeaderProps = {
    roomName: string;
    roomId: string;
};
const ChatRoomHeader = ({ roomName, roomId }: HeaderProps) => {
	return (
		<header className="w-full h-24 bg-slate-900 text-gray-100 flex justify-center items-center ">
			<div className="flex justify-between items-center px-5 w-full h-full">
				<UserGroupIcon className="h-9 w-9" />
				<p className="">{roomName}</p>
				<Link href={`/chats/${roomId}/chat-info`}>
					<Bars2Icon className="h-10" />
				</Link>
			</div>
		</header>
	);
};

export default ChatRoomHeader;

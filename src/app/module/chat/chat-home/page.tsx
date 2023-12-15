"use client";
import { useRooms } from "@/app/hooks/useRooms";
import { useUser } from "@/app/hooks/useUser";
import Link from "next/link";

const ChatHomeModule = () => {
	const { session } = useUser();
  const { getRooms } = useRooms(session?.user.id);
  
	return (
		<main>
			<section className="flex flex-col w-full h-full">
				{getRooms?.map((room, idx) => (
					<Link
						className="w-full h-16 bg-zinc-700 text-indigo-500 pl-44 items-center flex"
						href={`/chats/${room.id}`}
						key={idx}>
						{room?.name}
					</Link>
				))}
			</section>
			<section></section>
			<div className="absolute right-[5%] z-30 bottom-[5%]">
				<Link
					href="/chats/create-room"
					className="bg-indigo-600 text-white rounded-md px-6 py-5 w-14 h-14">
					+
				</Link>
			</div>
		</main>
	);
};

export default ChatHomeModule;

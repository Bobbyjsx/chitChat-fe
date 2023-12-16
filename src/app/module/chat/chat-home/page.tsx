"use client";
import { useRooms } from "@/app/hooks/useRooms";
import { useUser } from "@/app/hooks/useUser";
import Link from "next/link";

const ChatHomeModule = () => {
	const { session } = useUser();
  const { getRooms } = useRooms(session?.user.id);
  
	return (
		<main>
			<section className="flex flex-col w-full h-screen bg-slate-800 overflow-y-scroll gap-y-3">
				{getRooms?.map((room, idx) => (
					<Link
						className="w-full h-16 bg-zinc-700 text-indigo-500 sm:pl-44 sm:justify-start justify-center items-center flex border-zinc-200 border-b-[0.5px] rounded-md"
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

"use client";
import { LoadingSpinner } from "@/app/components/common/LoadingSpinner";
import { useRooms } from "@/app/hooks/useRooms";
import { useUser } from "@/app/hooks/useUser";
import Link from "next/link";
import toast from "react-hot-toast";

const ChatHomeModule = () => {
	const { session } = useUser();
	const { getRooms, getRoomsIsLoading, getRoomIsError } = useRooms(
		session?.user.id
	);

	const { userData: userData } = useUser();
	console.log(userData);
	
	if (getRoomsIsLoading) {
		toast.custom(
			<p className="!bg-yellow-50 !py-4 pr-10 text-sm inline-flex rounded-md px-4 !text-green-900 font-semibold">
				Loading chat rooms...
			</p>
		);
		return (
			<div className="flex items-center justify-center m-auto  flex-col w-full h-screen bg-slate-800">
				<LoadingSpinner  className="border-t-indigo-600 w-9 h-9"/>
			</div>
		);
	}
	if (getRoomIsError) {
		toast.error("An error occurred ");
		return (
			<div className="flex items-center justify-center m-auto  flex-col w-full h-screen bg-slate-800  gap-y-3 text-slate-500">
				<p className="font-semibold text-xl font-mono text-indigo-600">
					OOps!{":("}
				</p>
				<p className="">
					An error occured while getting your chat rooms.
				</p>
				<p className="">
					please confirm you have an active internet or try
					signing in again.
				</p>
				<LoadingSpinner className="border-t-indigo-600 w-5 h-5" />
			</div>
		);
	}
	return (
		<main>
			<section className="flex flex-col w-full h-screen bg-slate-800 overflow-y-scroll gap-y-3">
		{getRooms?.length === 0 ? (
					<div className="flex items-center justify-center m-auto">
						<p className="text-slate-500 ">
							Create a chat room to get started
						</p>
					</div>
				) : (
					getRooms?.map((room, idx) => (
						<Link
							className="w-full h-16 bg-zinc-700 text-indigo-500 sm:pl-44 sm:justify-start justify-center items-center flex border-zinc-200 border-b-[0.5px] rounded-md"
							href={`/chats/${room.id}`}
							key={idx}>
							{room?.name}
						</Link>
					))
				)}
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


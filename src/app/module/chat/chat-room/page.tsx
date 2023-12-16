"use client";
import { useMessage } from "@/app/hooks/useMessage";
import { useUser } from "@/app/hooks/useUser";
import classNames from "classnames";
import { useParams } from "next/navigation";

const ChatRoomModule = () => {
	const params = useParams();
	const { getMessages, refresh } = useMessage(`${params?.roomid}`);
	const { session } = useUser();
	const uuid = session?.user.id;

	const formatTime = (timeString: string) => {
		const date = new Date(timeString);
		const hours = date.getHours().toString().padStart(2, "0");
		const minutes = date.getMinutes().toString().padStart(2, "0");
		return `${hours}:${minutes}`;
	};

	return (
		<div className="w-full h-full bg-slate-500 overflow-y-scroll">
			<div className="w-full h-full flex flex-col">
				{getMessages?.map((message, idx) => (
					<div
						key={idx}
						className={classNames("flex items-center", {
							"justify-end":
								message.senderId.toString() === uuid,
							"justify-start":
								message.senderId.toString() !== uuid,
						})}>
						<div
							className={classNames(
								"bg-slate-700 text-gray-100 max-w-[200px] min-h-[40px] p-2 rounded-lg my-2 flex flex-col"
							)}>
							<p className="break-all">
								{message.content}
							</p>
							<p className="text-xs text-gray-500 flex-col flex items-end justify-center">
								{formatTime(message.time)}
							</p>
						</div>
					</div>
				))}
				<button
					onClick={() => refresh()}
					className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
					Refresh
				</button>
			</div>
		</div>
	);
};

export default ChatRoomModule;

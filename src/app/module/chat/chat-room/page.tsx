"use client";
import { MessageInput } from "@/app/components/MessageInput";
import { LoadingSpinner } from "@/app/components/common/LoadingSpinner";
import { useApiCache } from "@/app/hooks/useApiCache";
import { useMessage } from "@/app/hooks/useMessage";
import { useUser } from "@/app/hooks/useUser";
import { get } from "@/app/lib/api";
import classNames from "classnames";
import { useParams } from "next/navigation";
import toast from "react-hot-toast";

const ChatRoomModule = () => {
	const params = useParams();
	const { getMessages, isError, fetchingMessages } = useMessage(
		`${params?.roomid}`
	);
	const { session } = useUser();
    const uuid = session?.user.id;

	const formatTime = (timeString: string) => {
		const date = new Date(timeString);
		const hours = date.getHours().toString().padStart(2, "0");
        const minutes = date.getMinutes().toString().padStart(2, "0");
        const correctedHours = hours + 1
		return `${correctedHours}:${minutes}`;
	};
	if (fetchingMessages) {
		toast.custom(
			<p className="!bg-yellow-50 !py-4 pr-10 text-sm inline-flex rounded-md px-4 !text-green-900 font-semibold">
				Loading messages...
			</p>
		);
		return (
			<div className="flex items-center justify-center m-auto  flex-col w-full h-screen bg-slate-800">
				<LoadingSpinner className="border-t-indigo-600 w-9 h-9" />
			</div>
		);
	}
	if (isError) {
		toast.error("An error occurred ");
		return (
			<div className="flex items-center justify-center m-auto  flex-col w-full h-screen bg-slate-800  gap-y-3 text-slate-500">
				<p className="font-semibold text-xl font-mono text-indigo-600">
					OOps!{":("}
				</p>
				<p className="">
					An error occured while getting your messages.
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
		<div className="w-full h-full bg-slate-500 overflow-y-scroll">
			<div className="w-full h-full flex flex-col">
				{getMessages?.length === 0 ? (
					<div className="flex items-center justify-center m-auto">
						<p className="text-slate-500 ">
							Send a message to start a conversation
						</p>
					</div>
				) : (
					getMessages?.map((message, idx) => (
						<div
							key={idx}
							className={classNames(
								"flex items-center",
								{
									"justify-end self-end":
										`${message.senderId}` ===
										uuid,
									"justify-start self-start":
										`${message.senderId}` !==
										uuid,
								}
							)}>
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
								<p className="text-xs text-gray-500 flex-col flex items-end justify-center">
                                    { message.username }
								</p>
							</div>
						</div>
					))
				)}
				{/* <button
					onClick={() => refresh()}
					className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
				>
					Refresh
				</button> */}
				<div className="fixed bottom-0 w-full">
					<MessageInput
						roomId={`${params?.roomid}` ?? ""}
					/>
				</div>
			</div>
		</div>
	);
};

export default ChatRoomModule;


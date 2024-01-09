"use client";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";

const ChatLayoutContext = ({ children }: { children: React.ReactNode }) => {
	const { data: session } = useSession({ required: true });
	if (!session) {
		toast.error("Sign-in to view chats");
		return (
			<div className="flex items-center justify-center m-auto  flex-col w-full h-screen bg-slate-800  gap-y-3 text-slate-500">
				<p className="">please sign in to view chats</p>
			</div>
		);
	}
	return (
		<div>
			{/* <nav></nav> */}
			{children}
		</div>
	);
};

export default ChatLayoutContext;

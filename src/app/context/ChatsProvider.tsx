"use client";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";

const ChatLayoutContext = ({ children }: { children: React.ReactNode }) => {
  const { data: session, status } = useSession({ required: true });
  if (!session && status !== "loading") {
    toast.error("Sign-in to view chats");
    return (
      <div className="flex items-center justify-center m-auto  flex-col w-full h-screen bg-slate-800  gap-y-3 text-slate-500">
        <p className="">Please sign in to view chats</p>
      </div>
    );
  }
  return <div>{children}</div>;
};

export default ChatLayoutContext;

"use client";
import { UserGroupIcon } from "@heroicons/react/20/solid";
import { Bars2Icon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React from "react";
import { FaSearch } from "react-icons/fa";
import { FaUserGroup } from "react-icons/fa6";
import { FiPhone, FiVideo, FiMoreVertical } from "react-icons/fi";

type HeaderProps = {
  roomName: string;
  roomId: string;
};
const ChatRoomHeader = ({ roomName, roomId }: HeaderProps) => {
  const pathName = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const handleSearch = () => {
    searchParams.get("search")
      ? router.push(pathName)
      : router.push(`${pathName}?search=true`);
  };
  return (
    <header className="w-full h-24 bg-slate-900 text-gray-100 flex justify-center items-center ">
      {/* <div className="flex justify-between items-center px-5 w-full h-full">
        <UserGroupIcon className="h-9 w-9" />
        <p className="">{roomName}</p>
        <Link href={`/chats/${roomId}/chat-info`}>
          <Bars2Icon className="h-10" />
        </Link>
      </div> */}

      <div className="bg-slate-800 h-16 w-full flex items-center justify-between px-4 border-b border-slate-700">
        <div className="flex items-center space-x-3">
          <FaUserGroup
            className="w-10 h-10 rounded-full"
            onClick={() => router.push("/chats")}
          />
          <div>
            <p className="">{roomName}</p>
          </div>
        </div>
        <div className="flex items-center space-x-4 text-slate-400">
          <FaSearch
            size={18}
            className="cursor-pointer"
            onClick={handleSearch}
          />
          <Link href={`/chats/${roomId}/chat-info`}>
            <FiMoreVertical size={18} />
          </Link>
        </div>
      </div>
    </header>
  );
};

export default ChatRoomHeader;

"use client";
import { Input } from "@/app/components/common/Input";
import { LoadingSpinner } from "@/app/components/common/LoadingSpinner";
import { GetRooms, useRooms } from "@/app/hooks/useRooms";
import { useUser } from "@/app/hooks/useUser";
import Link from "next/link";
import { useState } from "react";
import toast from "react-hot-toast";
import { FaUserGroup } from "react-icons/fa6";
import { FiSearch, FiPlus, FiPhone } from "react-icons/fi";

const ChatHomeModule = () => {
  const { session } = useUser();
  const { getRooms, getRoomsIsLoading, getRoomIsError } = useRooms(
    session?.user.id,
  );

  const [searchQuery, setSearchQuery] = useState("");
  const [filteredRooms, setFilteredRooms] = useState<GetRooms[]>(
    getRooms || [],
  );

  if (getRoomsIsLoading) {
    return (
      <div className="flex items-center justify-center m-auto flex-col w-full h-screen bg-slate-800">
        <LoadingSpinner className="border-t-indigo-600 w-9 h-9" />
      </div>
    );
  }
  if (getRoomIsError) {
    toast.error("An error occurred ");
    return (
      <div className="flex items-center justify-center m-auto flex-col w-full h-screen bg-slate-800 gap-y-3 text-slate-500">
        <p className="font-semibold text-xl font-mono text-indigo-600">
          OOps!{":("}
        </p>
        <p className="">An error occurred while getting your chat rooms.</p>
        <p className="">
          Please confirm you have an active internet connection or try signing
          in again.
        </p>
        <LoadingSpinner className="border-t-indigo-600 w-5 h-5" />
      </div>
    );
  }

  const handleFilter = (e: any) => {
    const value = e.target.value;
    setSearchQuery(value);
    const filteredRooms = getRooms?.filter((room) =>
      room.name.toLowerCase().includes(value.toLowerCase()),
    );
    setFilteredRooms(filteredRooms || []);
  };

  return (
    <main className="relative bg-slate-800 h-screen flex flex-col">
      {/* Search and Tab Section */}
      <section className="w-full h-24 p-4 bg-slate-900 flex flex-col items-center justify-center">
        <div className="flex ml-4 text-slate-400 items-center justify-between w-full">
          <p className="font-semibold text-lg">Chats</p>
          <FiPhone className="cursor-pointer" size={20} />
        </div>
        <div className="flex items-center w-full">
          <div className="w-full">
            <Input
              leadingIcon={<FiSearch className="text-slate-400" size={15} />}
              type="text"
              placeholder="Search Chat"
              value={searchQuery}
              onChange={handleFilter}
              className="bg-transparent outline-none text-slate-200 placeholder-slate-400 !border-gray-950"
            />
          </div>
        </div>
      </section>

      <section className="flex-1 overflow-y-auto px-4 py-2">
        {searchQuery ? (
          <>
            <h3 className="text-slate-400 text-sm font-semibold">
              Search Results
            </h3>
            {filteredRooms.length > 0 ? (
              <div className="flex flex-col gap-2 mt-2">
                {filteredRooms?.map((room, idx) => (
                  <ChatRoom room={room} key={idx} />
                ))}
              </div>
            ) : (
              <p className="text-slate-400 text-sm mt-4 w-full text-center font-semibold">
                No chats found.
              </p>
            )}
          </>
        ) : (
          <>
            {/* Recent Chats */}
            <h3 className="text-slate-400 text-sm font-semibold">Recent</h3>
            <div className="flex flex-col gap-2 mt-2">
              {getRooms
                ?.slice(0, 3)
                .map((room, idx) => <ChatRoom room={room} key={idx} />)}
            </div>

            {/* All Chats */}
            <h3 className="text-slate-400 text-sm font-semibold mt-6">
              All Chats
            </h3>
            <div className="flex flex-col gap-2 mt-2">
              {getRooms?.map((room, idx) => <ChatRoom room={room} key={idx} />)}
            </div>
          </>
        )}
      </section>

      {/* Floating Button */}
      <div className="absolute w-full flex justify-end bottom-[5%] right-[10%]">
        <Link
          href="/create-room"
          className="bg-indigo-600 text-white rounded-full p-3 shadow-lg flex justify-center items-center"
        >
          <FiPlus size={20} />
        </Link>
      </div>
    </main>
  );
};

export default ChatHomeModule;

const ChatRoom = ({ room }: { room: GetRooms }) => {
  return (
    <Link
      key={room.id}
      href={`/chats/${room.id}`}
      className="flex items-center justify-between p-3 bg-zinc-700 rounded-lg"
    >
      <div className="flex items-center space-x-3">
        <FaUserGroup className="w-10 h-10 bg-slate-800 text-gray-200 rounded-full" />
        <div>
          <p className="text-slate-200">{room?.name}</p>
          {/* <p className="text-xs text-slate-400">Great project!</p> */}
        </div>
      </div>
      {/* <span className="text-slate-400 text-xs">9:32AM</span> */}
    </Link>
  );
};

"use client";
import { MessageInput } from "@/app/components/MessageInput";
import { Input } from "@/app/components/common/Input";
import { LoadingSpinner } from "@/app/components/common/LoadingSpinner";
import { GetMessages, useMessage } from "@/app/hooks/useMessage";
import { useUser } from "@/app/hooks/useUser";
import classNames from "classnames";
import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { FaUser } from "react-icons/fa";
import { FiX } from "react-icons/fi";

// In your component:
const ChatRoomModule = () => {
  const params = useParams();
  const queryParams = useSearchParams();
  const isSearch = Boolean(queryParams.get("search"));
  const pathName = usePathname();
  const router = useRouter();

  const { getMessages, isError, fetchingMessages } = useMessage(
    `${params?.roomid}`,
  );
  const { session } = useUser();
  const uuid = session?.user.id;

  // Ref for scrolling
  const messagesEndRef = useRef(null);

  const [searchTerm, setSearchTerm] = useState(""); // Search state
  const [filteredMessages, setFilteredMessages] = useState<GetMessages[] | []>(
    [],
  );

  const formatTime = (time: string) =>
    new Date(time).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

  // Auto-scroll to bottom
  useEffect(() => {
    (messagesEndRef?.current as any)?.scrollIntoView({ behavior: "smooth" });
  }, [getMessages, searchTerm, filteredMessages]);

  // Filter messages by search term
  useEffect(() => {
    if (!getMessages) return;
    const filtered = searchTerm
      ? getMessages.filter((msg) =>
          msg.content.toLowerCase().includes(searchTerm.toLowerCase()),
        )
      : getMessages || [];

    setFilteredMessages(filtered);
  }, [searchTerm, getMessages]);

  if (fetchingMessages) {
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
        <p className="">An error occurred while getting your messages.</p>
        <p className="">
          Please confirm you have an active internet connection or try signing
          in again.
        </p>
        <LoadingSpinner className="border-t-indigo-600 w-5 h-5" />
      </div>
    );
  }

  const handleClearSearch = () => {
    setSearchTerm("");
    router.push(`${pathName}`);
  };

  return (
    <div className="w-full h-[91vh] xl:h-[92.4vh] 2xl:h-[93.7vh] flex flex-col bg-slate-900">
      {isSearch && (
        <section className="">
          <Input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search messages"
            className="flex-1 p-2 text-sm text-slate-100 bg-slate-800 border border-slate-700 rounded-md"
            trailingIcon={
              <button
                onClick={handleClearSearch}
                className="p-1 text-gray-400 "
              >
                Cancel
              </button>
            }
          />
        </section>
      )}
      {/* Chat messages */}
      <div className="flex-1 w-full overflow-y-auto px-4 py-4 space-y-4">
        {filteredMessages?.length === 0 ? (
          <div className="flex items-center justify-center m-auto h-full">
            <p className="text-slate-500">
              Send a message to start a conversation
            </p>
          </div>
        ) : (
          filteredMessages?.map((message, idx) => (
            <div
              key={idx}
              className={classNames(
                "flex gap-x-2 w-full items-end justify-end",
                {
                  "justify-end self-end flex-row-reverse":
                    `${message.senderId}` !== uuid, // Your messages on the right
                  "justify-start self-start": `${message.senderId}` === uuid, // Other users' messages on the left
                },
              )}
            >
              {/* Profile icon */}
              <div className="w-8 h-8 rounded-full bg-gray-500 p-1 flex justify-center items-center">
                <FaUser className="text-white" />
              </div>

              {/* Message content */}
              <div
                className={classNames(
                  "max-w-[70%] min-w-[50px] p-3 rounded-sm ",
                  {
                    "bg-indigo-600 text-white rounded-tl-3xl":
                      `${message.senderId}` === uuid,
                    "bg-slate-700 text-gray-100 rounded-tr-3xl flex flex-col items-end":
                      `${message.senderId}` !== uuid,
                  },
                )}
              >
                <p className="text-sm break-words">{message.content}</p>
                <p className="text-xs text-gray-400 mt-1">
                  {formatTime(message.time)}
                </p>
              </div>
            </div>
          ))
        )}

        {/* This div ensures the page scrolls to the bottom */}
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <div className="bg-slate-800 px-4 pb-4 border-t border-slate-700">
        <MessageInput roomId={`${params?.roomid}` ?? ""} />
      </div>
    </div>
  );
};

export default ChatRoomModule;

"use client";
import { useRooms } from "@/app/hooks/useRooms";
import { useParams, usePathname, useRouter } from "next/navigation";
import { useUser } from "@/app/hooks/useUser";
import { PlusCircleIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Input } from "@/app/components/common/Input";
import { Modal } from "@/app/components/Modal";
import { get } from "@/app/lib/api";
import { Button } from "@/app/components/common/Button";
import toast from "react-hot-toast";
import { FaUser } from "react-icons/fa";
import { FaUserGroup } from "react-icons/fa6";
import { FiLoader } from "react-icons/fi";

type InputProps = { userEmail: string };

const ChatInfo = () => {
  const params = useParams();
  const router = useRouter();
  const { session } = useUser();
  const { getRooms, addUserToRoom, getRoomsIsLoading } = useRooms(
    `${session?.user.id}`,
  );
  const activeRoom = getRooms?.find((room) => room.id === params?.roomid);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const toggleModal = () => {
    setIsModalOpen((prevState) => !prevState);
  };

  const { register, handleSubmit } = useForm<InputProps>();

  const onSubmit: SubmitHandler<InputProps> = async (value) => {
    const data: any = await get(`/user/${value.userEmail}`);
    try {
      await addUserToRoom({
        uuid: data?.uuid.toString(),
        roomId: params?.roomid.toString(),
      });
      setIsModalOpen(false);
      toast.success(`${value.userEmail} has been added`);
    } catch (error: any) {
      toast.error(`${error?.message}` ?? "An error occurred");
      console.error(error);
    }
  };

  const path = usePathname();
  const handleClose = () => {
    const route = path?.split("/")?.slice(0, -1).join("/");
    router.push(route || "/chat");
  };

  // useEffect(() => {
  //   // Function to handle the "beforeunload" event
  //   const handleBeforeUnload = (event: BeforeUnloadEvent) => {
  //     handleClose(); // Call your cleanup function

  //     // Optionally, show a confirmation dialog (not supported in all browsers)
  //     event.preventDefault();
  //     event.returnValue = ""; // Chrome requires returnValue to be set
  //   };

  //   // Add event listener for beforeunload
  //   window.addEventListener("beforeunload", handleBeforeUnload);

  //   // Cleanup on component unmount or page reload
  //   return () => {
  //     handleClose(); // Call your function on component unmount
  //     window.removeEventListener("beforeunload", handleBeforeUnload); // Remove event listener
  //   };
  // }, []);

  return (
    <Modal
      isOpen={true}
      setIsOpen={handleClose}
      transparent={isModalOpen}
      modalContainerClassName="!bg-slate-800 w-[90%] sm:w-1/2"
    >
      <main className="w-full h-full flex flex-col justify-start mt-2 items-start bg-slate-800">
        <div className="w-full h-full flex flex-col justify-between items-center">
          {/* Avatar Section */}
          <section className="w-full flex flex-col justify-center items-center mt-8">
            <div className="relative">
              <FaUserGroup className="rounded-full h-32 w-32 border-4 border-gray-500" />
              <span className="absolute bottom-0 right-2 h-4 w-4 bg-green-500 rounded-full border-2 border-white"></span>
            </div>
            <p className="text-2xl font-semibold text-white mt-3">
              {activeRoom?.name}
            </p>
            {/* <p className="text-sm text-gray-400">{session?.user.email}</p> */}

            {/* Contact Icons */}
            {/* <div className="flex space-x-4 mt-3">
              <PhoneIcon className="h-6 w-6 text-gray-400" />
              <FaMailBulk className="h-6 w-6 text-gray-400" />
              <VideoCameraIcon className="h-6 w-6 text-gray-400" />
            </div> */}
          </section>

          {/* Participants Section */}
          <section className="w-full mt-8">
            <div className="flex justify-between items-center px-4 mb-3">
              <p className="text-lg text-gray-300">Participants</p>
              <button
                className="text-blue-500 flex justify-end items-center gap-x-3 w-full"
                onClick={toggleModal}
              >
                <PlusCircleIcon className="h-6 w-6" />
                Add
              </button>
            </div>
            <div className="w-full bg-gray-800 p-4 rounded-lg space-y-3 min-h-[100px] flex flex-col justify-center items-center">
              {/* Add Participant Button */}

              {getRoomsIsLoading && (
                <div className="flex justify-center items-center h-full w-full">
                  <FiLoader className="text-gray-400 w-20 h-20 animate-spin-slow" />
                </div>
              )}

              {/* List of Participants */}
              {!getRoomsIsLoading &&
                activeRoom?.members.map((member, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between text-gray-400 bg-gray-900 rounded-md p-2 w-full"
                  >
                    <div className="flex items-center space-x-3">
                      <FaUser className="h-6 w-6 rounded-full bg-gray-500 p-1" />
                      <div>
                        <p className="text-sm text-white">{member.username}</p>
                        <p className="text-xs text-gray-500">{member.email}</p>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </section>

          {/* Add Participant Modal */}
          <Modal isOpen={isModalOpen} setIsOpen={toggleModal}>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <p className="text-sm text-gray-400">
                Add users to this chat room by their email
              </p>
              <Input
                {...register("userEmail", {
                  required: true,
                })}
                placeholder="E-mail"
              />
              <Button title="Add" type="submit" />
            </form>
          </Modal>
        </div>
      </main>
    </Modal>
  );
};

export default ChatInfo;

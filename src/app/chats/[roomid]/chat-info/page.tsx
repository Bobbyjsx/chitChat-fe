"use client";
import { useRooms } from "@/app/hooks/useRooms";
import { useParams } from "next/navigation";
import { UserGroupIcon } from "@heroicons/react/20/solid";
import { useUser } from "@/app/hooks/useUser";
import { PlusCircleIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Input } from "@/app/components/common/Input";
import { Modal } from "@/app/components/Modal";
import { get } from "@/app/lib/api";

type InputProps = { userEmail: string };

const ChatInfo = () => {
	const params = useParams();
	const { session } = useUser();
	const { getRooms } = useRooms(`${session?.user.id}`);
	const activeRoom = getRooms?.find(
		(room) => room.id === params?.roomid
	);
	const handleAdd = () => {};
	const [isModalOpen, setIsModalOpen] = useState(false);
const toggleModal = () => {
	setIsModalOpen((prevState) => !prevState);
};
	return (
		<main className="w-full h-full flex flex-col justify-between mt-24 items-center">
			<section className="w-full">
				<div className="flex  flex-col justify-between items-center  w-full h-full space-y-5">
					<UserGroupIcon className="h-64 w-64 border rounded-full bg-gray-300 p-5" />
					<p className="text-5xl font-sans font-semibold text-gray-100">
						{activeRoom?.name}
					</p>
				</div>
			</section>
			<section className="">
				<p className="">
					{activeRoom?.members.length} Participants
				</p>

				<div className="border-[0.5px] border-zinc-200 rounded-lg w-72">
					<button
            className="text-blue-500 bg-slate-800 w-full h-12 flex justify-start items-center gap-x-5"
            onClick={toggleModal}>
						<span className="">
							<PlusCircleIcon className="h-9 w-9" />
						</span>
						Add Participant To Group
					</button>

					{activeRoom?.members.map((member, idx) => {
						return (
							<div
								key={idx}
								className="text-blue-500 bg-slate-800 h-12 flex">
								{member.username}
							</div>
						);
					})}
				</div>
			</section>

			<Modal
				isOpen={isModalOpen}
				setIsOpen={toggleModal}>
				<AddToChat />
			</Modal>
		</main>
	);
};

export default ChatInfo;

function AddToChat() {
	const { session, } = useUser();
	const { addUserToRoom } = useRooms(`${session?.user.id}`);
	const params = useParams();

	const { register, handleSubmit } = useForm<InputProps>();

  const onSubmit: SubmitHandler<InputProps> = async (value) => {
   const data =  await get<User2>(`/user/${value.userEmail}`)
    try {
      
			await addUserToRoom({
				uuid: data?.uuid.toString(),
				roomId: params?.roomid.toString(),
			});
		} catch (error) {
			console.error(error);
		}
	};
	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<Input {...register("userEmail", { required: true })} />
		</form>
	);
}


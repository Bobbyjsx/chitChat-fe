"use client";
import { useRooms } from "@/app/hooks/useRooms";
import { useParams, useRouter } from "next/navigation";
import { UserGroupIcon } from "@heroicons/react/20/solid";
import { useUser } from "@/app/hooks/useUser";
import {
	BackwardIcon,
	PlusCircleIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Input } from "@/app/components/common/Input";
import { Modal } from "@/app/components/Modal";
import { get } from "@/app/lib/api";
import { Button } from "@/app/components/common/Button";
import toast from "react-hot-toast";

type InputProps = { userEmail: string };

const ChatInfo = () => {
	const params = useParams();
	const router = useRouter();
	const { session } = useUser();
	const { getRooms, addUserToRoom } = useRooms(
		`${session?.user.id}`
	);
	const activeRoom = getRooms?.find(
		(room) => room.id === params?.roomid
	);
	const handleAdd = () => {};
	const [isModalOpen, setIsModalOpen] = useState(false);
	const toggleModal = () => {
		setIsModalOpen((prevState) => !prevState);
	};
	const { register, handleSubmit } = useForm<InputProps>();

	const onSubmit: SubmitHandler<InputProps> = async (value) => {
		const data = await get<User2>(`/user/${value.userEmail}`);
		try {
			await addUserToRoom({
				uuid: data?.uuid.toString(),
				roomId: params?.roomid.toString(),
			});
			setIsModalOpen(false);
			toast.success(`${value.userEmail} has been added`)
		} catch (error) {
			toast.error("An error occured")
			console.error(error);
		}
	};
	return (
		<main className="w-full h-full flex flex-col justify-start mt-2 items-start">
			<button
				onClick={() => router.back()}
				title="Back to chats"
				className="pl-3">
				<BackwardIcon className="text-indigo-400 w-20 h-20 text-bold" />
			</button>
			<div className="w-full h-full flex flex-col justify-between mt-16 items-center">
				<section className="w-full">
					<div className="flex  flex-col justify-between items-center  w-full h-full space-y-5">
						<UserGroupIcon className="h-64 w-64 border rounded-full bg-gray-300 p-5" />
						<p className="text-5xl font-sans font-semibold text-gray-100">
							{activeRoom?.name}
						</p>
					</div>
				</section>

				<section className=" gap-y-2">
					<section className="flex mb-2 ml-2 gap-x-3 justify-start items-center text-gray-200">
						<p className="">Room</p>
						<p className="font-extrabold text-2xl text-slate-300 flex flex-col text-center justify-center items-center">
							&#x2022;
						</p>
						<p className="">
							{activeRoom?.members.length} Participants
						</p>
					</section>

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
					<form
						onSubmit={handleSubmit(onSubmit)}
						className="space-y-5">
						<p className="text-xs font-mono font-light text-gray-500 w-96">
							Add users to this chat room by their email
						</p>
						<Input
							{...register("userEmail", {
								required: true,
							})}
							placeholder="E-mail"
						/>
						<Button
							title="Add"
							type="submit"
						/>
					</form>
				</Modal>
			</div>
		</main>
	);
};

export default ChatInfo;

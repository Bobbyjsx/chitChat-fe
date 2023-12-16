"use client";
import { Input } from "@/app/components/common/Input";
import { SubmitHandler, useForm } from "react-hook-form";
import { useRooms } from "@/app/hooks/useRooms";
import { useUser } from "@/app/hooks/useUser";
import Link from "next/link";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

type FormValues = {
	name: string;
};
const CreateRoom = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FormValues>();
	const { userData, userIsLoading } = useUser();
	const { getRooms, createChatRoom } = useRooms(
		userData?.uuid || ""
	);
	const router = useRouter();
	const onSubmit: SubmitHandler<FormValues> = async (values) => {
		try {
			console.log(values);

			await createChatRoom({
				name: values?.name,
				members: [userData!.uuid],
			});
			toast.success("Room created");
			router.replace("/chats");
		} catch (error) {
			toast.error("An error occurred");
			console.error(error);
		}
	};

	return (
		<main>
			<form onSubmit={handleSubmit(onSubmit)}>
				{" "}
				<Input {...register("name")} />
				<button
					type="submit"
					className="text-white bg-indigo-600 p-8">
					create
				</button>
			</form>
		</main>
	);
};

export default CreateRoom;

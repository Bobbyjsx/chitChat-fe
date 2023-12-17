"use client";
import React, { ChangeEvent, useState, useEffect } from "react";
import Typing from "./Typing";
import { Input } from "./common/Input";
import { SubmitHandler, useForm } from "react-hook-form";
import { PaperAirplaneIcon } from "@heroicons/react/20/solid";
import { useMessage } from "../hooks/useMessage";
import { useUser } from "../hooks/useUser";
import toast from "react-hot-toast";

interface MessageProps {
	message: string;
	time: string;
	uuid: string;
	recieverId: string;
}

interface FormInput {
	input: string;
}

export const MessageInput = ({ roomId }: { roomId: string }) => {
	const { sendMessage } = useMessage(roomId);
	const { session } = useUser();

	const {
		register,
		formState: { isSubmitting },
		handleSubmit,
		reset,
	} = useForm<FormInput>({
		defaultValues: {
			input: "",
		},
	});

	const [typing, setTyping] = useState(false);

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		setTyping(true);
		resetTimer();
	};

	const handleKeyPress = () => {
		setTyping(true);
		resetTimer();
	};

	const resetTimer = () => {
		setTyping(true);

		// Clear the existing timer
		clearTimeout(timerId);

		// Set a new timer to reset typing after 2000 milliseconds (2 seconds)
		timerId = setTimeout(() => {
			setTyping(false);
		}, 2000);
	};

	let timerId: NodeJS.Timeout;

	const onSubmit: SubmitHandler<FormInput> = async (data) => {
		try {
			await sendMessage({
				content: data.input,
				sender_id: `${session?.user.id}`,
			});
			toast.success('Sent')
			reset();
			setTyping(false);
		} catch (err) {
			toast.error("Error sending text")
			throw err;
		}
	};

	useEffect(() => {
		// Clear the timer when the component unmounts
		return () => clearTimeout(timerId);
	}, []);

	return (
		<div className="w-full bg-slate-500">
			{/* <Typing typing={typing} /> */}
			<form onSubmit={handleSubmit(onSubmit)}>
				<Input
					{...register("input", { required: true })}
					placeholder="Type a message"
					onBlur={() => setTyping(false)}
					onKeyDown={handleKeyPress}
					trailingIcon={
						<button
							className="w-10 h-7"
							title="Send"
							type="submit">
							<PaperAirplaneIcon className="text-indigo-600 h-full w-full" />
						</button>
					}
				/>
			</form>
		</div>
	);
};

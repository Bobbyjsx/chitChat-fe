"use client";
import { useMutation } from "@tanstack/react-query";
import { useApiCache } from "./useApiCache";
import { post } from "../lib/api";

type SendMessage = {
	content: string;
	sender_id: string;
};
type GetMessages = {
	content: string;
	id: string;
	roomId: string;
	senderId: string;
	time: string;
};

export const useMessage = (roomId: string) => {
	const { data: getMessages, isLoading: fetchingMessages, refresh } =
		useApiCache<GetMessages[]>(`/messages/${roomId}`);

	const {
		mutateAsync: sendMessage,
		isPending: sending,
		isSuccess: sent,
		isError: notSent,
	} = useMutation<void, Error, SendMessage>({
		mutationFn: (payload) => post(`/messages/${roomId}`, payload),
	});

	return {
		getMessages,
		fetchingMessages,
		sendMessage,
		sending,
		sent,
		notSent,
		refresh,
	};
};


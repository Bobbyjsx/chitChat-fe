"use client";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useApiCache } from "./useApiCache";
import { get, post } from "../lib/api";

type SendMessage = {
	content: string;
	sender_id: string;
};
export type GetMessages = {
	content: string;
	id: string;
	roomId: string;
	senderId: string;
	time: string;
};

export const useMessage = (roomId: string) => {
	const {
		data: getMessages,
		isLoading: fetchingMessages,
		refetch: refresh,
	} = useQuery<GetMessages[]>({
		queryKey: [`/messages/${roomId}`],
		queryFn: () => get(`/messages/${roomId}`),
		refetchInterval: 2000,
	});

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


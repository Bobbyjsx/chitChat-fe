"use client";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useApiCache } from "./useApiCache";
import { post, get } from "../lib/api";

type AddUsers = { uuid: string; roomId: string };
type CreateRoom = { name: string; members: string[]; }
type GetRooms = {
	id: string;
	name: string;
	members: User[];
}
export const useRooms = (uuid: string) => {
	const fetchRoomPath = `/user/rooms/${uuid}`

    const {
		data: getRooms,
		isLoading: getRoomsIsLoading,
		error: getRoomIsError,
	} = useQuery<GetRooms[]>({
		queryKey: [fetchRoomPath],
		queryFn: () => get(fetchRoomPath),
		refetchInterval: 3000,
	});
    
    const { mutateAsync: addUserToRoom } = useMutation<
		void,
		Error,
		AddUsers
	>({
		mutationFn: ({ uuid, roomId }) =>
			post(`/users/${uuid}/rooms/${roomId}`),
	});
    const { mutateAsync: createChatRoom } = useMutation<
		void,
		Error,
		CreateRoom
	>({
		mutationFn: (payload: CreateRoom) =>
			post("/chat-room", payload),
	});
        
	

    return {
        createChatRoom,
        addUserToRoom,
		getRooms,
		getRoomsIsLoading,
		getRoomIsError,
	};
};

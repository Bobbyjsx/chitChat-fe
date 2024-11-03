"use client";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useApiCache } from "./useApiCache";
import { post, get } from "../lib/api";

type AddUsers = { uuid: string; roomId: string };
type CreateRoom = { name: string; members: string[] };
export type GetRooms = {
  id: string;
  name: string;
  members: User[];
};
export const useRooms = (uuid: string) => {
  const fetchRoomPath = `/user/rooms/${uuid}`;
  const recallTime = uuid ? 2000 : false;

  const {
    data: getRooms,
    isLoading: getRoomsIsLoading,
    error: getRoomIsError,
  } = useQuery<GetRooms[]>({
    queryKey: [fetchRoomPath],
    queryFn: () => get(fetchRoomPath),
    refetchInterval: recallTime,
  });

  const { mutateAsync: addUserToRoom, isPending: isAddingUser } = useMutation<
    void,
    Error,
    AddUsers
  >({
    mutationFn: ({ uuid, roomId }) => post(`/users/${uuid}/rooms/${roomId}`),
  });
  const { mutateAsync: createChatRoom, isPending: isCreatingRoom } =
    useMutation<void, Error, CreateRoom>({
      mutationFn: (payload: CreateRoom) => post("/chat-room", payload),
    });

  return {
    createChatRoom,
    addUserToRoom,
    getRooms,
    getRoomsIsLoading,
    getRoomIsError,
    isAddingUser,
    isCreatingRoom,
  };
};

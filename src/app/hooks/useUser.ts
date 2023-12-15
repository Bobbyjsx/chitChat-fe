"use client";
import { useApiCache } from "./useApiCache";
import { useSession } from "next-auth/react";

export type UserProps= {
    uuid: string;
    email: string;
    userName: string;
    rooms: any[];
    sentMessages: any[];
}
export const useUser =  () => {
	const { data: session } = useSession();
	const email =  session?.user?.email;

	const {
		data: userData,
		error,
		isLoading: userIsLoading,
	} = useApiCache<UserProps>(`/user/${email}`);

	return {
		session,
		userData,
		error,
		userIsLoading,
	};
};

"use client";
import toast from "react-hot-toast";
import { FetchError } from "../lib/api";
import { useApiCache } from "./useApiCache";
import { signOut, useSession } from "next-auth/react";

export type UserProps = {
  uuid: string;
  email: string;
  userName: string;
  rooms: any[];
  sentMessages: any[];
};
export const useUser = () => {
  const { data: session } = useSession();
  const email = session?.user?.email;

  const {
    data: userData,
    error,
    isLoading: userIsLoading,
  } = useApiCache<UserProps>(`/user/${email}`);

  if (session && error instanceof FetchError) {
    if (error.status === 401) {
      signOut();
      toast.error("You are not logged in");
      toast.success("You have been signed out");
      if (window !== undefined) {
        window.location.href = "/sign-in";
      }
    }
    if (error.status === 403) {
      signOut();
      toast.error("You are not authorized");
      toast.success("You have been signed out");
      if (window !== undefined) {
        window.location.href = "/sign-in";
      }
    }
    if (error.status === 404) {
      signOut();
      toast.error("User not found");
      toast.success("You have been signed out");
      if (window !== undefined) {
        window.location.href = "/sign-in";
      }
    }
    toast.error(error.message);
    toast.success("You have been signed out");
    if (window !== undefined) {
      window.location.href = "/sign-in";
    }
  }

  return {
    session,
    userData,
    error,
    userIsLoading,
  };
};

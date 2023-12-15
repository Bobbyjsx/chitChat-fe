"use client";
import { useMutation, MutationFunction } from "@tanstack/react-query";
import { signIn } from "next-auth/react";
import { post } from "../lib/api";

export type SignUpPayload = {
	password: string;
	email: string;
	username: string;
	confirmPassword?: string;
	termsCondition?: boolean;
};


const createUserAndSignIn: MutationFunction<
	void,
	SignUpPayload
> = async (data) => {
	await post("/auth/sign-up", data);
	await signIn("credentials", {
		email: data.email,
		password: data.password,
		redirect: false,
	});
};

export const useAuth = () => {

	const query = useMutation<void, Error, SignUpPayload>({
		mutationFn: createUserAndSignIn,
	});

	const signUpAndSignIn = async (payload: SignUpPayload) => {
		await query.mutateAsync({
			email: payload.email,
			username: payload.username,
			password: payload.password,
		});
	};
	return {
		signUpAndSignIn,
	};
};

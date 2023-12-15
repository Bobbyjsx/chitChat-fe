"use client";
import {
	QueryClient,
	QueryClientProvider,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { SessionProvider } from "next-auth/react";
import { useState } from "react";

type LayoutProps = {
	children?: React.ReactNode;
	session?: any;
};

const Provider = ({ children, session }: LayoutProps) => {
	const queryClient = new QueryClient({
		defaultOptions: {
			queries: {
				staleTime: 60 * 1000,
			},
		},
	});
	return (
		<QueryClientProvider client={queryClient}>
			<SessionProvider session={session}>
				{children}
			</SessionProvider>
			<ReactQueryDevtools initialIsOpen={false} />
		</QueryClientProvider>
	);
};

export default Provider;

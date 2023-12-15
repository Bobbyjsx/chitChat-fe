import {
	dehydrate,
	HydrationBoundary,
	QueryClient,
} from "@tanstack/react-query";

type HydratedProps = {
	fetchFn: () => any;
	fetchKey: string;
	children: React.ReactNode;
};
export default async function HydratedPosts({
	fetchFn,
	fetchKey,
	children,
}: HydratedProps) {
    const queryClient = new QueryClient();
    
	await queryClient.prefetchQuery({
		queryKey: [fetchKey],
		queryFn: fetchFn,
    });
    
	const dehydratedState = dehydrate(queryClient);

	return (
		<HydrationBoundary state={dehydratedState}>
			{children}
		</HydrationBoundary>
	);
}

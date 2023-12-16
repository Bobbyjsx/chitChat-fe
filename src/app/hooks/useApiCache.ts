import { useCallback } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";

import { get } from "../lib/api";
/**
 * Provide a thin abstraction over useQuery to enforce consistent caching
 * behavior. Should not be used directly in presentation components, which
 * should prefer to consume API responses through other hooks.
 */
export const useApiCache = <T>(
	path: string,
	// accessToken?: string
) => {
	const queryClient = useQueryClient();

	// const authenticatedFetcher = useCallback(
	// 	() => getWithToken<T>(path, accessToken),
	// 	[path, accessToken]
	// );

	const fetcher = useCallback(() => get<T>(path), [path]);

	const { data, error, isLoading } = useQuery({
		queryKey: [path],
		queryFn: fetcher,
		
	});

	const refresh = useCallback(() => {
		queryClient.invalidateQueries({ queryKey: [path] });
	}, [queryClient, path]);

	// if (data === undefined) {
	//   throw Error('data undefined but suspense is enabled');
	// }

	return { data, error, isLoading, refresh };
};

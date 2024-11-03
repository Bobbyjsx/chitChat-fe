import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
// import {
// 	useMutation,
// 	useQuery,
// 	useQueryClient,
// } from "@tanstack/react-query";
import camelCaseKeys from "camelcase-keys";
import { signOut } from "next-auth/react";
import snakeCase from "snakecase-keys";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});
export class FetchError extends Error {
  status?: number;
}

const fetchJson = async <T>(
  ...[input, init]: [string, RequestInit | undefined]
): Promise<T> => {
  const headers = {
    "Content-Type": "application/json",
    ...init?.headers,
  };

  const response = await fetch(input, { ...init, headers });

  if (!response.ok && response.status === 403) {
    signOut();
  }

  if (!response.ok) {
    const error = new FetchError(await response.text());
    error.status = response.status;

    throw error;
  }

  const body = await response.json().catch(() => ({}));
  return camelCaseKeys(body, { deep: true });
};
/** Execute a Get request and return the parsed JSON response. this is deduped by Next through Fetch() function. */

export const get = async <T>(
  path: string,
  headers?: Record<string, string>,
) => {
  const url = new URL(path, BASE_URL);
  return await fetchJson<T>(url.href, { headers });
};

// export const get = async <T>(
// 	path: string,
// 	headers?: Record<string, string>
// ) => {
// 	const { data } = await axiosInstance.get<T>(path);

// 	return data;
// };

/** Execute a POST request and return the parsed JSON response. */
export const post = async <T>(
  path: string,
  body?: Record<string, any>,
  headers?: Record<string, string>,
) => {
  const { data } = await axiosInstance.post<T>(path, body);
  return data;
};

interface UseQueryResult<T> {
  data: T | undefined;
  isPending: boolean;
  isError: unknown;
}

interface UseMutationResult<TData, TError, TVariables> {
  mutate: (variables?: TVariables) => Promise<TData | undefined>;
  isLoading: boolean;
  error: TError | undefined;
}

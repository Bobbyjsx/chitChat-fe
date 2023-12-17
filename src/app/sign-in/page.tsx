"use client";
import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { yupResolver } from "@hookform/resolvers/yup";
import { Anchor } from "../components/common/Anchor";
import { Button } from "../components/common/Button";
import { Input } from "../components/common/Input";
import { PasswordInput } from "../components/common/PasswordInput";
import {
	useRouter,
	useSearchParams,
	usePathname,
} from "next/navigation";
import { signIn, useSession } from "next-auth/react";
import * as Yup from "yup";

const SignInSchema = Yup.object({
	email: Yup.string().email("Invalid email").required("Required"),
	password: Yup.string().required("Required"),
});

type SignInValues = {
	email: string;
	password: string;
};

const SignIn = () => {
	const router = useRouter();
	const searchParams = useSearchParams();
	const { data: session, status } = useSession();
	const callbackUrl = searchParams.get("callbackUrl") || "/";
	const pathname = usePathname();

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<SignInValues>({
		resolver: yupResolver(SignInSchema),
	});

	useEffect(() => {
		if (session && pathname === "/sign-in") {
			if (callbackUrl) {
				router.replace(callbackUrl);
			} else {
				router.replace("/chats");
			}
		}
	}, [session, pathname, router, callbackUrl]);

	const onSubmit: SubmitHandler<SignInValues> = async (values) => {
		try {
			const { ok, error }: any = await signIn("credentials", {
				redirect: false,
				...values,
			});

			if (ok) {
				callbackUrl
					? router.replace(callbackUrl as string)
					: await router.push("/chats");
				toast.success("Sign-in successful");
			}
			if (error) {
				toast.error(error);
			}
		} catch (error) {
			toast.error("Error signing in");
			console.error(error);
		}
	};

	return (
		<div className="w-full items-center justify-center">
			<div className="sm:mx-auto sm:w-full sm:max-w-md">
				{/* <picture>
					<img
						alt="SokoSQ Logo"
						className="mx-auto h-10 w-auto sm:hidden"
						src="/images/sm-logo.svg"
					/>
				</picture> */}
				<h2 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
					Sign in to your account
				</h2>
			</div>

			<div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
				<div className="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
					<form
						className="space-y-6"
						onSubmit={handleSubmit(onSubmit)}>
						<div>
							<Input
								error={errors.email?.message}
								label="Email address"
								type="email"
								{...register("email")}
							/>
						</div>

						<div>
							<PasswordInput
								error={errors.password?.message}
								label="Password"
								{...register("password")}
							/>
						</div>

						<div className="flex items-center justify-end">
							<div className="text-sm leading-6">
								<Anchor href="/forgot-password">
									Forgot password?
								</Anchor>
							</div>
						</div>

						<div>
							<Button
								className="w-full"
								disabled={isSubmitting}
								isLoading={isSubmitting}
								type="submit">
								Sign in
							</Button>
						</div>
					</form>
				</div>

				<p className="mt-10 text-center text-sm text-gray-500">
					Don&apos;t have an account?{" "}
					<Anchor href="/sign-up">Sign up</Anchor>
				</p>
			</div>
		</div>
	);
};

export default SignIn;

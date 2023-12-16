"use client";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { yupResolver } from "@hookform/resolvers/yup";
import { Anchor } from "../components/common/Anchor";
import { Button } from "../components/common/Button";
import { Input } from "../components/common/Input";
import { PasswordInput } from "../components/common/PasswordInput";
import { useRouter } from "next/navigation";
import { SignUpPayload, useAuth } from "@/app/hooks/useAuth";
import { FetchError } from "@/app/lib/api";
import * as Yup from "yup";

const SignUpSchema = Yup.object({
	confirmPassword: Yup.string().oneOf(
		[Yup.ref("password")],
		"Passwords must match"
	),
	email: Yup.string().email("Invalid email").required("Required"),
	username: Yup.string().required("Required"),
	password: Yup.string()
		.min(8, "Enter a minimum of 8 characters")
		.required("Required"),
	termsCondition: Yup.bool().oneOf(
		[true],
		"Please accept our terms and condition"
	),
});

const SignUp = () => {
	const router = useRouter();
	const { signUpAndSignIn } = useAuth();

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
		reset,
	} = useForm<SignUpPayload>({
		resolver: yupResolver(SignUpSchema),
	});

	const onSubmit = async (values: SignUpPayload) => {
		const { username, email, password } = values;
		try {
			await signUpAndSignIn({
				username: username,
				email: email,
				password: password,
			});
			toast.success("Account created successfully!");
			await router.push("/chats");
		} catch (error) {
			if (error instanceof FetchError) {
				toast.error(error.message);
				return;
			}

			toast.error("Error creating account. Please try again.");
			console.error(error);
		} finally {
			reset(values, {
				keepDirty: true,
				keepErrors: true,
				keepValues: true,
			});
		}
	};

	return (
		<>
			<div className="sm:mx-auto sm:w-full sm:max-w-md">
				<h2 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
					Create account
				</h2>
				<h2 className="mt-2 px-2 text-center text-base leading-9 tracking-tight text-gray-900">
					Welcome to the world of gist
				</h2>
			</div>

			<div className="sm:mx-auto sm:w-full sm:max-w-[580px]">
				<div className="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
					<form
						className="grid grid-cols-1 gap-x-5 gap-y-5"
						onSubmit={handleSubmit(onSubmit)}>
						<Input
							className="col-span-full w-full"
							error={errors.username?.message}
							label="User Name"
							{...register("username")}
						/>
						<div className="col-span-full">
							<Input
								error={errors.email?.message}
								label="Email"
								type="email"
								{...register("email")}
							/>
						</div>

						<PasswordInput
							error={errors.password?.message}
							label="Password"
							{...register("password")}
						/>
						<PasswordInput
							error={errors.confirmPassword?.message}
							label="Confirm Password"
							{...register("confirmPassword")}
						/>

						<div className="col-span-full">
							<div className="flex items-center">
								<input
									className="h-4 w-4 rounded-lg border-gray-300 text-purple-600 focus:ring-purple-600"
									id="termsCondition"
									type="checkbox"
									{...register("termsCondition")}
								/>
								<label
									className="ml-3 block text-sm leading-6 text-gray-900"
									htmlFor="termsCondition">
									Signing up means you are okay with
									our Terms of Service, Privacy
									Policy, and our default
									Notification Settings
								</label>
							</div>
						</div>

						<div className="col-span-full">
							<Button
								className="w-full"
								disabled={isSubmitting}
								isLoading={isSubmitting}
								type="submit">
								Create account
							</Button>
						</div>
					</form>
				</div>

				<p className="mt-10 text-center text-sm text-gray-500">
					Already have an account?{" "}
					<Anchor href="/sign-in">Sign in</Anchor>
				</p>
			</div>
		</>
	);
};
export default SignUp;

"use client";

import * as z from "zod";

import { useTransition, useState } from "react";

import { CardWrapper } from "@/components/auth/card-wrapper";

import { useForm } from "react-hook-form";

import { Input } from "@/components/ui/input";

import { Button } from "@/components/ui/button";

import { RegisterSchema } from "@/schemas/auth";

import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";

import { useSearchParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormStateMessage } from "../form-state-message";
import { REGISTERFORM } from "@/assets/texts";
import { EMAIL, NAME, PASSWORD } from "@/assets/placeholders";
import { register } from "@/actions/auth/register";

export const RegisterForm = () => {
	const searchParams = useSearchParams();
	const [error, setError] = useState<string | undefined>("");
	const [success, setSuccess] = useState<string | undefined>("");
	const [isPending, startTransition] = useTransition();
	// const [isPending, setIsPending] = useState(false);

	const form = useForm<z.infer<typeof RegisterSchema>>({
		resolver: zodResolver(RegisterSchema),
		defaultValues: {
			name: "",
			email: "",
			password: "",
			confirmationPassword: "",
		},
	});

	const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
		setError("");
		setSuccess("");

		startTransition(() => {
			register(values).then((data) => {
				setSuccess(data.success);
				setError(data.error);
			});
		});
	};

	return (
		<CardWrapper
			headerLabel={REGISTERFORM.TITLE}
			backButtonLabel={REGISTERFORM.BACK}
			backButtonHref="/login"
			showOAuth={true}
			disabled={isPending}
		>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
					<div className="space-y-4">
						<FormField
							control={form.control}
							name="name"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Jméno</FormLabel>
									<FormControl>
										<Input
											{...field}
											placeholder={NAME}
											type="name"
											disabled={isPending}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="email"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Email</FormLabel>
									<FormControl>
										<Input
											{...field}
											placeholder={EMAIL}
											type="email"
											disabled={isPending}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="password"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Heslo</FormLabel>
									<FormControl>
										<Input
											{...field}
											placeholder={PASSWORD}
											type="password"
											disabled={isPending}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="confirmationPassword"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Stejné heslo</FormLabel>
									<FormControl>
										<Input
											{...field}
											placeholder={PASSWORD}
											type="password"
											disabled={isPending}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
					<FormStateMessage error={error} success={success} />
					<Button type="submit" className="w-full" disabled={isPending}>
						{!isPending && "Registrovat se"}
						{isPending && "Registruji..."}
					</Button>
				</form>
			</Form>
		</CardWrapper>
	);
};

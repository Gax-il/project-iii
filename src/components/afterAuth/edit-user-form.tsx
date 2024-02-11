"use client";

import * as z from "zod";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "../ui/form";
import { Button } from "../ui/button";
import { FormStateMessage } from "../form-state-message";
import { UserData } from "@/types";
import { useEffect, useState, useTransition } from "react";
import { UserEditSchema } from "@/schemas/auth";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { getRoles } from "@/actions/roles";
import { Role } from "@prisma/client";
import { Input } from "../ui/input";
import { Checkbox } from "../ui/checkbox";
import {
	Select,
	SelectItem,
	SelectTrigger,
	SelectValue,
	SelectContent,
} from "../ui/select";
import { updateUser } from "@/actions/users";

interface EditUserFormProps {
	user: UserData;
}

export const EditUserForm = ({ user }: EditUserFormProps) => {
	const [error, setError] = useState<string | undefined>("");
	const [success, setSuccess] = useState<string | undefined>("");

	const [notice, setNotice] = useState<string | undefined>("");
	const [isPending, startTransition] = useTransition();
	const [roles, setRoles] = useState<Role[] | undefined | null>();

	useEffect(() => {
		const fetchData = async () => {
			try {
				const allRoles = await getRoles();
				setRoles(allRoles);
			} catch {
				setError("Zkus znovu");
			}
		};
		fetchData();
	}, []);

	const form = useForm<z.infer<typeof UserEditSchema>>({
		resolver: zodResolver(UserEditSchema),
		defaultValues: {
			name: "",
			email: "",
			emailVer: user.email_verified,
			role: user.role_name,
		},
	});

	const onSubmit = (values: z.infer<typeof UserEditSchema>) => {
		startTransition(() => {
			updateUser(user, values).then((data) => {
				setNotice(data?.notice);
				setSuccess(
					`${data?.success}. Pro projevení změn je nutné reloadnout stránku.`,
				);
			});
		});
	};
	return (
		<>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
					<h1 className="font-primary font-semibold text-xl">
						Editace uživatele {user.name}
					</h1>
					<FormField
						control={form.control}
						name="name"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Jméno</FormLabel>
								<FormControl>
									<Input
										{...field}
										placeholder={user.name}
										disabled={isPending}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					{!user.OAuth && (
						<>
							<FormField
								control={form.control}
								name="email"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Email</FormLabel>
										<FormControl>
											<Input
												{...field}
												placeholder={user.email}
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
								name="emailVer"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Ověřený email</FormLabel>
										<br />
										<FormControl>
											<div className="h-5 pt-0">
												<Checkbox
													checked={field.value}
													onCheckedChange={field.onChange}
													className="h-4 w-4"
												/>
											</div>
										</FormControl>
									</FormItem>
								)}
							/>
						</>
					)}
					<FormField
						control={form.control}
						name="role"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Role</FormLabel>
								<Select
									onValueChange={field.onChange}
									defaultValue={field.value}
								>
									<FormControl>
										<SelectTrigger>
											<SelectValue>{field.value}</SelectValue>
										</SelectTrigger>
									</FormControl>
									<SelectContent>
										{roles?.map((role) => (
											<SelectItem key={role.id} value={role.name}>
												{role.name}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
							</FormItem>
						)}
					/>
					<FormStateMessage notice={notice} success={success} />

					<Button type="submit" className="w-full" disabled={isPending}>
						{!isPending && "Poslat"}
						{isPending && "Zpracovávám..."}
					</Button>
				</form>
			</Form>
		</>
	);
};

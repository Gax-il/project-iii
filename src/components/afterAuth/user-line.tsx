"use client";

import { IconCheck, IconX } from "@tabler/icons-react";
import { TableCell, TableRow } from "../ui/table";
import { UserData } from "@/types";
import { UserEditButton } from "./dialog-user-edit";
import { UserRemoveButton } from "./dialog-remove-user";

interface UserLineProps {
	user: UserData;
	uniqueKey: number;
}

export const UserLine = ({ user, uniqueKey }: UserLineProps) => {
	return (
		<TableRow className="font-mono text-sm" key={uniqueKey}>
			<TableCell>{user.email}</TableCell>
			<TableCell>
				{user.email_verified ? (
					<IconCheck className="text-green-500" />
				) : (
					<IconX className="text-red-600" />
				)}
			</TableCell>
			<TableCell>{user.name}</TableCell>
			<TableCell>{user.role_name}</TableCell>
			<TableCell>
				{user.OAuth ? (
					<IconCheck className="text-green-500" />
				) : (
					<IconX className="text-red-600" />
				)}
			</TableCell>
			<TableCell>
				<UserEditButton user={user} />
			</TableCell>
			<TableCell>
				<UserRemoveButton user={user} />
			</TableCell>
		</TableRow>
	);
};

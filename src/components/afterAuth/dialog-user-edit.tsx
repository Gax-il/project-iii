import { UserData } from "@/types";
import { IconDots } from "@tabler/icons-react";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import { EditUserForm } from "./edit-user-form";

interface UserEditButtonProps {
	user: UserData;
}

export const UserEditButton = ({ user }: UserEditButtonProps) => {
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant="ghost" className="w-6 h-6 p-0">
					<span className="sr-only">Open Menu</span>
					<IconDots className="h-4 w-4" />
				</Button>
			</DialogTrigger>
			<DialogContent>
				<EditUserForm user={user} />
			</DialogContent>
		</Dialog>
	);
};

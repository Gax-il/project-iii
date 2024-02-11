import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { IconTrash } from "@tabler/icons-react";
import { UserData } from "@/types";
import { removeUser } from "@/actions/users";
import { useToast } from "../ui/use-toast";

export const UserRemoveButton = ({ user }: { user: UserData }) => {
	const { toast } = useToast();

	const onClick = async () => {
		removeUser(user.id).then((data) => {
			toast({
				title: data[0],
				description: data[1],
			});
		});
	};
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant="ghost" className="w-6 h-6 p-0">
					<span className="sr-only">Odstranit uživatele</span>
					<IconTrash />
				</Button>
			</DialogTrigger>
			<DialogContent>
				<h1>{`Opravdu chcete smazat uživatele ${user.name}`}</h1>
				<div className="flex space-x-4">
					<DialogClose asChild className="w-full">
						<Button
							className="bg-green-500 hover:bg-green-800"
							onClick={onClick}
						>
							Ano
						</Button>
					</DialogClose>
					<DialogClose className="w-full">
						<Button className="w-full bg-red-600 hover:bg-red-900">Ne</Button>
					</DialogClose>
				</div>
			</DialogContent>
		</Dialog>
	);
};

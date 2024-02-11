"use client";

import { useCurrentPerms } from "@/actions/hooks/use-current-perms";
import { useCurrentUser } from "@/actions/hooks/use-current-user";
import { UserButton } from "@/components/afterAuth/user-button";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
	DropdownMenuContent,
	DropdownMenu,
	DropdownMenuTrigger,
	DropdownMenuItem,
} from "../ui/dropdown-menu";

interface NavbarProps {
	className: string;
}

export const Navbar = ({ className = "" }: NavbarProps) => {
	const pathname = usePathname();
	const perms = useCurrentPerms();

	return (
		<nav
			className={`bg-secondary flex justify-between items-center p-4 rounded-xl w-full shadow-sm ${className}`}
		>
			<div className="flex gap-x-2">
				<Button
					variant={pathname === "/dashboard" ? "default" : "outline"}
					asChild
				>
					<Link href="/dashboard">Dashboard</Link>
				</Button>
				{perms.admin && (
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button variant={pathname === "/admin" ? "default" : "outline"}>
								Admin
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent>
							<DropdownMenuItem>
								<Button variant="ghost" asChild>
									<Link href="/admin/role/create">Vytvoření role</Link>
								</Button>
							</DropdownMenuItem>
							<DropdownMenuItem>
								<Button variant="ghost" asChild>
									<Link href="/admin/users">Uživatelé</Link>
								</Button>
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				)}
				<Button
					variant={pathname === "/settings" ? "default" : "outline"}
					asChild
				>
					<Link href="/settings">Nastavení</Link>
				</Button>
			</div>
			<UserButton />
		</nav>
	);
};

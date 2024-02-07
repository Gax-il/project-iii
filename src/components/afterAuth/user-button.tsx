"use client"

import { useCurrentUser } from "@/actions/hooks/use-current-user";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "@/components/ui/avatar"
import { LogoutButton } from "@/components/auth/logout-button";
import { IconUser } from "@tabler/icons-react";

export const UserButton = () => {
  const user = useCurrentUser();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <span className="flex items-center justify-center text-right gap-2 max-w-52">
        <p className="text-sm truncate">
          {user?.name}
        </p>
        <Avatar>
          <AvatarImage src={user?.image || ""} />
          <AvatarFallback className="bg-black">
            <IconUser className="text-white"/>
          </AvatarFallback>
          </Avatar>
          </span>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>
          
        <LogoutButton />
          </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
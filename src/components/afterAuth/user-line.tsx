"use client"

import { getRoleNameById } from "@/actions/roles";
import { User } from "@prisma/client";
import { IconCheck, IconDots, IconQuestionMark, IconX } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { TableCell, TableRow } from "../ui/table";
import { UserData } from "@/types";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { UserEditButton } from "./dialog-user-edit";

interface UserLineProps {
  user: UserData,
  uniqueKey: number;
}

export const UserLine = ({
  user,
  uniqueKey
}: UserLineProps) => {
  return (
    <TableRow key={uniqueKey}>
      <TableCell>
        {user.email}
        </TableCell>
      <TableCell>
        {user.email_verified ? <IconCheck className="text-green-500"/> : <IconX className="text-red-600" />}
      </TableCell>
      <TableCell>
        {user.name}
      </TableCell>
      <TableCell>
        {user.role_name}
      </TableCell>
      <TableCell>
      {user.OAuth ? <IconCheck className="text-green-500"/> : <IconX className="text-red-600" />}
      </TableCell>
      <TableCell>
        {/* <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="w-6 h-6 p-0">
              <span className="sr-only">
                Open Menu
              </span>
              <IconDots className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>
              <UserEditButton>
                <p>test</p>
              </UserEditButton>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu> */}
        <UserEditButton user={user} />
      </TableCell>
    </TableRow>
  )
}
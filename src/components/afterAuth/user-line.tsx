"use client"

import { getRoleName } from "@/actions/roles";
import { getRoleById } from "@/data/role";
import { User } from "@prisma/client";
import { IconCheck, IconLoader, IconX } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { Table, TableCell, TableRow } from "../ui/table";

interface UserLineProps {
  user: User,
  uniqueKey: number;
}

export const UserLine = ({
  user,
  uniqueKey
}: UserLineProps) => {
  const [roleName, setRoleName] = useState<string | undefined>();
  useEffect(() => {
    const fetchData = async (roleId: string) => {
      const name = await getRoleName(roleId)
      setRoleName(name);
    }
    fetchData(user.roleId as string);
  })
  return (
    <TableRow key={uniqueKey}>
      <TableCell>
        <span className="flex gap-y-2">
        {user.email}
        {user.emailVerified ? <IconCheck/> : <IconX />}
        </span>
      </TableCell>
      <TableCell>
        {user.name}
      </TableCell>
      <TableCell>
        {roleName && <p>{roleName}</p>}
        {!roleName && <IconLoader />}
      </TableCell>
      <TableCell>
      {!user.password ? <IconCheck className="text-green-500"/> : <IconX className="text-red-600" />}
      </TableCell>
    </TableRow>
  )
}
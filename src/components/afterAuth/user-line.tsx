"use client"

import { getRoleNameById } from "@/actions/roles";
import { User } from "@prisma/client";
import { IconCheck, IconQuestionMark, IconX } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { TableCell, TableRow } from "../ui/table";

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
      const name = await getRoleNameById(roleId)
      setRoleName(name);
    }
    fetchData(user.roleId as string);
  })
  return (
    <TableRow key={uniqueKey}>
      <TableCell>
        {user.email}
        </TableCell>
      <TableCell>
        {user.emailVerified ? <IconCheck className="text-green-500"/> : <IconX className="text-red-600" />}
      </TableCell>
      <TableCell>
        {user.name}
      </TableCell>
      <TableCell>
        {roleName && <p>{roleName}</p>}
        {!roleName && <IconQuestionMark />}
      </TableCell>
      <TableCell>
      {!user.password ? <IconCheck className="text-green-500"/> : <IconX className="text-red-600" />}
      </TableCell>
    </TableRow>
  )
}
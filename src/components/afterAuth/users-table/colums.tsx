"use client"


export type UserData = {
  id: string
  email: string
  email_verified: boolean
  name: string
  role_name: string
  OAuth: boolean
}

import {
  ColumnDef
} from "@tanstack/react-table"

export const columns: ColumnDef<UserData>[] = [
  {
    accessorKey: "id",
    header: "ID"
  },
  {
    accessorKey: "email",
    header: "Email"
  },
  {
    accessorKey: "email_verified",
    header: "Ověřený"
  },
  {
    accessorKey: "name",
    header: "Jméno"
  },
  {
    accessorKey: "role_name",
    header: "Role"
  },
  {
    accessorKey: "OAuth",
    header: "OAuth"
  }
]
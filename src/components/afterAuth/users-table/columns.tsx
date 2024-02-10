"use client"


export type UserData = {
  id: string
  email: string
  email_verified: boolean
  name: string
  role_name: string
  OAuth: boolean
}


import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { IconCheck, IconDots, IconX } from "@tabler/icons-react"
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
    header: "Ověřený",
    cell: props => {
      return (props.getValue() ? <IconCheck className="text-emerald-400" /> : <IconX className="text-red-400" />)
    }
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
    header: () => "OAuth",
    cell: props => {
      return (props.getValue() ? <IconCheck className="text-emerald-400" /> : <IconX className="text-red-400" />)
    }
  },
  {
    id: "actions",
    cell: props => {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="w-6 h-6 p-0">
              <span className="sr-only">
                Open menu
              </span>
              <IconDots className="h-4 w-4"/>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>
              Akce
            </DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => {
                console.log(props.row.original.id)
              }}
            >
              Upravit
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    }
  }
]
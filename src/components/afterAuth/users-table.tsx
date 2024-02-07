"use client"

import { countUsers, getNUsers } from "@/actions/users"
import { getUsersCount } from "@/data/user"
import { User } from "@prisma/client"
import { useSearchParams } from "next/navigation"
import { useEffect, useRef, useState } from "react"
import { SyncLoader } from "react-spinners"
import { UserLine } from "./user-line"
import { Table, TableBody, TableCaption, TableHead, TableHeader, TableRow } from "../ui/table"
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "../ui/pagination"



export const UsersTable = () => {
  const searchParams = useSearchParams()
  const [users, setUsers] = useState<User[] | undefined>()
  const [page, setPage] = useState<number>(1)
  const [loading, setLoading] = useState<boolean>(true)
  const count = useRef<number>(1);
  useEffect(() => {

    setLoading(true)
    const fetchData = async () => {
      const countResult = await countUsers()
      count.current = countResult;
      const curUsers = await getNUsers(5, page);
      setUsers(curUsers);
    }
    fetchData();
    setLoading(false)
  }, [page])

  var key = 0;
  return (
    <div>
      {/* {loading && <SyncLoader />}
      {count.current}
      <div className="grid grid-cols-[auto_auto_auto_auto_auto] font-mono text-sm">
        <p className="font-bold">
          Email
        </p>
        <p className="font-bold">
          EV
        </p>
        <p className="font-bold">
          Jméno
        </p>
        <p className="font-bold">
          Role
        </p>
        <p className="font-bold">
          OAuth
        </p>
      {users?.map((user) => {
        return (
          <UserLine user={user} />
        )
      })}
      </div> */}
      <Table>
        <TableCaption>
          <Pagination>
            <PaginationContent>
              {page > 1 && <>
              <PaginationItem>
                <PaginationPrevious className="font-mono" onClick={() => { setPage(page - 1)}}/>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink onClick={() => { setPage(page - 1) }}>
                  {page-1}
                </PaginationLink>
                </PaginationItem>
                </>}
              <PaginationItem>
                <PaginationLink isActive>
                  {page}
                </PaginationLink>
              </PaginationItem>
              {page * 5 < count.current &&
                <>
                  <PaginationItem>
                    <PaginationLink onClick={() => { setPage(page + 1) }}>
                      {page + 1}
                    </PaginationLink>
                </PaginationItem>
                </>
              }
              {(page + 1) * 5 < count.current &&
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
              }
              {page * 5 < count.current &&
                <>
                  <PaginationItem>
                    <PaginationNext onClick={() => { setPage(page + 1) }} />
                  </PaginationItem>
                </>
              }
            </PaginationContent>
          </Pagination>
        </TableCaption>
        <TableHeader>
          <TableRow key="1">
            <TableHead>Email + verifikace</TableHead>
            <TableHead>Jméno</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>OAuth</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="items-center">
          {users?.map((user) => (
            <UserLine user={user} />
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
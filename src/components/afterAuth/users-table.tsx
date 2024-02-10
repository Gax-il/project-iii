"use client"

import { countUsers, getNUsers, getUserData } from "@/actions/users"
import { User } from "@prisma/client"
import { useEffect, useRef, useState } from "react"
import { UserLine } from "./user-line"
import { Table, TableBody, TableCaption, TableHead, TableHeader, TableRow } from "../ui/table"
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "../ui/pagination"
import { UserLineSkeleton } from "../skeletons/user-line"
import { UserData } from "@/types"



export const UsersTable = () => {
  const [users, setUsers] = useState<UserData[] | undefined>()
  const [page, setPage] = useState<number>(1)
  const [loading, setLoading] = useState<boolean>(true)
  const [skeletonCount, setSkeletonCount] = useState<number>(10)
  const count = useRef<number>(10);
  const lines = 10
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        setSkeletonCount(10)
        const countResult = await countUsers()
        count.current = countResult;
        setSkeletonCount(count.current > page * lines ? lines : count.current % lines)
        const curUsers = await getNUsers(lines, page);
        const editedUsers: UserData[] = [];
        for (const user of curUsers) {
          const editedUser = await getUserData(user)
          if (editedUser) {
            editedUsers.push(editedUser)
          }
        }
        setUsers(editedUsers);
      } catch {
        console.error("WIP")
      } finally {
        setLoading(false);
      }
    }
    fetchData();
    }, [page])
  return (
    <div className="flex">
      <Table className="" >
        <TableCaption>
          <Pagination>
            <PaginationContent>
              {page > 1 && <>
              <PaginationItem>
                <PaginationPrevious className="font-mono" onClick={() => { if(!loading) setPage(page - 1)}}/>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink onClick={() => {if(!loading)  setPage(page - 1) }}>
                  {page-1}
                </PaginationLink>
                </PaginationItem>
                </>}
              <PaginationItem>
                <PaginationLink isActive>
                  {page}
                </PaginationLink>
              </PaginationItem>
              {page * lines < count.current &&
                <>
                  <PaginationItem>
                    <PaginationLink onClick={() => {if(!loading)  setPage(page + 1) }}>
                      {page + 1}
                    </PaginationLink>
                </PaginationItem>
                </>
              }
              {(page + 1) * lines < count.current &&
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
              }
              {page * lines < count.current &&
                <>
                  <PaginationItem>
                    <PaginationNext onClick={() => { if(!loading) setPage(page + 1) }} className="font-mono" />
                  </PaginationItem>
                </>
              }
            </PaginationContent>
          </Pagination>
        </TableCaption>
        <TableHeader>
          <TableRow key="1">
            <TableHead className="">Email</TableHead>
            <TableHead className="">Ověřený</TableHead>
            <TableHead className="">Jméno</TableHead>
            <TableHead className="">Role</TableHead>
            <TableHead className="">OAuth</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="items-center truncate">
          {loading && 
          <>
          {[...Array(skeletonCount)].map((_, index) => (
            <UserLineSkeleton key={index} uniqueKey={index} />
          ))}
          </>
          }
          {!loading && 
            users?.map((user, index) => (
              <UserLine user={user} key={index} uniqueKey={index * 1000} />
            ))}
        </TableBody>
      </Table>
    </div>
  )
}
"use client"

import { countUsers, getNUsers } from "@/actions/users"
import { User } from "@prisma/client"
import { useEffect, useRef, useState } from "react"
import { SyncLoader } from "react-spinners"
import { UserLine } from "./user-line"
import { Table, TableBody, TableCaption, TableHead, TableHeader, TableRow } from "../ui/table"
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "../ui/pagination"
import { UserLineSkeleton } from "../skeletons/user-line"



export const UsersTable = () => {
  const [users, setUsers] = useState<User[] | undefined>()
  const [page, setPage] = useState<number>(1)
  const [loading, setLoading] = useState<boolean>(true)
  const count = useRef<number>(10);
  const lines = 10
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        const countResult = await countUsers()
        count.current = countResult;
        const curUsers = await getNUsers(lines, page);
        setUsers(curUsers);
      } catch {
        console.error("WIP")
      } finally {
        setLoading(false);
      }
    }
    fetchData();
    }, [page])
    
  const skeletonCount = count.current > page * lines ? lines : count.current % lines;
  return (
    <div className="inline-block">
      <Table className="w-[970px] table-fixed" >
        {!loading &&
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
              {page * lines < count.current &&
                <>
                  <PaginationItem>
                    <PaginationLink onClick={() => { setPage(page + 1) }}>
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
                    <PaginationNext onClick={() => { setPage(page + 1) }} />
                  </PaginationItem>
                </>
              }
            </PaginationContent>
          </Pagination>
        </TableCaption>
          }
        <TableHeader>
          <TableRow key="1">
            <TableHead className="w-[50px]">Email</TableHead>
            <TableHead className="w-[55px]">Ověřený</TableHead>
            <TableHead className="w-[50px]">Jméno</TableHead>
            <TableHead className="w-[50px]">Role</TableHead>
            <TableHead className="w-[50px]">OAuth</TableHead>
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
          <UserLineSkeleton uniqueKey={10}/>
          {!loading && 
            users?.map((user, index) => (
              <UserLine user={user} key={index} uniqueKey={index * 1000} />
            ))}
        </TableBody>
      </Table>
    </div>
  )
}
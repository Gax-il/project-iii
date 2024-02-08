import { UserData, columns } from "@/components/afterAuth/users-table/colums"
import { DataTable } from "./data-table"
import { db } from "@/lib/db"
import { getUserData } from "@/actions/users";

async function getData(): Promise<UserData[]> {
  const users = await db.user.findMany();
  const userDataArray: UserData[] = [];
  for (const user of users) {
    const userData = await getUserData(user);
    if (userData) {
      userDataArray.push(userData);
    }
  }
  console.log(userDataArray)
  return userDataArray;
}

export default async function UsersTableNew() {
  const data = await getData()

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  )
}

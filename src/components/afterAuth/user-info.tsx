import { ExtendedUser } from "@/secTypes";
import { IconCheck, IconX } from "@tabler/icons-react";

interface UserInfoProps {
  user?: ExtendedUser;
}

export const UserInfo = ({
  user,
}: UserInfoProps) => {
  return (
    <>
    <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
          <p className="text-sm font-medium">
            ID:
          </p>
          <p className="text-xs max-w-[180px] font-mono p-1 bg-slate-100 rounded-sm">
            {user?.id}
          </p>
        </div>
        <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
          <p className="text-sm font-medium">
            Name:
          </p>
          <p className="text-xs max-w-[180px] font-mono p-1 bg-slate-100 rounded-sm">
            {user?.name}
          </p>
        </div>
        <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
          <p className="text-sm font-medium">
            Email:
          </p>
          <p className="text-xs max-w-[180px] font-mono p-1 bg-slate-100 rounded-sm">
            {user?.email}
          </p>
        </div>
        <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
          <p className="text-sm font-medium">
            Role:
          </p>
          <p className="text-xs max-w-[180px] font-mono p-1 bg-slate-100 rounded-sm">
          {user?.role.name}
          {!user?.role.name && "User"}
          </p>
      </div>
      <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
          <p className="text-sm font-medium">
            OAuth:
          </p>
        <p className="text-xs max-w-[180px] font-mono p-1 bg-slate-100 rounded-sm">
          {user?.isOAuth ? <IconCheck /> : <IconX />}
          </p>
        </div>
    </>
  )
}

"use client"

import { logout } from "@/actions/logout"
import { IconLogout } from "@tabler/icons-react";

interface LogoutButtonProps {
  children?: React.ReactNode | undefined;
}

export const LogoutButton = ({
  children
}: LogoutButtonProps) => {
  const onClick = () => {
    logout();
  };

  return (
    <span onClick={onClick} className="cursor-pointer">
      {children}
      {!children &&
        <div className="flex items-center justify-center text-left">
          <IconLogout />
          <p>
            Odhlásit se
          </p>
        </div>
      } 
    </span>
  )
}
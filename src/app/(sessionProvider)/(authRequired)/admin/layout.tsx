"use client"

import { useCurrentPerms } from "@/actions/hooks/use-current-perms";
import { Navbar } from "@/components/afterAuth/navbar";
import { SessionProvider } from "next-auth/react";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  const perms = useCurrentPerms()
  if (!perms.admin) {
    return (
      <div>Nemáš dostatečné pravomoce</div>
    )
  }
  return (
  <>
      {children}
      </>
  )
};

export default AuthLayout;

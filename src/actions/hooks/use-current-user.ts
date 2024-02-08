import { ExtendedUser } from "@/next-auth";
import { User } from "next-auth";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export const useCurrentUser = () => {
  const [currentUser, setCurrentUser] = useState<ExtendedUser | null>(null);
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "authenticated") {
      setCurrentUser(session.user || null);
    } else {
      setCurrentUser(null);
    }
  }, [session, status]);

  return currentUser;
};

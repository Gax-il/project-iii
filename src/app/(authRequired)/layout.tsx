import { Navbar } from "@/components/afterAuth/navbar";
import { SessionProvider } from "next-auth/react";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <SessionProvider>
    <div className="w-screen flex justify-center">
        <span className="w-[1000px]">
          <Navbar className = "my-2 shadow-xl" />
          <div className="bg-white shadow-xl w-full rounded-xl p-4">
            {children}
          </div>
      </span>
      </div>
      </SessionProvider>
  )
};

export default AuthLayout;

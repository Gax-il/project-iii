import { SessionProvider } from "next-auth/react";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <SessionProvider>
            {children}
      </SessionProvider>
  )
};

export default AuthLayout;

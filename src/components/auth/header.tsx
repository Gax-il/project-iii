import { IconShieldLock } from "@tabler/icons-react";

interface HeaderProps {
  label: string;
}

export const Header = ({
  label
}: HeaderProps) => {
  return (
    <div className="w-full flex flex-col gap-y-4 items-center justify-center">
      <div className="flex justify-center items-center">
        <IconShieldLock className="h-10 w-10" />
        <h1 className="text-3xl font-primary font-semibold">
          Auth  
        </h1>
      </div>
      <p className="text-muted-foreground text-sm">
        {label}
      </p>
    </div>
  )
}
import { IconBrandGithub, IconBrandGoogle } from "@tabler/icons-react"
import { Button } from "../ui/button"
import { signIn } from "next-auth/react";
import { DEFAULT_AUTH_REDIRECT } from "@/routes";
import { useSearchParams } from "next/navigation";

interface OAuthButtonsProps {
  disabled?: boolean;
}

const OAuthButtons = ({
  disabled=false
}: OAuthButtonsProps) => {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");
  const onClick = (provider: "google" | "github") => {
    signIn(provider, {
      callbackUrl: callbackUrl || DEFAULT_AUTH_REDIRECT
    })
  }

  return (
    <div className="flex items-center w-full gap-x-2">
      <Button
        size="lg"
        variant="outline"
        className="w-full"
        disabled={disabled}
        onClick={() => onClick("google")}
      >
        <IconBrandGoogle />
      </Button>
      <Button 
          size="lg"
          variant="outline"
        className="w-full"
        disabled={disabled}
        onClick={() => onClick("github")}
      >
          <IconBrandGithub />
      </Button>
    </div>
  ) 
}

export default OAuthButtons
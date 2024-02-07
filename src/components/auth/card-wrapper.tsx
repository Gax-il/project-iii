"use client"

import {
  Card,
  CardHeader,
  CardFooter,
  CardContent,
} from "@/components/ui/card"
import { Header } from "./header";
import { BackButton } from "./back-button";
import OAuthButtons from "./oauth-providers-buttons";

interface CardWrapperProps {
  children: React.ReactNode;
  headerLabel: string;
  backButtonLabel: string;
  backButtonHref: string,
  showOAuth?: boolean;
  disabled?: boolean;
}

export const CardWrapper = ({
  children,
  headerLabel,
  backButtonLabel,
  backButtonHref,
  showOAuth,
  disabled=false
}: CardWrapperProps) => {
  return (
    <Card className="w-[400px] max-w-[95%] shadow-md">
      <CardHeader>
        <Header label={headerLabel} />
      </CardHeader>
      <CardContent>
        {children}
      </CardContent>
      {showOAuth && (
        <CardFooter>
          <OAuthButtons
            disabled={disabled}
          />
        </CardFooter>
      )}
      <CardFooter>
        <BackButton
          label={backButtonLabel}
          href={backButtonHref}
        />
      </CardFooter>
    </Card>
  )
}
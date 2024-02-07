import { BackButton } from "@/components/auth/back-button";
import { CardWrapper } from "@/components/auth/card-wrapper";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { IconBrandNextjs, IconBrandPrisma, IconBrandRadixUi, IconBrandReact, IconBrandTabler, IconBrandTailwind, IconBrandTypescript, IconFileTypeTs, IconMail, IconPassword, IconShieldLock, IconUvIndex } from "@tabler/icons-react";
import Link from "next/link";

export default function InfoPage() {
  return (
    <main className="h-screen flex items-center justify-center">
      <Card className="w-[400px] max-w-[95%] shadow md">
        <CardHeader>
          <div className="w-full flex flex-col gap-y-4 items-center justify-center">
             <h1 className="text-3xl font-primary font-semibold">
                Projekt III  
            </h1>
          </div>
        </CardHeader>
        <CardContent>
        <h1 className="text-xl font-primary font-semibold">
                Použité technologie  
          </h1>
          <div className="grid grid-cols-2 font-mono">
            <span className="flex gap-1">
              <IconBrandNextjs />
              NextJS
            </span>
            <span className="flex gap-1">
              <IconShieldLock />
              Auth.js
            </span>
            <span className="flex gap-1">
              <IconBrandReact />
              React
            </span>
            <span className="flex gap-1">
              <IconBrandTailwind />
              Tailwind
            </span>
            <span className="flex gap-1">
              <IconBrandRadixUi />
              Shadcn-ui
            </span>
            <span className="flex gap-1">
              <IconBrandTabler />
              Tabler icons
            </span>
            <span className="flex gap-1">
              <IconBrandPrisma />
              Prisma
            </span>
            <span className="flex gap-1">
              <IconPassword />
              Bcrypt
            </span>
            <span className="flex gap-1">
              <IconBrandTypescript />
              Typescript
            </span>
            <span className="flex gap-1">
              <IconFileTypeTs />
              zod
            </span>
            <span className="flex gap-1">
              <IconMail />
              Resend
            </span>
          </div>
        </CardContent>
        <CardFooter>
          <div className="inline-block space-y-1 font-primary font-semibold">
          <p className="">Lukáš Pavienský</p>
            <p>Informatika a kybernetika ve zdravotnictví</p>
            <Separator className="my-2" />
          <BackButton
            href="/"
            label="Zpět na úvodní stránku"
          />
          </div>
        </CardFooter>
      </Card>
   </main>
  )
}

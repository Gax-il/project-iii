import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import Link from "next/link";

export default function Home() {
  return (
    <main className="h-screen flex items-center justify-center">
      <Card className="w-[400px] shadow md">
        <CardHeader>
          <div className="w-full flex flex-col gap-y-4 items-center justify-center">
             <h1 className="text-3xl font-primary font-semibold">
                Projekt III  
            </h1>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="">Tento web je součástí semestrálního projektu</p>
          <div className="w-full flex justify-between space-x-4">
            <Button
              asChild
              variant="outline"
              className="w-full"
            >
            <Link href="login">
              Přihlášení
            </Link>
            </Button>

          <Button
              asChild
              className="w-full"
              variant="outline"
            >
            <Link href="register">
              Registrace
            </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="w-full"
            >
            <Link href="info">
              Info
            </Link>
            </Button>
            </div>
        </CardContent>
        <CardFooter>
          <div className="inline-block space-y-1 font-primary font-semibold">
          <p className="">Lukáš Pavienský</p>
            <p>Informatika a kybernetika ve zdravotnictví</p>
            </div>
        </CardFooter>
      </Card>
   </main>
  )
}

import { DiscordServerButton } from "@/components/icons/discord";
import { BackgroundBeams } from "@/components/ui/background-beams";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CreateShortLink } from "./client";
import { auth } from "@/auth";
import { SignInMenu } from "../signin/login";
import { headers } from "next/headers";
import dynamic from "next/dynamic";
const DisplayLinks = dynamic(() => import('@/components/common/displayLinks'), { ssr: false });

export default async function Home() {
  const session = await auth();
  const headersList = headers()
  const hostname = headersList.get('host');

  return (
    <main>
      <div
        className="flex flex-col items-center justify-center"
        style={{
          height: "100vh",
        }}
      >
        {!session ? (
          <SignInMenu />
        ) : (
          <Card
            className={"w-full border-0  z-10 backdrop-blur-lg max-w-[500px]"}
          >
            <CardHeader>
              <CardTitle className="w-full text-center">EzEz Link</CardTitle>
              <CardDescription className="w-full text-center">
                Shorten Links Quickly
              </CardDescription>
            </CardHeader>
            <CardContent>
              <CreateShortLink session={session} />
            </CardContent>
            <CardFooter>
              <DiscordServerButton />
            </CardFooter>
          </Card>
        )}
      </div>
      <div className="flex flex-col gap-2 pb-20 items-center">
        {
          session && <DisplayLinks hostname={hostname || ""}/>
        } 
      </div>
      <BackgroundBeams className={"fixed pointer-events-none"} />
    </main>
  );
}

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
import { Input } from "@/components/ui/input";
import { CreateShortLink } from "./client";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { SignInMenu } from "../signin/login";

export default async function Home() {
  const session = await auth();

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
            className={"w-full border-0  z-10 backdrop-blur-lg max-w-[700px]"}
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
      <BackgroundBeams className={"fixed pointer-events-none"} />
    </main>
  );
}

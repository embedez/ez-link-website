"use client";
import { useSearchParams } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Muted, P } from "@/components/ui/typeography";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Suspense } from "react";

const MessageComponent = () => {
  const searchParams = useSearchParams();
  const message = searchParams.get("message");
  const code = searchParams.get("code");
  return (
    <div className={"w-full min-h-screen h-full grid place-items-center"}>
      <Card
        className={"w-full p-4 flex flex-col justify-between max-w-[400px]"}
      >
        <CardHeader>
          <CardTitle>Message</CardTitle>
        </CardHeader>
        <CardContent className={"flex flex-col w-full "}>
          <P className={"first:capitalize"}>{message}</P>
          {code && <Muted>Code: {code}</Muted>}
        </CardContent>
        <CardFooter>
          <Link href={"/"}>
            <Button className={"w-full"}>Home</Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
};

export default () => {
  return (
    <Suspense>
      <MessageComponent />
    </Suspense>
  );
};

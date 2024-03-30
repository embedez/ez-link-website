"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

export const ErrorReloadButton = () => {
  return (
    <Button
      onClick={() => {
        window.location.reload();
      }}
      className={"w-full"}
    >
      Reload
    </Button>
  );
};

export const ErrorGoBackButton = () => {
  const navigation = useRouter();
  return (
    <Button
      className={"w-full"}
      onClick={() => {
        navigation.back();
      }}
      variant={"outline"}
    >
      Go Back
    </Button>
  );
};

export const ErrorCard = ({
  title = "Error",
  className,
  description = "An error occurred.",
  message = "An unexpected error occurred. Please try again. If the error persists please contact the administrator.",
}: {
  className?: string;
  title?: string;
  description?: string;
  message?: string;
}) => {
  return (
    <Card className={cn("m-auto", className)}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      {!!message && <CardContent>{message}</CardContent>}
      <CardFooter className={"w-full flex flex-row justify-between gap-2"}>
        <ErrorReloadButton />
        <ErrorGoBackButton />
      </CardFooter>
    </Card>
  );
};

export default ErrorCard;

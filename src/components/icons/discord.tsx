"use client";

import { useRouter } from "next/navigation";
import { Button } from "../ui/button";

export const DiscordServerButton = () => {
  const nav = useRouter()
 
  return (
    <Button
      onClick={() => {
        nav.push("https://discord.gg/DmfATtvbrB");
      }}
      size={"icon"}
      className="flex items-center justify-center"
      variant="outline"
    >
      <img src="/icons/discord.svg" className="w-5 h-5">
      </img>
    </Button>
  );
};

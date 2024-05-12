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
      variant="ghost"
    >
      <img src="/icons/discord.svg" className="w-full h-full">
      </img>
    </Button>
  );
};

"use client";

import { PostLinkDataZod } from "@/app/api/v1/link/client";
import { userLinks } from "@/state/atoms";
import { CopyIcon } from "lucide-react";
import { useCallback, useEffect } from "react";
import { useRecoilState } from "recoil";
import { toast } from "sonner";
import { Card, CardHeader } from "../ui/card";
import { Button } from "../ui/button";
import { GetLinks } from "@/app/api/v1/link/action";

export const DisplayLinks = ({ hostname }: { hostname: string }) => {
  const [links, setLinks] = useRecoilState(userLinks);

  const LoadUserLinks = useCallback(async () => {
    const usersLinks = await GetLinks({})

    if (!usersLinks.success) {
      toast.error("Could not load link history", {
        description: usersLinks.message
      })
      return;
    }

    setLinks(usersLinks.data)
  }, [])

  useEffect(() => {
    LoadUserLinks()
  }, [])

  return (
    <>
      {links.map((link) => (
        <DisplayLink key={link.shortCode} link={link} hostname={hostname || ""} />
      ))}
    </>
  );
};
export default DisplayLinks

const DisplayLink = ({
  link,
  hostname,
}: {
  link: PostLinkDataZod;
  hostname: string;
}) => {
  const url = new URL(link.originalUrl);
  const shortUrl = new URL(("https://" + hostname + "/" + link.shortCode))

  const copyUrl = useCallback(() => {
    navigator.clipboard
      .writeText(shortUrl.href)
      .then(() => {
        toast.success("Text copied to clipboard", {
          description: shortUrl.href
        })
        console.log("Text copied to clipboard:", shortUrl.href);
      })
      .catch((error) => {
        toast.error("Failed to copy text to clipboard", {
          description: "message" in error ? error.message : JSON.stringify(error)
        })
        console.error("Failed to copy text to clipboard:", error);
      });
  }, []);

  return (
    <Card className="max-w-full md:max-w-[500px] w-full md:w-[500px] z-10">
      <CardHeader className="space-y-4">
        <div className="truncate font-bold">{url.hostname + url.pathname}</div>
        <div className="flex items-center justify-stretch gap-2">
          <div className="px-2 min-h-10 text-sm sm:text-base flex items-center justify-start rounded border text-wrap break-all flex-1">
            {hostname}/{link.shortCode}
          </div>
          <Button onClick={() => {copyUrl()}} size="icon" variant="outline">
            <CopyIcon className="w-5 h-5" />
          </Button>
        </div>
      </CardHeader>
    </Card>
  );
};

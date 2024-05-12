"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChangeEvent, useCallback, useState } from "react";
import { boolean } from "zod";
import { ErrorResult, JsonResult } from "../api";
import { PostLink } from "../api/v1/link/action";
import { CustomSession } from "@/auth";
import { Collapsible } from "@/components/ui/collapsible";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Label } from "@/components/ui/label";
import { PostLinkDataZod, postLinkDataZod } from "../api/v1/link/client";
import { toast } from "sonner";
import { useRecoilState, useSetRecoilState } from "recoil";
import { userLinks } from "@/state/atoms";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { headers } from "next/headers";
import { CopyIcon } from "lucide-react";

export const CreateShortLink = ({ session }: { session: CustomSession }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const setLinks = useSetRecoilState(userLinks);
  const [inputData, setInputData] = useState<PostLinkDataZod>({
    originalUrl: "",
    shortCode: undefined,
  });

  const addLink = (link: PostLinkDataZod) => {
    setLinks((oldLinks) => [link, ...oldLinks]);
  };

  const setOriginalUrl = (url: string) => {
    setInputData((old) => ({
      ...old,
      originalUrl: url,
    }));
  };

  const setShortCode = (shortCode: string | undefined) => {
    setInputData((old) => ({
      ...old,
      shortCode: shortCode,
    }));
  };

  const validateInputData = useCallback(async (data: any) => {
    const parsedLinkData = await postLinkDataZod.safeParseAsync(data);
    if (!parsedLinkData.success) {
      toast.error(parsedLinkData.error.errors.map((e) => e.message).join("\n"));
      return false;
    }
    return parsedLinkData.data;
  }, []);

  const handleOriginalUrlInputChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const inputValue = event.target.value;
      setOriginalUrl(inputValue);
    },
    [setOriginalUrl]
  );

  const handleShortCodeInputChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const inputValue = event.target.value;
      if (!inputValue) return setShortCode(undefined);
      setShortCode(inputValue);
    },
    [setOriginalUrl]
  );

  const submitLinkCreation = useCallback(async () => {
    const validData = await validateInputData(inputData);
    if (!validData) return;

    if (loading) return;
    setLoading(true);

    const createShortLink = await PostLink(validData);
    setLoading(false);

    if (!createShortLink.success) {
      toast.error("Error Creating EzEz Link", {
        description: createShortLink.message,
        closeButton: true,
      });
      return;
    }

    addLink(createShortLink.data);
    toast.success("Successfully EzEz Link Created", {
      description: `Created a new link ${createShortLink.data.shortCode}`,
    });
  }, [inputData, session]);

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-row items-stretch gap-2">
        <div className="w-full px-1">
          <Label htmlFor="url">Long URL</Label>
          <Input
            id="url"
            placeholder="https://example.com/very-long-url"
            className="w-full"
            disabled={loading}
            onChange={handleOriginalUrlInputChange}
          ></Input>
        </div>
      </div>
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger>Advanced Options</AccordionTrigger>
          <AccordionContent>
            <div className="px-1">
              <Label htmlFor="custom-slug">Custom Slug</Label>
              <Input
                className="mt-1"
                type="text"
                id="custom-slug"
                disabled={loading}
                placeholder="my-custom-slug"
                onChange={handleShortCodeInputChange}
              />
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      <Button
        className="h-auto"
        disabled={loading}
        onClick={() => submitLinkCreation()}
      >
        Generate Short Link
      </Button>
    </div>
  );
};
"use client";

import * as React from "react";
import { RecoilRoot } from "recoil";

import { ThemeProvider } from "next-themes";
import { Toaster } from "@/components/ui/sonner";
import { Popover } from "@/components/ui/popover";

type Props = {
  children?: React.ReactNode;
};

export const Providers = ({ children }: Props) => {
  return (
    <RecoilRoot>
      <Toaster />
      <Popover />
      <ThemeProvider
        attribute="class"
        defaultTheme="dark"
        enableSystem
        disableTransitionOnChange
      >
          {children}
      </ThemeProvider>
    </RecoilRoot>
  );
};

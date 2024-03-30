"use client";

import { ReactNode } from "react";
import { signOut } from "@/suna-auth/client";

export const Logout = ({ children }: { children: ReactNode }) => {
  return (
    <button
      className={"contents"}
      onClick={(e) => {
        e.preventDefault();
        signOut();
      }}
      type={"button"}
      aria-label="Logout user"
    >
      {children}
    </button>
  );
};

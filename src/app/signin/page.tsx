"use client";

import { Login } from "@/app/signin/login";

export default function () {
  return (
    <div className={"flex grow flex-col items-center justify-center"}>
      <Login redirectUrl={"/"} />
    </div>
  );
}

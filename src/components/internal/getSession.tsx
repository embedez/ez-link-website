"use client";
import { userInfo } from "@/state/atoms";
import React, { useEffect } from "react";
import { useSetRecoilState } from "recoil";

type Props = {
  sessionInfo: any;
};
export const GetSession = ({ sessionInfo }: Props) => {
  const setUser = useSetRecoilState(userInfo);

  useEffect(() => {
    setUser(sessionInfo);
  }, [sessionInfo]);

  return <></>;
};

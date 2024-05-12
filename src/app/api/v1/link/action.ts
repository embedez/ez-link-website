"use server";

import { CustomSession } from "@/auth";
import { JsonResult, ErrorResult, sendErrorAction, sendJsonAction } from "../..";
import Link, { LinkType } from "@/databases/mongoose/schema/link";
import { modelJson } from "@/databases/mongoose/utils/modelJson";
import { PostLinkDataZod, postLinkDataZod } from "./client";

const errors = {
  "already_exists": "short code already exits please choose a different short code"
}

export const PostLink = async (user: CustomSession, data: PostLinkDataZod): Promise<ErrorResult | JsonResult<LinkType>> => {
  const parsedData = await postLinkDataZod.safeParseAsync(data)

  if (!parsedData.success) return sendErrorAction(400, parsedData.error.errors.map(e => e.message).join("\n"))

  const linkData = parsedData.data

  if (linkData.shortCode) {
    const shortCodeDocument = await Link.findOne({
      shortCode: linkData.shortCode
    })

    if (shortCodeDocument) return sendErrorAction(409, errors.already_exists)
  }

  try {
    const createdLink = await Link.create({
      originalUrl: linkData.originalUrl,
      shortCode: linkData.shortCode,
      userId: user.user.accountId
    })
    
    return sendJsonAction(modelJson(createdLink))
  } catch (e: any) {
    if ("message" in e) {
      return sendErrorAction(400, e.message)
    }

    return sendErrorAction(400, JSON.stringify(e))
  }
}

export const GetLink = async (data: Partial<LinkType>): Promise<ErrorResult | JsonResult<LinkType>> => {
  try {
    const existingLink = await Link.findOne(data)
    if (!existingLink) return sendErrorAction(400, "This link does not exist and could not be found")
    
    return sendJsonAction(modelJson(existingLink))
  } catch (e: any) {
    if ("message" in e) {
      return sendErrorAction(400, e.message)
    }

    return sendErrorAction(400, JSON.stringify(e))
  }
}
"use server";

import { auth } from "@/auth";
import { JsonResult, ErrorResult, sendErrorAction, sendJsonAction } from "../..";
import Link, { LinkType } from "@/databases/mongoose/schema/link";
import { modelJson, modelJsons } from "@/databases/mongoose/utils/modelJson";
import { PostLinkDataZod, postLinkDataZod } from "./client";
import { RedisClient } from "suna-auth-redis";
import { RateLimiter } from "@/databases/ratelimiter";

const errors = {
  "already_exists": "The short code already exists. Please choose a different short code.",
  "invalid_session": "Please be logged in.",
  "invalid_patch": "Could not patch/update link.",
  "link_no_exist": "This link does not exist and could not be found.",
  "links_no_exist": "Could not find any links.",
  "rate_limit": "You are being rate limited."
}

const Redis = RedisClient.getInstance({ redis_url: process.env.REDIS_URL! })

const rateLimiter = new RateLimiter({
  limit: 10, // Example: 5 requests per windowMs
  windowMs: 60000, // Example: 1 minute window
  cache: Redis
});


export const PUTLink = async (data: PostLinkDataZod): Promise<ErrorResult | JsonResult<LinkType>> => {
  const session = await auth()
  if (!session) return sendErrorAction(401, errors.invalid_session)

  const parsedData = await postLinkDataZod.safeParseAsync(data)
  if (!parsedData.success) return sendErrorAction(400, parsedData.error.errors.map(e => e.message).join("\n"))

  const linkData = parsedData.data

  if (linkData.shortCode) {
    const shortCodeDocument = await Link.findOne({
      shortCode: linkData.shortCode
    })

    if (shortCodeDocument) return sendErrorAction(409, errors.already_exists)
  }

  const allowed = await rateLimiter.consume(`${session.user.accountId}-link-creation`);
  if (!allowed) return sendErrorAction(429, errors.rate_limit);

  try {
    const createdLink = await Link.create({
      originalUrl: linkData.originalUrl,
      shortCode: linkData.shortCode,
      userId: session.user.accountId
    })

    return sendJsonAction(modelJson(createdLink))
  } catch (e: any) {
    if ("message" in e) {
      return sendErrorAction(400, e.message)
    }

    return sendErrorAction(400, JSON.stringify(e))
  }
}

export const POSTLink = async (data: Partial<LinkType>): Promise<ErrorResult | JsonResult<LinkType>> => {
  const session = await auth()
  if (!session) return sendErrorAction(401, errors.invalid_session)

  try {
    const existingLink = await Link.findOne(data)
    if (!existingLink) return sendErrorAction(400, errors.link_no_exist)

    return sendJsonAction(modelJson(existingLink))
  } catch (e: any) {
    if ("message" in e) {
      return sendErrorAction(400, e.message)
    }

    return sendErrorAction(400, JSON.stringify(e))
  }
}

export const PATCHLink = async (data: {
  shortCode: string,
  data: Partial<LinkType>
}): Promise<ErrorResult | JsonResult<LinkType>> => {
  const session = await auth()
  if (!session) return sendErrorAction(401, errors.invalid_session)

  const allowed = await rateLimiter.consume(`${session.user.accountId}-link-patch`);
  if (!allowed) return sendErrorAction(429, errors.rate_limit);

  try {
    const patchedLink = await Link.findOneAndUpdate({
      shortCode: data.shortCode,
      userId: session.user.accountId
    }, {
      ...data.data,
      userId: session.user.accountId
    })
    if (!patchedLink) return sendErrorAction(400, errors.invalid_patch)

    return sendJsonAction(modelJson(patchedLink))
  } catch (e: any) {
    if ("message" in e) {
      return sendErrorAction(400, e.message)
    }

    return sendErrorAction(400, JSON.stringify(e))
  }
}

export const GetLinks = async (data: Partial<LinkType>): Promise<ErrorResult | JsonResult<LinkType[]>> => {
  const session = await auth()
  if (!session) return sendErrorAction(401, errors.invalid_session)

  try {
    const existingLink = await Link.find({ ...data, userId: session.user.accountId }).sort({
      created: -1
    })
    if (!existingLink) return sendErrorAction(400, errors.links_no_exist)

    return sendJsonAction(modelJsons(existingLink))
  } catch (e: any) {
    if ("message" in e) {
      return sendErrorAction(400, e.message)
    }

    return sendErrorAction(400, JSON.stringify(e))
  }
} 
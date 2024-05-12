import { auth } from "@/auth";
import { PostLink } from "./action";
import { sendErrorResponse, sendJsonResponse } from "../..";

export async function GET(request: Request) {
  return sendErrorResponse(405, "Wrong Method")
}

export async function POST(request: Request) {
  const session = await auth()
  if (!session) return sendErrorResponse(401, "please login")

  const body = await request.json()

  const result = await PostLink(session, body)

  if (!result.success) return sendErrorResponse(result.status || 400, result.message)

  return sendJsonResponse(result.data)
}

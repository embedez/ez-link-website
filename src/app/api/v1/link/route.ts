import { POSTLink, PUTLink } from "./action";
import { sendErrorResponse, sendJsonResponse } from "../..";

export async function POST(request: Request) {
  const body = await request.json()
  const result = await POSTLink(body)

  if (!result.success) return sendErrorResponse(result.status || 400, result.message)
  return sendJsonResponse(result.data)
}

export async function PUT(request: Request) {
  const body = await request.json()
  const result = await PUTLink(body)

  if (!result.success) return sendErrorResponse(result.status || 400, result.message)
  return sendJsonResponse(result.data)
}
